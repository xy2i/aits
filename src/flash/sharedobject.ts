/** SharedObject stub
 * https://open-flash.github.io/mirrors/as2-language-reference/index.html
 */

import { type Amf0Value } from "@/flash/sol";

export class SharedObject {
    static getLocal(path: string, _localPath: string): { data: { [key: string]: Amf0Value } } {
        return {
            data: JSON.parse(localStorage.getItem(path) ?? "{}"),
        };
    }
}