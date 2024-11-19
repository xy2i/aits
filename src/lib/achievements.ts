import { _root } from "@/flash/root";
import { dispNews } from "./news";

export function addNewAchievement(ID, name, desc, need, amnt, type, where, secret, redCoin) {
    _root.totalachievements += 1;
    if (secret == true) {
        _root.totalsachievements += 1;
    }
    _root.maxredcoin += redCoin;
    var achievement = new Object();
    achievement.ID = ID;
    achievement.name = name;
    achievement.desc = desc;
    achievement.need = need;
    achievement.amnt = amnt;
    achievement.type = type;
    achievement.where = where;
    achievement.secret = secret;
    achievement.redCoin = redCoin;
    _root.achList.push(achievement);
}

export function addAchievementR(ID, secret, achName, descA, descB, need, where, amnt) {
    var _loc1_ = new Object();
    _loc1_.ID = ID;
    _loc1_.secret = secret;
    _loc1_.achName = achName;
    _loc1_.descA = descA;
    _loc1_.descB = descB;
    _loc1_.need = need;
    _loc1_.where = where;
    _loc1_.amnt = amnt;
    _root.achListR.push(_loc1_);
}

export function checkAchievements() {
    _root.awards = 0;
    _root.sawards = 0;
    _root.achRedCoin = 0;
    if (_root.saveid >= 10) {
        _root.save.achEarnTime[1150] = 99999999999;
        _root.save.achEarnTime[1151] = 99999999999;
        _root.save.achEarnTime[1152] = 99999999999;
        _root.save.achEarnTime[1153] = 99999999999;
        _root.save.achEarnTime[1154] = 99999999999;
        _root.save.achEarnTime[1155] = 99999999999;
        _root.save.achEarnTime[1156] = 99999999999;
        _root.save.achEarnTime[1157] = 99999999999;
        _root.save.achEarnTime[1158] = 99999999999;
        _root.save.achEarnTime[1159] = 99999999999;
        _root.save.achEarnTime[1160] = 99999999999;
        _root.save.achEarnTime[1161] = 99999999999;
        _root.save.achEarnTime[1162] = 99999999999;
        _root.save.achEarnTime[1163] = 99999999999;
        _root.save.achEarnTime[1164] = 99999999999;
        _root.save.achEarnTime[1165] = 99999999999;
        _root.save.achEarnTime[9035] = 99999999999;
    }
    let i = 1;
    while (i <= _root.totalachievements) {
        let achCurrent;
        if (_root.achList[i].where == "save") {
            achCurrent = _root.save[_root.achList[i].need];
        }
        else if (_root.achList[i].where == "root") {
            achCurrent = _root[_root.achList[i].need];
        }
        let achRequired = _root.achList[i].amnt;
        if (!isNaN(achCurrent) && achCurrent >= achRequired && _root.achList[i].type == "Max" || achCurrent <= achRequired && _root.achList[i].type == "Min" || !isNaN(_root.save.achEarnTime[_root.achList[i].ID])) {
            if (isNaN(_root.save.achEarnTime[_root.achList[i].ID])) {
                _root.save.achEarnTime[_root.achList[i].ID] = _root.systemtimenow;
                if (_root.save.showBanner != false) {
                    console.log("XXX UNIMPLEMENTED implement achievement banner, got achievement", _root.achList[i].name);
                    // _root.accomplishPop.targetX = 10;
                    // _root.accomplishPop.count = 0;d
                    // _root.accomplishPop.gotoAndStop(2);
                    // _root.accomplishPop.lolMessage.text = _root.achList[i].name;
                    // _root.accomplishPop.rcText.text = "Progress Bar Reward: +" + _root.achList[i].redCoin / 100 + "%";
                    // _root.accomplishPop.countText.text = _root.save.maxAchievement + 1 + " / " + _root.totalachievements;
                }
                dispNews(3, "Achievement earned! [" + _root.achList[i].name + "] (" + (_root.save.maxAchievement + 1) + " / " + _root.totalachievements + ")");
                _root.newAchName = _root.achList[i].name;
                _root.newAchRedCoin = _root.achList[i].redCoin;
            }
            _root.awards += 1;
            if (_root.achList[i].secret == true) {
                _root.sawards += 1;
            }
            _root.achRedCoin += _root.achList[i].redCoin;
        }
        i++;
    }
    if (_root.save.maxAchievement < _root.awards) {
        _root.save.maxAchievement = _root.awards;
    }
}