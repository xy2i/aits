import { _root } from "@/flash/root";
import { withComma } from "./format";
import { dispNews } from "./news";

const careerName = ["", "Idler", "Gardener", "Fighter", "Item Maker", "Button Basher", "Arcade Player", "Racer", "Card Player", "Gem Trader", "Adventurer", "Pet Trainer", "Fisher"];

export function gainCareerEXP(careerID, amount, mustTurnOn) {
    amount = Math.floor(amount);
    if (!isNaN(amount) && amount > 0) {
        if (_root.save.careerActive[careerID] > 0 || _root.save.careerBoost[careerID] > 0 || mustTurnOn == false) {
            if (_root.save.careerBoost[careerID] > 0 && mustTurnOn != false) {
                if (_root.save.permaBanPenalty[13] == 3) {
                    amount = Math.floor(amount * 4);
                    dispNews(143, "Blessed Career - 300% extra Career EXP gained!");
                }
                else if (_root.save.permaBanPenalty[13] == 2) {
                    amount = Math.floor(amount * 3.2);
                    dispNews(143, "Blessed Career - 220% extra Career EXP gained!");
                }
                else if (_root.save.permaBanPenalty[13] == 1) {
                    amount = Math.floor(amount * 2.8);
                    dispNews(143, "Blessed Career - 180% extra Career EXP gained!");
                }
                else {
                    amount = Math.floor(amount * 2);
                    dispNews(143, "Blessed Career - 100% extra Career EXP gained!");
                }
            }
            amount += Math.floor(amount * Math.min(Math.floor(_root.save.totalStupidity / 250), 20) * 0.03);
            if (_root.save.banPenalty[6] == 1) {
                amount = Math.floor(amount * 1.2);
            }
            let i = 1;
            while (i <= _root.todayEvent) {
                let yy = _root.clock_year % 10;
                let mm = _root.clock_month;
                let dd = _root.clock_date;
                if (_root.eventList[yy][mm][dd][i] == "1.5x Career EXP gain") {
                    amount = Math.floor(amount * 1.5);
                }
                i++;
            }
            _root.save.careerEXP[careerID] += amount;
            if (_root.save.questType == "Career EXP") {
                if (_root.save.questSubtype == "Career " + careerID || _root.save.questSubtype == "Any") {
                    _root.save.questCount += amount;
                }
            }
            dispNews(careerID + 130, "Career EXP gained! (" + careerName[careerID] + ", +" + withComma(amount) + ")");
            let careerReq = 100 + _root.save.careerLevel[careerID] * (_root.save.careerLevel[careerID] + 1) * Math.max(1, _root.save.careerLevel[careerID] - 99) * 5;
            if (_root.save.careerEXP[careerID] > 4000000000) {
                _root.save.careerEXP[careerID] = 4000000000;
            }
            while (_root.save.careerEXP[careerID] >= careerReq && _root.save.careerLevel[careerID] < 200) {
                _root.save.careerEXP[careerID] -= careerReq;
                _root.save.careerLevel[careerID] += 1;
                careerReq = 100 + _root.save.careerLevel[careerID] * (_root.save.careerLevel[careerID] + 1) * Math.max(1, _root.save.careerLevel[careerID] - 99) * 5;
                dispNews(144, "Career Level Up! (" + careerName[careerID] + ", Lv. " + _root.save.careerLevel[careerID] + ")");
                if (_root.save.careerLevel[careerID] >= 100) {
                    _root.save.mysteryBox[10] += 1;
                    dispNews(144, "You have gained a Supply Crate!");
                }
            }
            while (_root.save.careerEXP[careerID] >= 40000000 && _root.save.careerLevel[careerID] == 200) {
                _root.save.careerEXP[careerID] -= 40000000;
                _root.save.mysteryBox[10] += 1;
                careerReq = 100 + _root.save.careerLevel[careerID] * (_root.save.careerLevel[careerID] + 1) * Math.max(1, _root.save.careerLevel[careerID] - 99) * 5;
                dispNews(144, "40,000,000 [" + careerName[careerID] + "] Career EXP has been exchanged for a Supply Crate!");
            }
        }
        if (careerID == _root.save.curBusiness && mustTurnOn != false) {
            if (_root.save.careerActive[careerID] > 0 || _root.save.careerBoost[careerID] > 0) {
                _root.save.curBusinessActivity += amount;
            }
            else {
                _root.save.curBusinessActivity += Math.ceil(amount * 0.5);
            }
        }
    }
}