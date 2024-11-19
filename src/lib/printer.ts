import { _root } from "@/flash/root";
import { gainBlueCoin, gainCoin, gainGreenCoin } from "./coin";
import { withComma } from "./format";
import { dispNews } from "./news";

export function printMoney(moneyToPrintX) {
    _root.printPercent = 0;
    if (_root.save.printerCharge > 0) {
        if (_root.save.questType == "Print") {
            if (_root.save.questSubtype == "Any") {
                _root.save.questCount += 1;
            }
        }
        _root.save.printerCharge -= 1;
        if (_root.save.printerCharge > 160) {
            _root.save.printerCharge -= 4;
        }
        if (_root.save.printerCharge > 1000) {
            _root.save.printerCharge = 1000;
        }
        if (Math.random() < Math.min(Math.floor(_root.save.totalStupidity / 20), 25) * 0.04) {
            gainBlueCoin(1);
        }
        dispNews(75, "Money printed! (+" + withComma(moneyToPrintX) + " Coins)");
        let critPrintChance = 0.01;
        if (_root.save.permaBanPenalty[29] == 3) {
            critPrintChance *= 6;
        }
        else if (_root.save.permaBanPenalty[29] == 2) {
            critPrintChance *= 4;
        }
        else if (_root.save.permaBanPenalty[29] == 1) {
            critPrintChance *= 3;
        }
        if (Math.random() < critPrintChance) {
            let greenCoinToGain = Math.floor(((_root.save.printerLevel + 25) * Math.pow(Math.min(_root.save.level, 9001), 0.65) * 0.63 * 10 + 4560) * (100 + _root.save.printerLevel) / 100);
            greenCoinToGain = Math.round(greenCoinToGain / 125) * 10;
            if (_root.save.permaBanPenalty[4] == 3) {
                greenCoinToGain = Math.round(greenCoinToGain * 2.5);
            }
            else if (_root.save.permaBanPenalty[4] == 2) {
                greenCoinToGain = Math.round(greenCoinToGain * 1.9);
            }
            else if (_root.save.permaBanPenalty[4] == 1) {
                greenCoinToGain = Math.round(greenCoinToGain * 1.6);
            }
            gainGreenCoin(greenCoinToGain);
            dispNews(76, "CRITICAL PRINT! (+" + withComma(greenCoinToGain) + " Green Coins)");
            if (_root.save.questType == "Print") {
                if (_root.save.questSubtype == "Critical") {
                    _root.save.questCount += 1;
                }
            }
        }
    }
    if (_root.save.printerCharge > 0 && _root.save.printerCharge < 10) {
        dispNews(156, "Your Printer Battery is low.");
    }
    if (_root.save.printerCharge <= 0) {
        dispNews(157, "Your Printer Battery has run out. Charge it now!");
    }
    gainCoin(moneyToPrintX, 9);
    _root.save.totalPrinterMoney += moneyToPrintX;
    if (_root.save.totalPrinterMoney >= 1000000) {
        _root.save.totalPrinterMillion += Math.floor(_root.save.totalPrinterMoney / 1000000);
        _root.save.totalPrinterMoney %= 1000000;
    }
}