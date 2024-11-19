/**
 * See https://rtmp.veriskope.com/pdf/amf0-file-format-specification.pdf
 * https://metacpan.org/release/AFF/Parse-Flash-Cookie-0.09/source/lib/Parse/Flash/Cookie.pm
 *
 * This is not a full SOL parser, it does parse enough to load an anti idle save
 */

import { SharedObject } from "./sharedobject";


/** Byte sequence marking the end of an object,
 * usually after arrays or objects. */
const END_OF_OBJECT = [0x00, 0x00, 0x09];

type ParseResult<T> = {
    value: T;
    view: DataView;
}

export type Amf0Value = number
    | boolean
    | string
    | null
    | undefined
    | Amf0Value[]

type Save = {
    name: string,
    data: { [key: string]: Amf0Value };
}

function assertRemaining(view: DataView, n: number) {
    if (n > view.byteLength) {
        throw new Error(
            `Buffer underrun: needed ${n} bytes: got ${view.byteLength}`
        )
    }
}

function take(view: DataView, len: number): ParseResult<Uint8Array> {
    assertRemaining(view, len);
    return {
        value: new Uint8Array(view.buffer, view.byteOffset, len),
        view: new DataView(view.buffer, view.byteOffset + len),
    }
}

function isEndOfObject(value: Uint8Array): boolean {
    if (value.length != 3) {
        throw new Error(`Invalid isEndOfObject: expected array of length 3`)
    }
    return (value[0] == END_OF_OBJECT[0]
        && value[1] == END_OF_OBJECT[1]
        && value[2] == END_OF_OBJECT[2]);
}

function checkEndOfObject(view: DataView): boolean {
    return isEndOfObject(take(view, 3).value);
}

function endOfObject(view: DataView): DataView {
    assertRemaining(view, 3);
    let value;
    ({ value, view } = take(view, 3));
    if (!isEndOfObject(value)) {
        throw new Error(`Expected END_OF_OBJECT tag here: got ${value}`)
    }
    return view;
}

function primitive<T>(
    size: number, getter: (view: DataView) => T
): (view: DataView) => ParseResult<T> {
    return (view) => {
        assertRemaining(view, size)
        return {
            value: getter(view),
            view: new DataView(view.buffer, view.byteOffset + size),
        }
    }
}

const bool = primitive(1, (view) => view.getUint8(0) != 0);
const u8 = primitive(1, (view) => view.getUint8(0));
const u16 = primitive(2, (view) => view.getUint16(0));
const u32 = primitive(4, (view) => view.getUint32(0));
const f64 = primitive(8, (view) => view.getFloat64(0));

function str(view: DataView): ParseResult<string> {
    let value;
    // Length
    ({ value, view } = u16(view));

    // String value (UTF-8)
    ({ value, view } = take(view, value));

    return {
        value: new TextDecoder().decode(value),
        view,
    }
};

function ecmaArray(view: DataView): ParseResult<Amf0Value[]> {
    let value;

    // Array length
    // Note that we don't trust this value since SOL doesn't set it properly,
    // instead relying on the array terminator to be present (END_OF_OBJECT)
    view = u32(view).view;

    const array = []
    while (!checkEndOfObject(view)) {
        ({ value, view } = keyValuePair(view));
        const { key: arrayKey, value: arrayValue } = value;
        // Arrays in JavaScript are like those in ActionScript: they are
        // sparse, so assigning to any key like this is possible.
        array[Number(arrayKey)] = arrayValue;
    }

    // Consume the end of object marker
    view = endOfObject(view);

    return { view, value: array }
}

function header(view: DataView): ParseResult<string> {
    let value;
    // Skip 00 BF magic marker
    view = take(view, 2).view;

    // Validate length
    ({ value, view } = u32(view));
    if (value != view.byteLength) {
        throw new Error(`Invalid SOL file: wrong length`);
    }

    // Validate magic
    ({ value, view } = take(view, 4));
    if (new TextDecoder().decode(value) != "TCSO") {
        throw new Error(`Invalid SOL file: corrupted magic`);
    }

    // Skip unknown 6 bytes
    view = take(view, 6).view;

    // Get sol name
    ({ value, view } = str(view));
    const solName = value;

    // Check if version number is 0: reading AMF0 format
    ({ value, view } = u32(view));
    if (value != 0) {
        throw new Error(`Invalid SOL file: AMF0 expected, AMF3 found`);
    }

    return {
        value: solName,
        view,
    };
}

function amf0value(view: DataView): ParseResult<Amf0Value> {
    let value;

    // Data type marker
    ({ value, view } = u8(view));
    switch (value) {
        case 0x0: {
            return f64(view);
        }
        case 0x1: {
            return bool(view);
        }
        case 0x2: {
            return str(view);
        }
        case 0x5: {
            return {
                value: null,
                view,
            };
        }
        case 0x6: {
            return {
                value: undefined,
                view,
            }
        }
        case 0x8: {
            return ecmaArray(view);
        }
    }
    throw new Error(`Unexpected tag: ${value}`);
}

function keyValuePair(view: DataView):
    ParseResult<{ key: string, value: Amf0Value }> {
    let value;

    // Key (string)
    ({ value, view } = str(view));
    const key = value;

    // Value
    ({ value, view } = amf0value(view));

    return {
        value: { key, value },
        view,
    }
}

export function deserializeSol(buf: ArrayBuffer): Save {
    let value;
    let view = new DataView(buf);

    ({ value, view } = header(view));
    console.log(`Reading save from SOL, internal name: ${value}`);
    const save: Save = {
        name: value,
        data: {},
    };

    while (view.byteLength > 0) {
        ({ value, view } = keyValuePair(view));
        const { key: objectKey, value: objectValue } = value;
        save.data[objectKey] = objectValue;

        // Trailing byte after key-value pair, must be 0x00
        ({ value, view } = u8(view));
        if (value != 0) {
            throw new Error(`Invalid trailing byte: must be 0, got ${value}`);
        }
    }

    return save;
}

// Setup file input handler
export function setupSOLReader() {
    const fileInput = document.querySelector('input');
    const span = document.createElement("span");
    span.textContent = "Upload SOL";
    fileInput.parentNode.insertBefore(span, fileInput);

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const buffer = await file.arrayBuffer();
            const savefile = deserializeSol(buffer);
            console.log(savefile);
            localStorage.setItem(savefile.name, JSON.stringify(savefile.data, (key, value) => {
                if (Array.isArray(value)) {
                    return {
                        __isSparseArray: true,
                        values: { ...value }
                    };
                }
                return value;
            }));
            console.log(SharedObject.getLocal(savefile.name));
        } catch (error) {
            console.error('Error reading SOL file:', error);
        }
    });
}