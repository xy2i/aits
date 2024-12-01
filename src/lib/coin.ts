import { _root } from "@/flash/root";
import { gainBoost } from "./boost";
import { withComma } from "./format";
import { dispNews } from "./news";

export enum CoinType {
    Yellow = "yellow",
    Green = "green",
    Blue = "blue",
    White = "white"
}

export const COIN_SOFTCAP = {
    [CoinType.Yellow]: 999_999_999_999,
    [CoinType.Green]: 999_999_999,
    [CoinType.Blue]: 999_999,
}

export const COIN_HARDCAP = {
    [CoinType.Yellow]: 999_999_999_999_999,
    [CoinType.Green]: 999_999_999_999,
    [CoinType.Blue]: 999_999_999,
    [CoinType.White]: 999_999,
}

export function gainCoin(amount, sauce) {
    let boostToGain;
    let multiplier;
    let i;
    if (isNaN(sauce)) {
        sauce = _root.house._currentframe;
    }
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.coinOvercap < 300) {
        if (_root.save.level < 9001 && _root.save.featureBoostAuto == true) {
            boostToGain = 0.01 + amount / Math.min(_root.requiredExp, 810000000) / Math.pow(_root.save.boost, 1.11) * 7000;
            if (_root.save.level < 125) {
                boostToGain = boostToGain * _root.save.level / 125;
            }
            if (_root.save.boost < _root.boostMax) {
                boostToGain *= 5;
            }
            if (boostToGain > 2) {
                boostToGain = 2;
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
        if (_root.saveid == 24) {
            multiplier = 0.35;
        }
        if (_root.saveid == 4) {
            multiplier = _root.save.dbCoin / 100;
        }
        if (sauce != 0) {
            if (sauce == 6 || sauce == 13) {
                multiplier += Math.min(Math.floor(_root.save.totalStupidity / 250), 100) * 0.01;
            }
            else if (_root.save.totalStupidity >= 25000) {
                multiplier += Math.min(Math.floor((_root.save.totalStupidity - 25000) / 250), 150) * 0.02 + 1;
            }
            else {
                multiplier += Math.min(Math.floor(_root.save.totalStupidity / 250), 100) * 0.01;
            }
        }
        let i = 1;
        while (i <= _root.todayEvent) {
            let yy = _root.clock_year % 10;
            let mm = _root.clock_month;
            let dd = _root.clock_date;
            if (_root.eventList[yy][mm][dd][i] == "Gain 10% more Coins from all sources") {
                multiplier += 0.1;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 20% more Coins from all sources") {
                multiplier += 0.2;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 30% more Coins from all sources") {
                multiplier += 0.3;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 50% more Coins from all sources") {
                multiplier += 0.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 25% more Coins from all sources except the Progress Bar, Garden, LolMarket and Fishing" && sauce != 0 && sauce != 6 && sauce != 13 && sauce != 22) {
                multiplier += 0.25;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 50% more Coins from all sources except the Progress Bar, Garden, LolMarket and Fishing" && sauce != 0 && sauce != 6 && sauce != 13 && sauce != 22) {
                multiplier += 0.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 100% more Coins from all sources except the Progress Bar, Garden, LolMarket and Fishing" && sauce != 0 && sauce != 6 && sauce != 13 && sauce != 22) {
                multiplier += 1;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 200% more Coins from all sources except the Progress Bar, Garden, LolMarket and Fishing" && sauce != 0 && sauce != 6 && sauce != 13 && sauce != 22) {
                multiplier += 2;
            }
            i++;
        }
        if (_root.save.restTime > 0) {
            multiplier *= 1.1 + _root.save.restEfficiency[2] * 0.01;
        }
        if (_root.save.careerLevel[1] >= 200 && _root.cursoridle >= 30) {
            multiplier *= 1.03;
        }
        if (_root.save.banPenalty[2] == 1) {
            multiplier *= 1.1;
        }
        if (_root.save.doubleCoinTime > 0) {
            multiplier *= 1.5;
        }
        if (sauce == 22 || sauce == 38 || sauce == 39) {
            multiplier = 1;
        }
        if (_root.detectedX == 1) {
            multiplier = 0;
        }
        let finalAmnt = Math.floor(amount * multiplier);
        _root.save.coinLag += finalAmnt;
        _root.save.coinSauce[sauce] += finalAmnt;
        _root.save.coinSauce[40] += finalAmnt;
        if (_root.save.level < 9000) {
            if (_root.save.permaBanPenalty[8] == 3) {
                _root.save.expLag += Math.floor(finalAmnt * 0.1);
                _root.save.expGraph[7] += Math.floor(amount * 0.1);
                _root.save.expGraph2[7] += Math.floor(finalAmnt * 0.1);
            }
            else if (_root.save.permaBanPenalty[8] == 2) {
                _root.save.expLag += Math.floor(finalAmnt * 0.06);
                _root.save.expGraph[7] += Math.floor(amount * 0.06);
                _root.save.expGraph2[7] += Math.floor(finalAmnt * 0.06);
            }
            else if (_root.save.permaBanPenalty[8] == 1) {
                _root.save.expLag += Math.floor(finalAmnt * 0.04);
                _root.save.expGraph[7] += Math.floor(amount * 0.04);
                _root.save.expGraph2[7] += Math.floor(finalAmnt * 0.04);
            }
        }
        if (_root.cursoridle < 30 && _root.save.showGain == true && sauce != 22 && sauce != 0 && sauce != 39) {
            _root.mainSummonCount += 1;
            _root.mainAntiLag += 1;
            _root.popContain.attachMovie("scorePopMain", "scorePopMain" + _root.mainSummonCount, _root.mainAntiLag, { _x: 80, _y: 20, what: "+" + withComma(Math.floor(amount * multiplier)), whatColor: 16776960 });
        }
    }
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.coinOvercap >= 300 && _root.save.banned >= 5) {
        multiplier = 1;
        if (_root.saveid == 24) {
            multiplier = 0.35;
        }
        if (_root.saveid == 4) {
            multiplier = _root.save.dbCoin / 100;
        }
        if (sauce != 0) {
            if (sauce == 6 || sauce == 13) {
                multiplier += Math.min(Math.floor(_root.save.totalStupidity / 250), 100) * 0.01;
            }
            else if (_root.save.totalStupidity >= 25000) {
                multiplier += Math.min(Math.floor((_root.save.totalStupidity - 25000) / 250), 150) * 0.02 + 1;
            }
            else {
                multiplier += Math.min(Math.floor(_root.save.totalStupidity / 250), 100) * 0.01;
            }
        }
        i = 1;
        while (i <= _root.todayEvent) {
            let yy = _root.clock_year % 10;
            let mm = _root.clock_month;
            let dd = _root.clock_date;
            if (_root.eventList[yy][mm][dd][i] == "Gain 10% more Coins from all sources") {
                multiplier += 0.1;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 20% more Coins from all sources") {
                multiplier += 0.2;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 30% more Coins from all sources") {
                multiplier += 0.3;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 50% more Coins from all sources") {
                multiplier += 0.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 25% more Coins from all sources except the Progress Bar, Garden, LolMarket and Fishing" && sauce != 0 && sauce != 6 && sauce != 13 && sauce != 22) {
                multiplier += 0.25;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 50% more Coins from all sources except the Progress Bar, Garden, LolMarket and Fishing" && sauce != 0 && sauce != 6 && sauce != 13 && sauce != 22) {
                multiplier += 0.5;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 100% more Coins from all sources except the Progress Bar, Garden, LolMarket and Fishing" && sauce != 0 && sauce != 6 && sauce != 13 && sauce != 22) {
                multiplier += 1;
            }
            if (_root.eventList[yy][mm][dd][i] == "Gain 200% more Coins from all sources except the Progress Bar, Garden, LolMarket and Fishing" && sauce != 0 && sauce != 6 && sauce != 13 && sauce != 22) {
                multiplier += 2;
            }
            i++;
        }
        if (_root.save.restTime > 0) {
            multiplier *= 1.1 + _root.save.restEfficiency[2] * 0.01;
        }
        if (_root.save.careerLevel[1] >= 200 && _root.cursoridle >= 30) {
            multiplier *= 1.03;
        }
        if (_root.save.banPenalty[2] == 1) {
            multiplier *= 1.1;
        }
        if (_root.save.doubleCoinTime > 0) {
            multiplier *= 1.5;
        }
        if (sauce == 22 || sauce == 38 || sauce == 39) {
            multiplier = 1;
        }
        if (_root.detectedX == 1) {
            multiplier = 0;
        }
        let finalAmnt = Math.floor(amount * multiplier);
        _root.save.reforgingCoin += finalAmnt;
        _root.save.coinSauce[sauce] += finalAmnt;
        _root.save.coinSauce[40] += finalAmnt;
    }
}

export function gainGreenCoin(amount) {
    let multiplier;
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.greenCoinOvercap < 300) {
        multiplier = 1;
        if (_root.saveid == 4) {
            multiplier = _root.save.dbGreenCoin / 100;
        }
        multiplier += Math.min(Math.floor(_root.save.totalStupidity / 5), 10) * 0.03;
        _root.save.greenCoin += Math.floor(amount * multiplier);
        if (_root.cursoridle < 30 && _root.save.showGain == true) {
            _root.mainSummonCount += 1;
            _root.mainAntiLag += 1;
            _root.popContain.attachMovie("scorePopMain", "scorePopMain" + _root.mainSummonCount, _root.mainAntiLag, { _x: 10, _y: 60, what: "+" + withComma(Math.floor(amount * multiplier)), whatColor: 65280 });
        }
    }
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.greenCoinOvercap >= 300 && _root.save.banned >= 5) {
        multiplier = 1;
        if (_root.saveid == 4) {
            multiplier = _root.save.dbGreenCoin / 100;
        }
        multiplier += Math.min(Math.floor(_root.save.totalStupidity / 5), 10) * 0.03;
        _root.save.reforgingGreenCoin += Math.floor(amount * multiplier);
    }
}

export function gainGreenCoinND(amount) {
    let multiplier;
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.greenCoinOvercap < 300) {
        multiplier = 1;
        if (_root.saveid == 4) {
            multiplier = _root.save.dbGreenCoin / 100;
        }
        multiplier += Math.min(Math.floor(_root.save.totalStupidity / 5), 10) * 0.03;
        _root.save.greenCoin += Math.floor(amount * multiplier);
    }
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.greenCoinOvercap >= 300 && _root.save.banned >= 5) {
        multiplier = 1;
        if (_root.saveid == 4) {
            multiplier = _root.save.dbGreenCoin / 100;
        }
        multiplier += Math.min(Math.floor(_root.save.totalStupidity / 5), 10) * 0.03;
        _root.save.reforgingGreenCoin += Math.floor(amount * multiplier);
    }
}

export function gainBlueCoin(amount) {
    let multiplier;
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.blueCoinOvercap < 300) {
        multiplier = 1;
        if (_root.saveid == 4) {
            multiplier = _root.save.dbBlueCoin / 100;
        }
        _root.save.blueCoin += Math.floor(amount * multiplier);
        if (_root.cursoridle < 30 && _root.save.showGain == true) {
            _root.mainSummonCount += 1;
            _root.mainAntiLag += 1;
            _root.popContain.attachMovie("scorePopMain", "scorePopMain" + _root.mainSummonCount, _root.mainAntiLag, { _x: 100, _y: 60, what: "+" + withComma(Math.floor(amount * multiplier)), whatColor: 39423 });
        }
    }
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.blueCoinOvercap >= 300 && _root.save.banned >= 5) {
        multiplier = 1;
        if (_root.saveid == 4) {
            multiplier = _root.save.dbBlueCoin / 100;
        }
        _root.save.reforgingBlueCoin += Math.floor(amount * multiplier);
    }
}

export function gainWhiteCoin(amount) {
    let multiplier;
    if (!isNaN(amount) && amount > 0 && amount != Infinity) {
        multiplier = 1;
        if (Math.random() < Math.min(Math.floor(_root.save.totalStupidity / 500), 20) * 0.05) {
            multiplier += 1;
        }
        let i = 1;
        while (i <= _root.todayEvent) {
            let yy = _root.clock_year % 10;
            let mm = _root.clock_month;
            let dd = _root.clock_date;
            if (_root.eventList[yy][mm][dd][i] == "Gain 100% more White Coins from all sources except level 9001 reward" && amount < 1000) {
                multiplier += 1;
            }
            i++;
        }
        _root.save.whiteCoin += Math.floor(amount * multiplier);
        if (_root.save.whiteCoin > 999999) {
            _root.save.whiteCoin = 999999;
        }
        if (Math.floor(amount * multiplier) >= 2) {
            dispNews(163, "Gained " + withComma(amount * multiplier) + " White Coins! You now have " + withComma(_root.save.whiteCoin) + ".");
        }
        else {
            dispNews(163, "Gained 1 White Coin! You now have " + withComma(_root.save.whiteCoin) + ".");
        }
    }
}

export function gainWhiteCoinB(amount) {
    let multiplier;
    if (!isNaN(amount) && amount > 0 && amount != Infinity) {
        multiplier = 1;
        let i = 1;
        while (i <= _root.todayEvent) {
            let yy = _root.clock_year % 10;
            let mm = _root.clock_month;
            let dd = _root.clock_date;
            if (_root.eventList[yy][mm][dd][i] == "Gain 100% more White Coins from all sources except level 9001 reward" && amount < 1000) {
                multiplier += 1;
            }
            i++;
        }
        _root.save.whiteCoin += Math.floor(amount * multiplier);
        if (_root.save.whiteCoin > 999999) {
            _root.save.whiteCoin = 999999;
        }
        if (Math.floor(amount * multiplier) >= 2) {
            dispNews(163, "Gained " + withComma(amount * multiplier) + " White Coins! You now have " + withComma(_root.save.whiteCoin) + ".");
        }
        else {
            dispNews(163, "Gained 1 White Coin! You now have " + withComma(_root.save.whiteCoin) + ".");
        }
    }
}