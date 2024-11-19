import { _root } from "@/flash/root";
import { gainBoost } from "./boost";


export function gainEXP(amount: number, sauce: number) {
    let boostToGain;
    if (isNaN(sauce)) {
        sauce = _root.house._currentframe;
    }
    if (!isNaN(amount) && amount > 0 && amount != Infinity) {
        if (_root.save.level < 9001 && _root.save.featureBoostAuto == true) {
            boostToGain = 0.05 + amount / Math.min(_root.requiredExp, 810000000) / Math.pow(_root.save.boost, 1.11) * 35000;
            if (_root.save.level < 125) {
                boostToGain = boostToGain * _root.save.level / 125;
            }
            if (_root.save.boost < _root.boostMax) {
                boostToGain *= 5;
            }
            if (boostToGain > 10) {
                boostToGain = 10;
            }
            if (_root.save.restTime > 0) {
                boostToGain *= 1.1 + _root.save.restEfficiency[3] * 0.01;
            }
            if (_root.save.permaBanPenalty[28] == 3) {
                boostToGain *= 1.1;
            }
            else if (_root.save.permaBanPenalty[28] == 2) {
                boostToGain *= 1.06;
            }
            else if (_root.save.permaBanPenalty[28] == 1) {
                boostToGain *= 1.04;
            }
            gainBoost(boostToGain, 3);
        }
        let multiplier = 1;
        if (_root.saveid == 23) {
            multiplier = 0.75;
        }
        if (_root.saveid == 24) {
            multiplier = 0.35;
        }
        if (_root.saveid == 4) {
            multiplier = _root.save.dbExp / 100;
        }
        let ascentMult = _root.save.banned / 10;
        if (ascentMult > 0.5) {
            ascentMult = 0.5;
        }
        multiplier += ascentMult;
        let multiplier2 = 1;
        let i = 1;
        while (i <= _root.todayEvent) {
            let yy = _root.clock_year % 10;
            let mm = _root.clock_month;
            let dd = _root.clock_date;
            if (_root.eventList[yy][mm][dd][i] == "Gain 10% more EXP from all sources") {
                multiplier += 0.1;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 20% more EXP from all sources") {
                multiplier += 0.2;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 30% more EXP from all sources") {
                multiplier += 0.3;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 50% more EXP from all sources") {
                multiplier += 0.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 25% more EXP from all sources except the Progress Bar, LolMarket and Awesome Adventures" && sauce != 0 && sauce != 13 && sauce != 14) {
                multiplier += 0.25;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 50% more EXP from all sources except the Progress Bar, LolMarket and Awesome Adventures" && sauce != 0 && sauce != 13 && sauce != 14) {
                multiplier += 0.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 100% more EXP from all sources except the Progress Bar, LolMarket and Awesome Adventures" && sauce != 0 && sauce != 13 && sauce != 14) {
                multiplier += 1;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 200% more EXP from all sources except the Progress Bar, LolMarket and Awesome Adventures" && sauce != 0 && sauce != 13 && sauce != 14) {
                multiplier += 2;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 1.5x EXP from Button Machine" && sauce == 8) {
                multiplier2 *= 1.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 1.5x EXP from Arcade" && sauce == 10) {
                multiplier2 *= 1.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 1.5x EXP from Stadium" && sauce == 11) {
                multiplier2 *= 1.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 1.5x EXP from TukkunFCG" && sauce == 12) {
                multiplier2 *= 1.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 1.5x EXP from Fishing" && sauce == 22) {
                multiplier2 *= 1.5;
            }
            i++;
        }
        if (_root.save.hyperDay[1] == _root.todayCode || _root.save.hyperDay[2] == _root.todayCode) {
            if (sauce != 0 && sauce != 13 && sauce != 14) {
                multiplier += 3;
            }
        }
        if (sauce == 0 && _root.save.boostFreeze > 0) {
            multiplier += Math.min(Math.floor(_root.save.totalStupidity / 500), 250) * 0.01;
        }
        multiplier += _root.save.ascStupidity * 0.05;
        multiplier *= multiplier2;
        if (_root.save.restTime > 0) {
            multiplier *= 1.1 + _root.save.restEfficiency[1] * 0.01;
        }
        if (_root.save.careerLevel[1] >= 200 && _root.cursoridle >= 30) {
            multiplier *= 1.03;
        }
        if (_root.save.banPenalty[1] == 1) {
            multiplier *= 1.05;
        }
        if (sauce == 38) {
            multiplier = 1;
        }
        if (_root.save.newbieProgress != 15 && _root.save.bestLevel < 1000) {
            multiplier = 1;
        }
        if (_root.save.level == 9000) {
            multiplier *= 0.5;
        }
        if (_root.save.level == 9001) {
            multiplier *= 0.05;
        }
        if (_root.save.level == 9002) {
            multiplier = 0;
        }
        if (_root.save.doubleExpTime > 0) {
            multiplier *= 1.5;
        }
        multiplier *= sauceMult(sauce);
        if (_root.detectedX == 1) {
            multiplier = 0;
        }
        _root.save.expLag += Math.floor(amount * multiplier);
        _root.save.expGraph[7] += Math.floor(amount);
        _root.save.expGraph2[7] += Math.floor(amount * multiplier);
        _root.save.expSauce[sauce] += Math.floor(amount * multiplier);
        _root.save.expSauceAsc[sauce] += Math.floor(amount * multiplier);
        _root.save.expSauce[40] += Math.floor(amount * multiplier);
        _root.save.expSauceAsc[40] += Math.floor(amount * multiplier);
        if (_root.cursoridle < 30 && _root.save.showGain == true && sauce != 0 && multiplier > 0) {
            _root.mainSummonCount += 1;
            _root.mainAntiLag += 1;
            _root.popContain.attachMovie("scorePopMain", "scorePopMain" + _root.mainSummonCount, _root.mainAntiLag, { _x: 480, _y: 60, what: "+" + withComma(Math.floor(amount * multiplier)), whatColor: 10092288 });
        }
    }
}

export function sauceMult(sa) {
    let tMult;
    if (_root.save.gDifficulty >= 3 && _root.save.level < 8999) {
        tMult = 1.2 - _root.save.expSauceAsc[sa] / 1000000 / 20000000 - _root.save.expSauceAsc[sa] / (_root.save.expSauceAsc[40] + 1) * 0.2;
        if (sa == 0 || sa == 7) {
            tMult += 0.1;
        }
        if (tMult > 1.2) {
            tMult = 1.2;
        }
        if (tMult < 0.8) {
            tMult = 0.8;
        }
    }
    else if (_root.save.gDifficulty >= 2 && _root.save.level < 8999) {
        tMult = 1.2 - _root.save.expSauceAsc[sa] / 1000000 / 10000000 - _root.save.expSauceAsc[sa] / (_root.save.expSauceAsc[40] + 1) * 0.2;
        if (sa == 0 || sa == 7) {
            tMult += 0.1;
        }
        if (tMult > 1.1) {
            tMult = 1.1;
        }
        if (tMult < 0.9) {
            tMult = 0.9;
        }
    }
    else {
        tMult = 1;
    }
    tMult = Math.round(tMult * 100) / 100;
    if (isNaN(tMult)) {
        tMult = 1;
    }
    return tMult;
}

