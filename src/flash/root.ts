import { type Amf0Value } from "@/flash/sol";

export const _root: {
    [key: string]: any,
    save: {
        [key: string]: Amf0Value
    },
    saveGlobal: {
        [key: string]: Amf0Value
    },
} = {
    save: {},
    saveGlobal: {},
};

console.log(_root);