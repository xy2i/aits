import { _root } from "@/flash/root";
import { gainCareerEXP } from "./career";
import { gainBlueCoin, gainCoin, gainGreenCoin, gainWhiteCoin } from "./coin";
import { gainEventToken } from "./event";
import { gainEXP } from "./exp";
import { withComma } from "./format";
import { dispNews } from "./news";

export function harvestTree(slot, harvestAll) {
    let tmul = Math.floor(Math.pow(_root.save.level, 0.6)) / 10 + 6.5;
    if (isNaN(_root.save.gardenHarvestValue[slot])) {
        _root.save.gardenHarvestValue[slot] = 0;
    }
    _root.save.curForestDestroyer = 0;
    _root.save.harvestCount += 1;
    _root.save.gardenMastery[_root.save.gardenTrees[slot]] += 1;
    if (_root.save.questType == "Harvest") {
        if (_root.save.questSubtype == "Any") {
            _root.save.questCount += 1;
        }
    }
    let plotExpToEarn = _root.save.gardenTreeExp[slot];
    if (_root.save.gardenTrees[slot] == 1) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Free Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenTrees[slot] == 2) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Blue Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenTrees[slot] == 3) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Pink Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenTrees[slot] == 4) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Green Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenTrees[slot] == 5) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Lime Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenTrees[slot] == 6) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Yellow Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenTrees[slot] == 7) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Red Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenTrees[slot] == 8) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Black Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenTrees[slot] == 9) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Holiday Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (_root.save.gardenCapacity >= 16 && slot <= 25) {
        if (Math.random() < 0.01 * Math.sqrt(plotExpToEarn)) {
            if (Math.random() < 0.3333333333333333) {
                _root.save.gardenSeed[26] += 1;
                dispNews(22, "Gained Seed #1 for Another Garden!");
            }
            else if (Math.random() < 0.5) {
                _root.save.gardenSeed[51] += 1;
                dispNews(22, "Gained Seed #26 for Another Garden!");
            }
            else {
                _root.save.gardenSeed[76] += 1;
                dispNews(22, "Gained Seed #51 for Another Garden!");
            }
        }
    }
    if (slot >= 26 && slot <= 50) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Another Garden Tree") {
                _root.save.questCount += 1;
            }
        }
        if (Math.random() < 0.15 && _root.save.gardenSeed[_root.save.gardenTrees[slot]] < 99) {
            _root.save.gardenSeed[_root.save.gardenTrees[slot]] += 1;
            dispNews(22, "Gained Seed #" + (_root.save.gardenTrees[slot] - 25) + " for Another Garden!");
        }
        if (Math.random() < 0.01 * plotExpToEarn) {
            let fruitToEarn = 1;
            if (_root.save.permaBanPenalty[14] == 3) {
                fruitToEarn = 6;
            }
            else if (_root.save.permaBanPenalty[14] == 2) {
                fruitToEarn = 4;
            }
            else if (_root.save.permaBanPenalty[14] == 1) {
                fruitToEarn = 3;
            }
            _root.save.gardenFruit += fruitToEarn;
            if (harvestAll != true) {
                dispNews(21, "Gained " + fruitToEarn + " Randomfruit! You now have: " + withComma(_root.save.gardenFruit));
            }
            else {
                //harvestSummaryFruit += fruitToEarn;
            }
        }
    }
    if (slot >= 51) {
        if (_root.save.questType == "Harvest") {
            if (_root.save.questSubtype == "Another Another Garden Tree") {
                _root.save.questCount += 1;
            }
        }
    }
    if (Math.random() < 0.01 + 0.002 * plotExpToEarn) {
        gainWhiteCoin(1);
    }
    _root.save.gardenSlotEXP[slot] += plotExpToEarn;
    _root.save.gardenEXP += plotExpToEarn;
    _root.save.gardenPoint += plotExpToEarn;
    let i = 1;
    while (i <= _root.todayEvent) {
        let yy = _root.clock_year % 10;
        let mm = _root.clock_month;
        let dd = _root.clock_date;
        if (_root.eventList[yy][mm][dd][i] == "Receive Event Tokens by harvesting trees") {
            gainEventToken(plotExpToEarn / 5);
        }
        i++;
    }
    if (harvestAll != true) {
        careerToGain = Math.floor(5 + plotExpToEarn * (1 + _root.save.gardenSlotEXP[slot] / 50000));
        if (careerToGain > 5 + 3 * plotExpToEarn) {
            careerToGain = 5 + 3 * plotExpToEarn;
        }
        if (slot >= 26 && slot <= 50) {
            careerToGain = Math.floor(careerToGain * 2);
        }
        if (slot >= 51) {
            careerToGain = Math.floor(careerToGain * 3);
        }
        gainCareerExp(2, careerToGain, true);
        dispNews(19, "Tree #" + slot + " harvested! (+" + withComma(_root.save.gardenHarvestValue[slot] * tmul * (1 + _root.curCareerLevel[2] * 0.005)) + " Coins)");
        if (slot <= 25) {
            gainExp(_root.save.gardenHarvestValue[slot] * tmul * (0.3 + _root.curCareerLevel[2] * 0.0015) * (1 + _root.save.petStat[1] * 0.002), 6);
        }
        else if (slot <= 50) {
            gainExp(_root.save.gardenHarvestValue[slot] * tmul * (0.45 + _root.curCareerLevel[2] * 0.00225) * (1 + _root.save.petStat[1] * 0.002), 6);
        }
        else {
            gainExp(_root.save.gardenHarvestValue[slot] * tmul * (0.6 + _root.curCareerLevel[2] * 0.003) * (1 + _root.save.petStat[1] * 0.002), 6);
        }
        gainCoin(Math.floor(_root.save.gardenHarvestValue[slot] * tmul * (1 + _root.curCareerLevel[2] * 0.005), 6));
        _root.save.harvestCoin += Math.floor(_root.save.gardenHarvestValue[slot] * (1 + _root.curCareerLevel[2] * 0.005));
        _root.save.gardenRecentTime[slot] = _root.systemtimenow;
        greenCoinToEarn = Math.ceil(250 + plotExpToEarn * 50);
        gainGreenCoin(greenCoinToEarn);
        blueCoinToEarn = Math.ceil(0.5 + plotExpToEarn * 0.1);
        if (_root.save.gardenTrees[slot] == 1) {
            blueCoinToEarn = 1;
        }
        gainBlueCoin(blueCoinToEarn);
    }
    else {
        careerToGain = Math.floor(5 + plotExpToEarn * (1 + _root.save.gardenSlotEXP[slot] / 50000));
        if (careerToGain > 5 + 3 * plotExpToEarn) {
            careerToGain = 5 + 3 * plotExpToEarn;
        }
        if (slot >= 26 && slot <= 50) {
            careerToGain = Math.floor(careerToGain * 2);
        }
        if (slot >= 51) {
            careerToGain = Math.floor(careerToGain * 3);
        }
        harvestSummaryCareer += careerToGain;
        harvestSummaryCount += 1;
        harvestSummaryCoin += Math.floor(_root.save.gardenHarvestValue[slot] * tmul * (1 + _root.curCareerLevel[2] * 0.005));
        if (slot <= 25) {
            harvestSummaryEXP += Math.floor(_root.save.gardenHarvestValue[slot] * tmul * (0.3 + _root.curCareerLevel[2] * 0.0015) * (1 + _root.save.petStat[1] * 0.002));
        }
        else if (slot <= 50) {
            harvestSummaryEXP += Math.floor(_root.save.gardenHarvestValue[slot] * tmul * (0.45 + _root.curCareerLevel[2] * 0.00225) * (1 + _root.save.petStat[1] * 0.002));
        }
        else {
            harvestSummaryEXP += Math.floor(_root.save.gardenHarvestValue[slot] * tmul * (0.6 + _root.curCareerLevel[2] * 0.003) * (1 + _root.save.petStat[1] * 0.002));
        }
        _root.save.harvestCoin += Math.floor(_root.save.gardenHarvestValue[slot] * tmul * (1 + _root.curCareerLevel[2] * 0.005));
        _root.save.gardenRecentTime[slot] = _root.systemtimenow;
        greenCoinToEarn = Math.ceil(250 + plotExpToEarn * 50);
        // harvestSummaryGreenCoin += greenCoinToEarn;
        blueCoinToEarn = Math.ceil(0.5 + plotExpToEarn * 0.1);
        if (_root.save.gardenTrees[slot] == 1) {
            blueCoinToEarn = 1;
        }
        // harvestSummaryBlueCoin += blueCoinToEarn;
    }
}

export function harvestAllTree() {
    let harvestSummaryCount = 0;
    let harvestSummaryEXP = 0;
    let harvestSummaryCoin = 0;
    let harvestSummaryGreenCoin = 0;
    let harvestSummaryBlueCoin = 0;
    let harvestSummaryCareer = 0;
    let harvestSummaryFruit = 0;
    let tr = 1;
    while (tr <= _root.save.gardenCapacity) {
        if (_root.save.gardenTrees[tr] > 0) {
            if (_root.save.gardenRecentTime[tr] + _root.save.gardenHarvestTime[tr] - _root.systemtimenow <= 0) {
                harvestTree(tr, true);
            }
        }
        tr++;
    }
    gainEXP(harvestSummaryEXP, 6);
    gainCoin(harvestSummaryCoin, 6);
    gainGreenCoin(harvestSummaryGreenCoin);
    gainBlueCoin(harvestSummaryBlueCoin);
    gainCareerEXP(2, harvestSummaryCareer, true);
    if (harvestSummaryCount >= 2) {
        dispNews(19, harvestSummaryCount + " trees harvested! (+" + withComma(harvestSummaryCoin) + " Coins)");
    }
    else if (harvestSummaryCount == 1) {
        dispNews(19, "1 tree harvested! (+" + withComma(harvestSummaryCoin) + " Coins)");
    }
    if (harvestSummaryFruit >= 1) {
        dispNews(21, "Gained " + harvestSummaryFruit + " Randomfruit! You now have: " + withComma(_root.save.gardenFruit));
    }
}