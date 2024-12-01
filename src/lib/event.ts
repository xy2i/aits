import { withComma } from "./format";
import { dispNews } from "./news";

export function gainEventToken(amount) {
    if (!isNaN(amount) && amount > 0) {
        let actualAmount = Math.floor(amount);
        if (actualAmount > _root.eventMaxToken - _root.save.eventTokenToday) {
            actualAmount = _root.eventMaxToken - _root.save.eventTokenToday;
        }
        if (actualAmount < 0) {
            actualAmount = 0;
        }
        _root.save.eventToken += actualAmount;
        _root.save.eventTokenToday += actualAmount;
        if (actualAmount > 0) {
            dispNews(155, "Event Tokens gained! (+" + withComma(actualAmount) + ")");
        }
    }
}