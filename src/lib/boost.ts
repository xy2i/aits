import { _root } from "@/flash/root";

export function gainBoost(amount, limit) {
    let realLimit;
    if (!isNaN(amount)) {
        if (limit == 1) {
            realLimit = _root.boostMax;
        }
        else if (limit == 2 || limit == 3) {
            realLimit = _root.boostMax * 1.5;
        }
        else {
            realLimit = _root.boostMax * 2.5;
        }
        if (_root.save.bestLevel <= 5 && _root.save.featureBoostGen != true) {
            realLimit = 100;
        }
        let actualGain = amount;
        if (actualGain > realLimit - _root.save.boost) {
            actualGain = realLimit - _root.save.boost;
        }
        if (actualGain < 0) {
            actualGain = 0;
        }
        _root.save.boost += actualGain;
        _root.save.boostPurchased += actualGain;
    }
}