/** SharedObject stub
 * https://open-flash.github.io/mirrors/as2-language-reference/index.html
 */

import { type Amf0Value } from "@/flash/sol";

export class SharedObject {
    static getLocal(path: string, _localPath: string): { data: { [key: string]: Amf0Value } } {
        return {
            data: JSON.parse(localStorage.getItem(path) ?? "{}", (key, value) => {
                if (typeof value === 'object' && value !== null && value.__isSparseArray) {
                    const arrayValues = value.values;
                    const arr = [];
                    for (const [k, v] of Object.entries(arrayValues)) {
                        arr[k] = v;
                    }
                    return arr;
                }
                return value;
            }),
            flush() {
                // console.warn("UNIMPLEMENTED SharedObject.flush");
            }
        };
    }
}