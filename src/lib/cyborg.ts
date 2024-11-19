import { random } from "@/flash/random";
import { _root } from "@/flash/root";
import { gainBoost } from "./boost";
import { gainCareerEXP } from "./career";
import { gainBlueCoin, gainCoin, gainGreenCoin, gainWhiteCoin } from "./coin";
import { gainEXP } from "./exp";
import { withComma } from "./format";
import { dispNews } from "./news";

/// XXX fix _currentframe checks
export function checkCyborg() {
    if (_root.save.bestLevel >= 1250) {
        if (_root.save.botCurrentOp >= 1 && _root.save.botCurrentOp <= 7 || _root.save.botCurrentOp == 11) {
            if (_root.save.featureArcade == true && _root.house._currentframe != 10) {
                _root.save.botActive = true;
            }
            else {
                _root.save.botActive = false;
            }
        }
        else if (_root.save.botCurrentOp >= 8 && _root.save.botCurrentOp <= 10) {
            if (_root.save.featureStadium == true && _root.house._currentframe != 11) {
                _root.save.botActive = true;
            }
            else {
                _root.save.botActive = false;
            }
        }
        else if (_root.save.botCurrentOp >= 12 && _root.save.botCurrentOp <= 19) {
            if (_root.save.featureTukkunFCG == true && _root.house._currentframe != 12) {
                _root.save.botActive = true;
            }
            else {
                _root.save.botActive = false;
            }
        }
        else if (_root.save.botCurrentOp == 20) {
            // if (_root.save.featureFishing == true && _root.house._currentframe != 22 && _root.save.fishExamLeft <= 0) {
            //     _root.save.botActive = true;
            // }
            // else {
            //     _root.save.botActive = false;
            // }
        }
        if (_root.save.botEnergy <= 0) {
            _root.save.botEnergy = 0;
            _root.save.botActive = false;
        }
        if (_root.save.botCurrentOp == 0) {
            _root.save.botActive = true;
            _root.save.botCurrentOpNum = 1;
            _root.save.botCurrentOpMax = 1;
        }
        if (_root.cyborgWorking == true && _root.save.botActive == false) {
            dispNews(176, "[Cyborg] Simulation Cyborg status: PAUSED");
        }
        if (_root.save.botActive == true) {
            if (_root.cyborgWorking == false) {
                if (_root.save.botCurrentOp != 0) {
                    dispNews(177, "[Cyborg] Simulation Cyborg status: WORKING");
                }
                else {
                    dispNews(177, "[Cyborg] Simulation Cyborg status: RECHARGING");
                }
            }
            if (_root.save.botCurrentOp != 0) {
                _root.save.botEnergy -= 1;
            }
            _root.save.botCurrentOpTime += 1;
            if (_root.save.botCurrentOpTime >= _root.cyborgActTime[_root.save.botCurrentOp]) {
                _root.save.botCurrentOpTime = 0;
                cyborgOp(_root.save.botCurrentOp);
                _root.save.botCurrentOpNum += 1;
                if (_root.save.botCurrentOpNum > _root.save.botCurrentOpMax) {
                    if (_root.save.botCurrentOp != 0) {
                        _root.save.botCurrentOp = 0;
                        dispNews(178, "[Cyborg] Simulation Cyborg status: FINISHED");
                    }
                    _root.save.botActive = true;
                    _root.save.botCurrentOpNum = 1;
                    _root.save.botCurrentOpMax = 1;
                }
            }
        }
        _root.cyborgWorking = _root.save.botActive;
    }
}

function gainCyborgPoint(amount) {
    if (!isNaN(amount) && amount > 0 && amount != Infinity && _root.save.bestLevel >= 1250) {
        _root.save.botPoint += Math.floor(amount);
        if (_root.save.botPoint > 9999999999) {
            _root.save.botPoint = 9999999999;
        }
        if (Math.floor(amount) >= 2) {
            dispNews(174, "[Cyborg] Gained " + withComma(amount) + " Cyborg Points! You now have " + withComma(_root.save.botPoint) + ".");
        }
        else {
            dispNews(174, "[Cyborg] Gained 1 Cyborg Point! You now have " + withComma(_root.save.botPoint) + ".");
        }
    }
}

function gainCyborgEXP(amount) {
    if (!isNaN(amount) && amount > 0 && amount != Infinity) {
        let expReq = _root.save.botLevel * 5;
        if (_root.save.botLevel > 100) {
            expReq = _root.save.botLevel * (_root.save.botLevel - 99) * 5;
        }
        if (_root.save.botLevel == 200) {
            expReq = -1;
        }
        if (amount > expReq && expReq > 0) {
            amount = expReq;
        }
        _root.save.botExp += Math.floor(amount);
        dispNews(179, "[Cyborg] Simulation Cyborg gained " + withComma(amount) + " EXP!");
        if (_root.save.botExp >= expReq && expReq > 0) {
            _root.save.botExp -= expReq;
            _root.save.botLevel += 1;
            dispNews(180, "[Cyborg] Simulation Cyborg LEVEL UP! Simulation Cyborg is now Lv. " + withComma(_root.save.botLevel) + ".");
        }
    }
}

function calcPerf(op) {
    let tempCPerf = 0;
    if (op == 0) {
        tempCPerf = 40 + _root.save.botLevel * 1;
    }
    else if (op == 1) {
        tempCPerf = Math.floor(100 + _root.save.highPong * 0.0065 + Math.pow(_root.save.totalPong / 100000, 0.4) * 10) * 100;
    }
    else if (op == 2) {
        tempCPerf = Math.floor(100 + _root.save.highAvoidance * 0.0065 + Math.pow(_root.save.totalAvoidance / 100000, 0.4) * 10) * 100;
    }
    else if (op == 3) {
        tempCPerf = Math.floor(100 + _root.save.highMath * 0.0065 + Math.pow(_root.save.totalMath / 100000, 0.4) * 10) * 100;
    }
    else if (op == 4) {
        tempCPerf = Math.floor(100 + _root.save.highWhack * 0.0065 + Math.pow(_root.save.totalWhack / 100000, 0.4) * 10) * 100;
    }
    else if (op == 5) {
        tempCPerf = Math.floor(100 + _root.save.highCount * 0.0065 + Math.pow(_root.save.totalCount / 100000, 0.4) * 10) * 100;
    }
    else if (op == 6) {
        tempCPerf = Math.floor(100 + _root.save.highMind * 0.0065 + Math.pow(_root.save.totalMind / 100000, 0.4) * 10) * 100;
    }
    else if (op == 7) {
        tempCPerf = Math.floor(100 + _root.save.highBalance * 0.0065 + Math.pow(_root.save.totalBalance / 100000, 0.4) * 10) * 100;
    }
    else if (op == 8) {
        tempCPerf = Math.floor(50 + _root.save.stadiumAbilityCost / 4 + Math.pow(_root.save.stadiumRace, 0.3) * 10 + Math.pow(_root.save.stadiumImpossibleRace, 0.4) * 15) / 10;
    }
    else if (op == 9) {
        tempCPerf = Math.floor(50 + _root.save.stadiumAbilityCost / 4 + Math.pow(_root.save.stadiumItem, 0.3) * 10 + Math.pow(_root.save.stadiumImpossibleItem, 0.4) * 15) / 10;
    }
    else if (op == 10) {
        tempCPerf = Math.floor(50 + _root.save.stadiumAbilityCost / 8 + _root.save.stadiumBestDeathMatch * 0.65 + Math.pow(_root.save.stadiumDeathMatch, 0.5) * 2);
    }
    else if (op == 11) {
        tempCPerf = Math.floor(100 + _root.save.highMMRX * 0.0065 + Math.pow(_root.save.totalMMRX / 100000, 0.4) * 10) * 100;
    }
    else if (op == 12) {
        tempCPerf = Math.floor(45 + 500 * _root.save.fcgMaxStreak1 / (_root.save.fcgMaxStreak1 + 25) + Math.pow(_root.save.fcgLevel1, 0.4) * 14 + _root.save.fcgLevel * 9) / 10;
    }
    else if (op == 13) {
        tempCPerf = Math.floor(40 + 500 * _root.save.fcgMaxStreak2 / (_root.save.fcgMaxStreak2 + 25) + Math.pow(_root.save.fcgLevel2, 0.4) * 13 + _root.save.fcgLevel * 8) / 10;
    }
    else if (op == 14) {
        tempCPerf = Math.floor(35 + 500 * _root.save.fcgMaxStreak3 / (_root.save.fcgMaxStreak3 + 25) + Math.pow(_root.save.fcgLevel3, 0.4) * 12 + _root.save.fcgLevel * 7) / 10;
    }
    else if (op == 15) {
        tempCPerf = Math.floor(30 + 500 * _root.save.fcgMaxStreak4 / (_root.save.fcgMaxStreak4 + 25) + Math.pow(_root.save.fcgLevel4, 0.4) * 11 + _root.save.fcgLevel * 6) / 10;
    }
    else if (op == 16) {
        tempCPerf = Math.floor(25 + 500 * _root.save.fcgMaxStreak6 / (_root.save.fcgMaxStreak6 + 25) + Math.pow(_root.save.fcgLevel6, 0.3) * 9 + _root.save.fcgLevel * 4) / 10;
    }
    else if (op == 17) {
        tempCPerf = Math.floor(20 + 500 * _root.save.fcgMaxStreak7 / (_root.save.fcgMaxStreak7 + 25) + Math.pow(_root.save.fcgLevel7, 0.3) * 8 + _root.save.fcgLevel * 3) / 10;
    }
    else if (op == 18) {
        tempCPerf = Math.floor(15 + 500 * _root.save.fcgMaxStreak8 / (_root.save.fcgMaxStreak8 + 25) + Math.pow(_root.save.fcgLevel8, 0.3) * 7 + _root.save.fcgLevel * 2) / 10;
    }
    else if (op == 19) {
        tempCPerf = Math.floor(10 + 500 * _root.save.fcgMaxStreak10 / (_root.save.fcgMaxStreak10 + 25) + Math.pow(_root.save.fcgLevel10, 0.3) * 5 + _root.save.fcgLevel * 1) / 10;
    }
    else if (op == 20) {
        tempCPerf = Math.floor(10 + 500 * _root.save.fishBestStreak / (_root.save.fishBestStreak + 25) + Math.pow(_root.save.fishPerfect, 0.3) * 5 + _root.save.fishBestLevel * 5) / 10;
    }
    if (op != 0 && tempCPerf < _root.cyborgActMaxPerf[op]) {
        tempCPerf += (_root.cyborgActMaxPerf[op] - tempCPerf) * (_root.save.botLevel * 0.0025 + Math.pow(_root.save.botOp[op] * Math.max(30, _root.cyborgActTime[op]) / 30, 0.45) * 0.001);
    }
    if (op >= 1 && op <= 7 || op == 11) {
        tempCPerf = Math.floor(tempCPerf / 100) * 100;
    }
    else if (op == 10) {
        tempCPerf = Math.floor(tempCPerf);
    }
    else {
        tempCPerf = Math.floor(tempCPerf * 10) / 10;
    }
    if (tempCPerf > _root.cyborgActMaxPerf[op]) {
        tempCPerf = _root.cyborgActMaxPerf[op];
    }
    if (tempCPerf < _root.cyborgActMinPerf[op]) {
        tempCPerf = _root.cyborgActMinPerf[op];
    }
    if (isNaN(tempCPerf)) {
        tempCPerf = 0;
    }
    return tempCPerf;
}

function calcMaxPerfCount() {
    let maxPerfCount = 0;
    let tmpOp = 1;
    while (tmpOp <= 20) {
        if (_root.cyborgActMaxPerf[tmpOp] == calcPerf(tmpOp)) {
            maxPerfCount += 1;
        }
        tmpOp++;
    }
    _root.save.botMaxTask = maxPerfCount;
}

/// XXX: half complete, implement for other stuff than fishing (fishing is the best)
export function cyborgOp(op) {
    let ftc;
    if (op == 0) {
        _root.save.botEnergy += calcPerf(0);
        if (_root.save.botEnergy > 359999) {
            _root.save.botEnergy = 359999;
        }
    }
    else if (op >= 1 && op <= 7 || op == 11) {
        tempCScore = Math.floor(calcPerf(op) * (0.005 + Math.random() * 0.0025 + Math.random() * 0.001 + Math.random() * Math.random() * 0.0015)) * 100;
        if (op == 1) {
            gainWhiteCoin(6 + random(10));
            cybA = "Pong";
            medMult = 3;
            div = 50;
            if (_root.save.highPong < tempCScore) {
                _root.save.highPong = tempCScore;
            }
            if (_root.save.todayHighPong < tempCScore) {
                _root.save.todayHighPong = tempCScore;
            }
            _root.save.totalPong += tempCScore;
            dispNews(175, "[Cyborg] Simulation Cyborg scored " + withComma(tempCScore) + " in Pong.");
        }
        else if (op == 2) {
            gainWhiteCoin(2 + random(6));
            cybA = "Ultimate Avoidance";
            medMult = 3;
            div = 50;
            if (_root.save.highAvoidance < tempCScore) {
                _root.save.highAvoidance = tempCScore;
            }
            if (_root.save.todayHighAvoidance < tempCScore) {
                _root.save.todayHighAvoidance = tempCScore;
            }
            _root.save.totalAvoidance += tempCScore;
            dispNews(175, "[Cyborg] Simulation Cyborg scored " + withComma(tempCScore) + " in Ultimate Avoidance.");
        }
        else if (op == 3) {
            gainWhiteCoin(1 + random(4));
            cybA = "Math Master";
            medMult = 2;
            div = 150;
            if (_root.save.highMath < tempCScore) {
                _root.save.highMath = tempCScore;
            }
            if (_root.save.todayHighMath < tempCScore) {
                _root.save.todayHighMath = tempCScore;
            }
            _root.save.totalMath += tempCScore;
            dispNews(175, "[Cyborg] Simulation Cyborg scored " + withComma(tempCScore) + " in Math Master.");
        }
        else if (op == 4) {
            gainWhiteCoin(2 + random(6));
            cybA = "Whack-a-greg";
            medMult = 2;
            div = 100;
            if (_root.save.highWhack < tempCScore) {
                _root.save.highWhack = tempCScore;
            }
            if (_root.save.todayHighWhack < tempCScore) {
                _root.save.todayHighWhack = tempCScore;
            }
            _root.save.totalWhack += tempCScore;
            dispNews(175, "[Cyborg] Simulation Cyborg scored " + withComma(tempCScore) + " in Whack-a-greg.");
        }
        else if (op == 5) {
            gainWhiteCoin(8 + random(14));
            cybA = "Triangle Count";
            medMult = 3;
            div = 100;
            if (_root.save.highCount < tempCScore) {
                _root.save.highCount = tempCScore;
            }
            if (_root.save.todayHighCount < tempCScore) {
                _root.save.todayHighCount = tempCScore;
            }
            _root.save.totalCount += tempCScore;
            dispNews(175, "[Cyborg] Simulation Cyborg scored " + withComma(tempCScore) + " in Triangle Count.");
        }
        else if (op == 6) {
            gainWhiteCoin(4 + random(8));
            cybA = "MindSweeper";
            medMult = 4;
            div = 100;
            if (_root.save.highMind < tempCScore) {
                _root.save.highMind = tempCScore;
            }
            if (_root.save.todayHighMind < tempCScore) {
                _root.save.todayHighMind = tempCScore;
            }
            _root.save.totalMind += tempCScore;
            dispNews(175, "[Cyborg] Simulation Cyborg scored " + withComma(tempCScore) + " in MindSweeper.");
        }
        else if (op == 7) {
            gainWhiteCoin(6 + random(10));
            cybA = "Balance 3";
            medMult = 3;
            div = 80;
            if (_root.save.highBalance < tempCScore) {
                _root.save.highBalance = tempCScore;
            }
            if (_root.save.todayHighBalance < tempCScore) {
                _root.save.todayHighBalance = tempCScore;
            }
            _root.save.totalBalance += tempCScore;
            dispNews(175, "[Cyborg] Simulation Cyborg scored " + withComma(tempCScore) + " in Balance 3.");
        }
        else if (op == 11) {
            gainWhiteCoin(6 + random(10));
            cybA = "MMR X";
            medMult = 4;
            div = 80;
            if (_root.save.highMMRX < tempCScore) {
                _root.save.highMMRX = tempCScore;
            }
            if (_root.save.todayMMRX < tempCScore) {
                _root.save.todayMMRX = tempCScore;
            }
            _root.save.totalMMRX += tempCScore;
            dispNews(175, "[Cyborg] Simulation Cyborg scored " + withComma(tempCScore) + " in MMR X.");
        }
        gainCyborgEXP(Math.ceil((tempCScore / _root.cyborgActMaxPerf[op] + 1) * (_root.cyborgActTime[op] / 20) + _root.cyborgActCost[op] / 10));
        if (tempCScore >= 100000) {
            medalToGet = Math.floor(Math.floor(tempCScore / 100000) * medMult * (1 + _root.curCareerLevel[6] * 0.02));
            dispNews(175, "[Cyborg] You have gained " + medalToGet + " Arcade 100k Medals!");
            _root.save.arcade100kMedal += medalToGet;
        }
        if (_root.save.questType == cybA) {
            if (_root.save.questSubtype == "High Score") {
                if (_root.save.questCount < tempCScore) {
                    _root.save.questCount = tempCScore;
                }
            }
            if (_root.save.questSubtype == "Total Score") {
                _root.save.questCount += tempCScore;
            }
        }
        _root.arcadeRewardMult = 3;
        if (_root.save.careerLevel[6] >= 200) {
            _root.arcadeRewardMult *= 1 + _root.save.arcadeRating * 0.06;
        }
        else {
            _root.arcadeRewardMult *= 1 + _root.save.arcadeRating * 0.05;
        }
        gainCareerEXP(6, Math.floor(tempCScore / div / 4 * _root.arcadeRewardMult), true);
        let baseExp = Math.floor(tempCScore / div / 1.8 * _root.arcadeRewardMult);
        let baseCoin = Math.floor(tempCScore / div / 2.4 * _root.arcadeRewardMult);
        let baseGreenCoin = Math.floor(tempCScore / div * 2.5 * _root.arcadeRewardMult);
        let baseBlueCoin = Math.floor(tempCScore / div / 200 * _root.arcadeRewardMult);
        baseExp = Math.floor(baseExp * (1 + _root.curCareerLevel[6] * 0.005) * (1 + _root.save.petStat[4] * 0.002));
        baseCoin = Math.floor(baseCoin * (1 + _root.curCareerLevel[6] * 0.01));
        baseGreenCoin = Math.floor(baseGreenCoin * (1 + _root.curCareerLevel[6] * 0.01));
        let finalExp = Math.ceil(baseExp * Math.pow(_root.save.level, 0.6) * (_root.save.boost / 100));
        let finalCoin = Math.ceil(baseCoin * Math.pow(_root.save.level, 0.6) * (_root.save.boost / 100));
        let finalGreenCoin = Math.ceil(baseGreenCoin);
        let finalBlueCoin = Math.ceil(baseBlueCoin);
        if (_root.save.permaBanPenalty[10] == 3) {
            finalExp = Math.floor(finalExp * 3);
        }
        else if (_root.save.permaBanPenalty[10] == 2) {
            finalExp = Math.floor(finalExp * 2.2);
        }
        else if (_root.save.permaBanPenalty[10] == 1) {
            finalExp = Math.floor(finalExp * 1.8);
        }
        if (_root.save.banPenalty[9] == 1) {
            finalExp = Math.floor(finalExp * 1.3);
        }
        if (finalExp > 99999999999) {
            finalExp = 99999999999;
        }
        if (finalCoin > 99999999999) {
            finalCoin = 99999999999;
        }
        gainEXP(finalExp, 10);
        gainCoin(finalCoin, 10);
        gainGreenCoin(finalGreenCoin);
        gainGreenCoin(finalBlueCoin);
        tempProgToGet = cyborgActTime[op] * 25;
        _root.progPercent += tempProgToGet;
        dispNews(175, "[Cyborg] You have gained: " + withComma(finalExp) + " EXP + " + withComma(finalCoin) + " Coins");
    }
    else if (op >= 8 && op <= 9) {
        if (Math.random() < calcPerf(op) / 100) {
            order = 1;
            gainCyborgEXP(2);
            if (Math.random() < 0.5) {
                gainWhiteCoin(1);
            }
        }
        else {
            order = 2 + random(4);
            if (order != 5) {
                gainCyborgEXP(1);
            }
        }
        if (op == 8) {
            baseExp = 3200;
            baseCoin = 5900;
            baseGreenCoin = 10000;
            baseBlueCoin = 20;
            baseToken = 600;
        }
        else {
            baseExp = 3750;
            baseCoin = 6900;
            baseGreenCoin = 12500;
            baseBlueCoin = 25;
            baseToken = 700;
        }
        fReward = _root.save.stadiumReward;
        gainCareerEXP(7, Math.floor(300 + (300 + (5 - order) * 50) * (100 + fReward) / 100 / order), true);
        finalExp = Math.ceil((baseExp - 150) / order * Math.pow(_root.save.level, 0.6) * (_root.save.boost / 100) * (1 + fReward * 0.01));
        finalCoin = Math.ceil((baseCoin - 150) / order * Math.pow(_root.save.level, 0.6) * (_root.save.boost / 100));
        finalGreenCoin = Math.ceil(baseGreenCoin / order);
        finalBlueCoin = Math.ceil(baseBlueCoin / order);
        finalToken = Math.ceil(baseToken / order);
        finalExp = Math.floor(finalExp * (1 + _root.curCareerLevel[7] * 0.005) * (1 + _root.save.petStat[5] * 0.002));
        finalCoin = Math.floor(finalCoin * (1 + _root.curCareerLevel[7] * 0.005));
        finalToken = Math.floor(finalToken * (1 + _root.curCareerLevel[7] * 0.01));
        if (_root.save.careerLevel[7] >= 100) {
            finalGreenCoin = Math.floor(finalGreenCoin * 2);
        }
        if (_root.save.careerLevel[7] >= 200) {
            finalBlueCoin = Math.floor(finalBlueCoin * 4);
        }
        if (order >= 2) {
            finalCoin = Math.floor(finalCoin * 0.5);
            finalToken = Math.floor(finalToken * 0.5);
        }
        if (order == 5) {
            finalExp = Math.floor(finalExp * 0.5);
            finalCoin = Math.floor(finalCoin * 0.5);
            finalGreenCoin = Math.floor(finalGreenCoin * 0.5);
            finalBlueCoin = Math.floor(finalBlueCoin * 0.5);
            finalToken = Math.floor(finalToken * 0.5);
        }
        if (_root.save.banPenalty[9] == 1) {
            finalExp = Math.floor(finalExp * 1.3);
        }
        if (_root.save.stadiumProTime > 0) {
            finalExp = Math.floor(finalExp * 1.5);
            finalToken = Math.floor(finalToken * 2);
        }
        if (_root.save.permaBanPenalty[19] == 3) {
            finalExp = Math.floor(finalExp * 3);
        }
        else if (_root.save.permaBanPenalty[19] == 2) {
            finalExp = Math.floor(finalExp * 2.2);
        }
        else if (_root.save.permaBanPenalty[19] == 1) {
            finalExp = Math.floor(finalExp * 1.8);
        }
        if (finalExp < 0) {
            finalExp = 0;
        }
        if (finalCoin < 0) {
            finalCoin = 0;
        }
        gainEXP(finalExp, 11);
        _root.gainCoin(finalCoin, 11);
        gainGreenCoin(finalGreenCoin);
        gainGreenCoin(finalBlueCoin);
        if (op == 8) {
            dispNews(175, "[Cyborg] Simple Race COMPLETE! - Position: #" + order);
        }
        else if (op == 9) {
            dispNews(175, "[Cyborg] Item Fight COMPLETE! - Position: #" + order);
        }
        dispNews(175, "[Cyborg] You have gained: " + withComma(finalExp) + " EXP + " + withComma(finalCoin) + " Coins");
        dispNews(175, "[Cyborg] You have gained " + withComma(finalToken) + " Stadium Tokens!");
        if (order == 1) {
            if (_root.save.questType == "Simple Race" && op == 8 || _root.save.questType == "Item Fight" && op == 9) {
                if (_root.save.questSubtype == "Easy") {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Medium") {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Hard") {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Impossible") {
                    _root.save.questCount += 1;
                }
            }
            if (op == 8) {
                _root.save.stadiumRace += 1;
                _root.save.stadiumImpossibleRace += 1;
            }
            else if (op == 9) {
                _root.save.stadiumItem += 1;
                _root.save.stadiumImpossibleItem += 1;
            }
        }
        _root.save.stadiumToken += finalToken;
    }
    else if (op == 10) {
        tempCScore = Math.floor(calcPerf(op) * (0.5 + Math.random() * 0.3 + Math.random() * 0.2));
        baseExp = 250000;
        baseCoin = 250000;
        baseGreenCoin = 500000;
        baseBlueCoin = 1000;
        baseToken = 10000;
        fReward = _root.save.stadiumReward;
        if (_root.save.questType == "Death Match") {
            if (_root.save.questSubtype == "PWNt") {
                if (_root.save.questCount < tempCScore) {
                    _root.save.questCount = tempCScore;
                }
            }
        }
        if (Math.random() < 0.95 && Math.random() < (tempCScore - 200) / 500) {
            order = 1;
            gainCyborgEXP(Math.ceil((tempCScore / 1100 + 1) * (_root.cyborgActTime[op] / 20) + 50));
        }
        else {
            order = 2 + random(4);
            if (tempCScore >= 600) {
                order = 2;
            }
            gainCyborgEXP(Math.ceil((tempCScore / 1100 + 1) * (_root.cyborgActTime[op] / 20) + 10));
        }
        gainCareerEXP(7, Math.floor(10000 + (20000 + tempCScore * 50 + (5 - order) * 5000) * (100 + fReward) / 100 / order), true);
        finalExp = Math.ceil((baseExp + Math.floor(tempCScore * 250)) / order * Math.pow(_root.save.level, 0.6) * (_root.save.boost / 100) * (1 + fReward * 0.01));
        finalCoin = Math.ceil((baseCoin + Math.floor(tempCScore * 250)) / order * Math.pow(_root.save.level, 0.6) * (_root.save.boost / 100));
        finalGreenCoin = Math.ceil((baseGreenCoin + tempCScore * 500) / order);
        finalBlueCoin = Math.ceil((baseBlueCoin + tempCScore * 1) / order);
        finalToken = Math.ceil((baseToken + tempCScore * 10) / order);
        finalExp = Math.floor(finalExp * (1 + _root.curCareerLevel[7] * 0.005) * (1 + _root.save.petStat[5] * 0.002));
        finalCoin = Math.floor(finalCoin * (1 + _root.curCareerLevel[7] * 0.005));
        finalToken = Math.floor(finalToken * (1 + _root.curCareerLevel[7] * 0.01));
        if (_root.save.careerLevel[7] >= 100) {
            finalGreenCoin = Math.floor(finalGreenCoin * 2);
        }
        if (_root.save.careerLevel[7] >= 200) {
            finalBlueCoin = Math.floor(finalBlueCoin * 4);
        }
        if (order >= 2) {
            finalCoin = Math.floor(finalCoin * 0.5);
            finalToken = Math.floor(finalToken * 0.5);
        }
        if (order == 5) {
            finalExp = Math.floor(finalExp * 0.5);
            finalCoin = Math.floor(finalCoin * 0.5);
            finalGreenCoin = Math.floor(finalGreenCoin * 0.5);
            finalBlueCoin = Math.floor(finalBlueCoin * 0.5);
            finalToken = Math.floor(finalToken * 0.5);
        }
        if (_root.save.banPenalty[9] == 1) {
            finalExp = Math.floor(finalExp * 1.3);
        }
        if (_root.save.stadiumProTime > 0) {
            finalExp = Math.floor(finalExp * 1.5);
            finalToken = Math.floor(finalToken * 2);
        }
        if (_root.save.permaBanPenalty[19] == 3) {
            finalExp = Math.floor(finalExp * 3);
        }
        else if (_root.save.permaBanPenalty[19] == 2) {
            finalExp = Math.floor(finalExp * 2.2);
        }
        else if (_root.save.permaBanPenalty[19] == 1) {
            finalExp = Math.floor(finalExp * 1.8);
        }
        if (finalExp < 0) {
            finalExp = 0;
        }
        if (finalCoin < 0) {
            finalCoin = 0;
        }
        if (finalExp > 999999999999) {
            finalExp = 999999999999;
        }
        if (finalCoin > 999999999999) {
            finalCoin = 999999999999;
        }
        gainEXP(finalExp, 11);
        _root.gainCoin(finalCoin, 11);
        gainGreenCoin(finalGreenCoin);
        gainGreenCoin(finalBlueCoin);
        gainWhiteCoin(Math.floor((10 + tempCScore / 25) / order));
        _root.save.stadiumToken += finalToken;
        dispNews(175, "[Cyborg] Death Match COMPLETE! - Position: #" + order + " - PWNts: " + withComma(tempCScore));
        dispNews(175, "[Cyborg] You have gained: " + withComma(finalExp) + " EXP + " + withComma(finalCoin) + " Coins");
        dispNews(175, "[Cyborg] You have gained " + withComma(finalToken) + " Stadium Tokens!");
        if (order == 1) {
            if (_root.save.questType == "Death Match") {
                if (_root.save.questSubtype == "Win") {
                    _root.save.questCount += 1;
                }
            }
            _root.save.stadiumDeathMatch += 1;
        }
        if (_root.save.stadiumBestDeathMatch < tempCScore) {
            _root.save.stadiumBestDeathMatch = tempCScore;
        }
        if (_root.save.stadiumTodayDeathMatch < tempCScore) {
            _root.save.stadiumTodayDeathMatch = tempCScore;
        }
    }
    else if (op >= 11 && op <= 19) {
        _root.save.fcgPlay += 1;
        if (op == 11) {
            fDiff = 0;
            diffMult = 0;
        }
        else if (op == 12) {
            fDiff = 1;
            diffMult = 1;
        }
        else if (op == 13) {
            fDiff = 2;
            diffMult = 2;
        }
        else if (op == 14) {
            fDiff = 3;
            diffMult = 3;
        }
        else if (op == 15) {
            fDiff = 4;
            diffMult = 4;
        }
        else if (op == 16) {
            fDiff = 6;
            diffMult = 6;
        }
        else if (op == 17) {
            fDiff = 7;
            diffMult = 15;
        }
        else if (op == 18) {
            fDiff = 8;
            diffMult = 20;
        }
        else if (op == 19) {
            fDiff = 10;
            diffMult = 30;
        }
        if (op == 19) {
            _root.save.fcgSeriousDeck = 34 + random(35);
        }
        actualWinRate = calcPerf(op);
        if (op == 19 && _root.save.fcgSeriousDeck == 69) {
            actualWinRate *= 0.2;
        }
        if (Math.random() < actualWinRate / 100) {
            if (_root.save.questType == "Win") {
                if (_root.save.questSubtype == "Any") {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Level 2" && fDiff >= 2) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Level 3" && fDiff >= 3) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Level 4" && fDiff >= 4) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Level 6" && fDiff >= 6) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Level 7" && fDiff >= 7) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Level 8" && fDiff >= 8) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Level 10" && fDiff >= 10) {
                    _root.save.questCount += 1;
                }
            }
            if (fDiff == 6) {
                gainWhiteCoin(1);
            }
            else if (fDiff == 7) {
                gainWhiteCoin(3);
            }
            else if (fDiff == 8) {
                gainWhiteCoin(5);
            }
            else if (fDiff == 10) {
                if (_root.save.fcgStreak10 >= 4 && _root.save.fcgStreak10 % 5 == 4) {
                    _root.save.fcgSeriousDeck = 69;
                }
                gainWhiteCoin(10);
            }
            _root.save.fcgWin += 1;
            _root.save.fcgStreak += 1;
            target = 2500;
            finalFcgExp = 25;
            finalFcgCash = 100;
            if (op == 19 && _root.save.fcgSeriousDeck == 69) {
                target = 62500;
                finalFcgExp = 1337;
                finalFcgCash = 5000;
                gainWhiteCoin(50);
            }
            _root.save["fcgStreak" + fDiff] += 1;
            if (_root.save["fcgMaxStreak" + fDiff] < _root.save["fcgStreak" + fDiff]) {
                _root.save["fcgMaxStreak" + fDiff] = _root.save["fcgStreak" + fDiff];
            }
            _root.save["fcgLevel" + fDiff] += 1;
            target += 2500 + Math.min(_root.save["fcgStreak" + fDiff], 50) * diffMult * 100 + diffMult * 1000;
            finalFcgExp += 25 + Math.min(_root.save["fcgStreak" + fDiff], 50) * diffMult * 1 + diffMult * 25;
            finalFcgCash += 100 + Math.min(_root.save["fcgStreak" + fDiff], 50) * diffMult * 2 + diffMult * 50;
            target = Math.floor(target * (1 + _root.save.fcgLevel * 0.02) * (1 + Math.random() * 0.05));
            finalFcgExp = Math.floor(finalFcgExp * (1 + _root.save.fcgLevel * 0.002) * (1 + Math.random() * 0.05));
            finalFcgCash = Math.floor(finalFcgCash * (1 + _root.save.fcgLevel * 0.002) * (0.7 + Math.random() * 0.4));
            if (_root.save.powerUserTime > 0 && _root.save.banPenalty[9] == 1) {
                target = Math.floor(target * 1.95);
                finalFcgCash = Math.floor(finalFcgCash * 2);
            }
            else if (_root.save.powerUserTime > 0) {
                target = Math.floor(target * 1.5);
                finalFcgCash = Math.floor(finalFcgCash * 2);
            }
            else if (_root.save.banPenalty[9] == 1) {
                target = Math.floor(target * 1.3);
            }
            target = Math.floor(target * (1 + _root.save.petStat[6] * 0.002));
            finalExp = Math.ceil(Math.pow(_root.save.level, 0.6) * Math.max(_root.boostMax, _root.save.boost) / 100) * target;
            finalExp = Math.floor(finalExp * (1 + _root.curCareerLevel[8] * 0.005));
            if (_root.save.permaBanPenalty[20] == 3) {
                finalExp = Math.floor(finalExp * 3);
            }
            else if (_root.save.permaBanPenalty[20] == 2) {
                finalExp = Math.floor(finalExp * 2.2);
            }
            else if (_root.save.permaBanPenalty[20] == 1) {
                finalExp = Math.floor(finalExp * 1.8);
            }
            if (_root.save.careerLevel[8] >= 100) {
                finalFcgCash = Math.floor(finalFcgCash * 1.5);
            }
            gainEXP(finalExp, 12);
            _root.save.fcgExp += finalFcgExp;
            _root.save.fcgCash += finalFcgCash;
            gainGreenCoin(Math.floor(finalFcgExp / 2 * (1 + _root.curCareerLevel[8] * 0.01)));
            gainCareerEXP(8, Math.floor(500 + finalFcgExp * 15), true);
            gainCyborgEXP(Math.ceil(2 * (_root.cyborgActTime[op] / 20) + _root.cyborgActCost[op] / 10));
            dispNews(175, "[Cyborg] Epic win! (+" + withComma(finalExp) + " EXP)");
            dispNews(175, "[Cyborg] You have gained " + withComma(finalFcgExp) + " FCG EXP + " + withComma(finalFcgCash) + " FCG Cash!");
        }
        else {
            target = 500;
            finalFcgExp = 5;
            finalFcgCash = 10;
            _root.save["fcgStreak" + fDiff] = 0;
            _root.save.fcgStreak = 0;
            _root.save.fcgLose += 1;
            target = Math.floor(target * (1 + _root.save.fcgLevel * 0.02) * (1 + Math.random() * 0.05));
            finalFcgExp = Math.floor(finalFcgExp * (1 + _root.save.fcgLevel * 0.005) * (1 + Math.random() * 0.05));
            finalFcgCash = Math.floor(finalFcgCash * (1 + _root.save.fcgLevel * 0.005) * (0.7 + Math.random() * 0.4));
            if (_root.save.powerUserTime > 0 && _root.save.banPenalty[9] == 1) {
                target = Math.floor(target * 1.95);
                finalFcgCash = Math.floor(finalFcgCash * 2);
            }
            else if (_root.save.powerUserTime > 0) {
                target = Math.floor(target * 1.5);
                finalFcgCash = Math.floor(finalFcgCash * 2);
            }
            else if (_root.save.banPenalty[9] == 1) {
                target = Math.floor(target * 1.3);
            }
            target = Math.floor(target * (1 + _root.save.petStat[6] * 0.002));
            finalExp = Math.ceil(Math.pow(_root.save.level, 0.6) * Math.max(_root.boostMax, _root.save.boost) / 100) * target;
            gainEXP(finalExp, 12);
            _root.save.fcgExp += finalFcgExp;
            _root.save.fcgCash += finalFcgCash;
            gainGreenCoin(Math.floor(finalFcgExp / 2 * (1 + _root.curCareerLevel[8] * 0.01)));
            gainCareerEXP(8, Math.floor(500 + finalFcgExp * 15), true);
            dispNews(175, "[Cyborg] Epic lose! (+" + withComma(finalExp) + " EXP)");
            dispNews(175, "[Cyborg] You have gained " + withComma(finalFcgExp) + " FCG EXP + " + withComma(finalFcgCash) + " FCG Cash!");
        }
    }
    else if (op == 20) {
        let i;
        let fL;
        let chance;
        let tempChance;
        let cybFishCurrent;
        let blah;
        let chaos;
        let chaos1 = random(200) + 1;
        if (_root.save.careerLevel[12] >= 200 && Math.random() < 0.03) {
            chaos1 = random(20) + 1;
        }
        if (Math.random() < 0.05 && _root.save.fishStreak >= 2) {
            cybFishCurrent = 59;
        }
        else if (chaos1 <= 3 && _root.save.fishStreak >= 5) {
            chaos = random(100) + 1;
            if (chaos <= 4 && _root.save.fishLevel >= 25) {
                cybFishCurrent = 3;
            }
            else if (chaos <= 20 && _root.save.fishLevel >= 15) {
                cybFishCurrent = 2;
            }
            else {
                cybFishCurrent = 1;
            }
        }
        else if (chaos1 <= 6 && _root.save.fishStreak >= 4) {
            chaos = random(100) + 1;
            if (chaos <= 4 && _root.save.fishLevel >= 25) {
                cybFishCurrent = 6;
            }
            else if (chaos <= 20 && _root.save.fishLevel >= 15) {
                cybFishCurrent = 5;
            }
            else {
                cybFishCurrent = 4;
            }
        }
        else if (chaos1 <= 12 && _root.save.fishStreak >= 3) {
            chaos = random(100) + 1;
            tempChance = _root.save.fishLevel;
            if (chaos <= tempChance) {
                cybFishCurrent = 8;
            }
            else if (chaos <= 50) {
                cybFishCurrent = 7;
            }
            else if (chaos <= 50 + tempChance) {
                cybFishCurrent = 10;
            }
            else if (chaos <= 100) {
                cybFishCurrent = 9;
            }
        }
        else if (chaos1 <= 17 && _root.save.fishStreak >= 6) {
            if (_root.save.fishStreak >= 10 && _root.save.fishLevel >= 20 && Math.random() < 0.6) {
                cybFishCurrent = 54;
            }
            else if (_root.save.fishStreak >= 9 && _root.save.fishLevel >= 15 && Math.random() < 0.7) {
                cybFishCurrent = 61;
            }
            else if (_root.save.fishStreak >= 8 && _root.save.fishLevel >= 10 && Math.random() < 0.8) {
                cybFishCurrent = 53;
            }
            else if (_root.save.fishStreak >= 7 && _root.save.fishLevel >= 5 && Math.random() < 0.9) {
                cybFishCurrent = 60;
            }
            else {
                cybFishCurrent = 52;
            }
        }
        else if (chaos1 <= 20 && _root.save.fishStreak >= 5 || _root.save.eliteFisherTime > 0 && _root.save.fishStreak >= 2 && Math.random() < 0.02 && chaos1 > 20) {
            if (_root.save.fishStreak >= 11 && _root.save.fishLevel >= 30 && Math.random() < 0.4) {
                cybFishCurrent = 58;
            }
            else if (_root.save.fishStreak >= 9 && _root.save.fishLevel >= 20 && Math.random() < 0.6) {
                cybFishCurrent = 57;
            }
            else if (_root.save.fishStreak >= 7 && _root.save.fishLevel >= 10 && Math.random() < 0.8) {
                cybFishCurrent = 56;
            }
            else {
                cybFishCurrent = 55;
            }
        }
        else if (chaos1 <= 130) {
            ftc = 11;
            fL = _root.save.fishLevel + 1 + Math.ceil(Math.sqrt(_root.save.fishStreak / 3));
            if (_root.save.eliteFisherTime > 0) {
                fL += 4;
            }
            i = 1;
            while (i <= fL) {
                if (ftc < 30) {
                    let blah = _root.save.fishLevel - _root.fishArray[ftc + 1].fishLevel;
                    if (blah > 0) {
                        chance = 45 + Math.pow(blah, 0.7) * 3;
                    }
                    else {
                        chance = 35 - Math.pow(Math.abs(blah), 1.1) * 3;
                    }
                    if (ftc >= 20) {
                        chance *= 0.6;
                    }
                    if (chance > 80) {
                        chance = 80;
                    }
                    if (Math.random() < chance / 100) {
                        ftc += 1;
                    }
                }
                i++;
            }
            if (Math.random() < 0.3) {
                ftc = 11 + random(ftc - 10);
            }
            cybFishCurrent = ftc;
        }
        else {
            ftc = 31;
            fL = _root.save.fishLevel + 1 + Math.ceil(Math.sqrt(_root.save.fishStreak / 3));
            if (_root.save.eliteFisherTime > 0) {
                fL += 4;
            }
            i = 1;
            while (i <= fL) {
                if (ftc < 60) {
                    if (ftc >= 50) {
                        blah = _root.save.fishLevel - _root.fishArray[ftc + 21].fishLevel;
                    }
                    else {
                        blah = _root.save.fishLevel - _root.fishArray[ftc + 1].fishLevel;
                    }
                    if (blah > 0) {
                        chance = 45 + Math.pow(blah, 0.7) * 3;
                    }
                    else {
                        chance = 35 - Math.pow(Math.abs(blah), 1.1) * 3;
                        if (ftc >= 50) {
                            chance *= 0.1;
                        }
                    }
                    if (ftc >= 40) {
                        chance *= 0.6;
                    }
                    if (ftc >= 50) {
                        chance *= 0.5;
                    }
                    if (ftc >= 50 && _root.save.fishStreak < (ftc - 50) * 2) {
                        chance *= 0.3;
                    }
                    if (chance > 80) {
                        chance = 80;
                    }
                    if (Math.random() < chance / 100) {
                        ftc += 1;
                    }
                }
                i++;
            }
            if (ftc > 50 && Math.random() < 0.95) {
                ftc = 50 + random(ftc - 49);
                if (Math.random() < 0.75) {
                    ftc = 50;
                }
            }
            if (Math.random() < 0.3) {
                ftc = 31 + random(ftc - 30);
            }
            if (ftc > 50) {
                ftc += 20;
            }
            cybFishCurrent = ftc;
        }
        let cybFishCurrentExp = Math.floor(_root.fishArray[cybFishCurrent].fishExp * (1 + _root.curCareerLevel[12] * 0.01));
        let cybFishCate = _root.fishArray[cybFishCurrent].fishCate;
        let cybFishSpec = _root.fishArray[cybFishCurrent].fishSpec;
        let cybFishLev = _root.fishArray[cybFishCurrent].fishLevel;
        let cybFishAExp = Math.floor(_root.fishArray[cybFishCurrent].fishAExp * (1 + _root.curCareerLevel[12] * 0.005));
        let tempName;
        if (_root.save.eliteFisherTime > 0) {
            cybFishAExp = Math.floor(cybFishAExp * 1.5);
        }
        if (cybFishCate == "Fish" || cybFishCate == "Junk") {
            tempName = "Lv. " + cybFishLev + " " + cybFishCate;
        }
        else if (cybFishLev == "") {
            tempName = cybFishCate;
        }
        else {
            tempName = cybFishLev + " " + cybFishCate;
        }
        let streakBonus;
        if (Math.random() < calcPerf(op) / 100 && (_root.save.fishStreak < 250 || Math.random() < 0.7) || cybFishSpec == "Manual+") {
            _root.save.fishStreak += 1;
            if (_root.save.fishBestStreak < _root.save.fishStreak) {
                _root.save.fishBestStreak = _root.save.fishStreak;
            }
            streakBonus = _root.save.fishStreak;
            if (_root.save.fishStreak > 10) {
                streakBonus = 9 + Math.ceil(_root.save.fishStreak / 10);
            }
            if (_root.save.fishStreak > 100) {
                streakBonus = 20;
            }
            if (_root.save.fishStreak > 1000) {
                streakBonus = 0;
            }
            _root.save.fishScore += cybFishCurrentExp * (200 + streakBonus * 50);
            _root.save.fishScoreToday += cybFishCurrentExp * (200 + streakBonus * 50);
            _root.save.fishExp += cybFishCurrentExp + streakBonus;
            gainCareerEXP(12, 100 + cybFishCurrentExp * 3 + streakBonus * 5 + _root.save.fishLevel, true);
            if (_root.save.permaBanPenalty[35] == 3) {
                gainGreenCoin(30000 + streakBonus * 6000);
            }
            else if (_root.save.permaBanPenalty[35] == 2) {
                gainGreenCoin(20000 + streakBonus * 4000);
            }
            else if (_root.save.permaBanPenalty[35] == 1) {
                gainGreenCoin(15000 + streakBonus * 3000);
            }
            else {
                gainGreenCoin(5000 + streakBonus * 1000);
            }
            gainBlueCoin(10 + streakBonus * 2);
            dispNews(175, "[Cyborg] Fishing Mastery increased! (+" + withComma(cybFishCurrentExp + streakBonus) + ")");
            let expToGain = Math.floor(cybFishAExp * Math.pow(_root.save.level, 0.6) * _root.save.boost / 100 * (1 + streakBonus / 20));
            if (_root.save.permaBanPenalty[6] == 3) {
                expToGain = Math.floor(expToGain * 3);
            }
            else if (_root.save.permaBanPenalty[6] == 2) {
                expToGain = Math.floor(expToGain * 2.2);
            }
            else if (_root.save.permaBanPenalty[6] == 1) {
                expToGain = Math.floor(expToGain * 1.8);
            }
            if (cybFishCurrent == 52) {
                _root.save.awesomeRefill += 1;
            }
            if (cybFishCurrent == 53) {
                _root.save.gardenFertilizer += 1;
            }
            if (cybFishCurrent == 54) {
                _root.save.gardenMegaFertilizer += 1;
            }
            if (cybFishCurrent == 55) {
                _root.save.mysteryBox[1] += 1;
            }
            if (cybFishCurrent == 56) {
                _root.save.mysteryBox[7] += 1;
            }
            if (cybFishCurrent == 57) {
                _root.save.mysteryBox[8] += 1;
            }
            if (cybFishCurrent == 58) {
                _root.save.mysteryBox[4] += 1;
            }
            if (cybFishCurrent == 59) {
                gainWhiteCoin(1);
            }
            if (cybFishCurrent == 60) {
                _root.save.boostPotion += 1;
            }
            if (cybFishCurrent == 61) {
                _root.save.megaBoostPotion += 1;
            }
            gainEXP(expToGain, 22);
            dispNews(175, "[Cyborg] PERFECT CATCH (" + _root.save.fishStreak + "x)! " + tempName + " GET! (+" + withComma(expToGain) + " EXP)");
            if (_root.save.questType == "Result") {
                if (_root.save.questSubtype == "Perfect" || _root.save.questSubtype == "Success") {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Perfect Streak") {
                    if (_root.save.questCount < _root.save.fishStreak) {
                        _root.save.questCount = _root.save.fishStreak;
                    }
                }
            }
            if (_root.save.fishLevel > 30) {
                if (_root.save.fishLevel > 50) {
                    expToGain = Math.floor(expToGain * (_root.save.fishLevel * 0.03 - 0.3));
                }
                else {
                    expToGain = Math.floor(expToGain * (_root.save.fishLevel * 0.05 - 1.3));
                }
                gainEXP(expToGain, 22);
                dispNews(175, "[Cyborg] Bonus LEGEND EXP gained! (+" + withComma(expToGain) + " EXP)");
            }
            if (_root.save.fishStreak >= 3) {
                gainCyborgEXP(3);
            }
            else {
                gainCyborgEXP(2);
            }
            _root.save.fishPerfect += 1;
            _root.save.fishTotal += 1;
            _root.save.fishFound[cybFishCurrent] += 1;
            _root.save.fishLeft[cybFishCurrent] += 1;
            gainBoost(1, 3);
        }
        else {
            _root.save.fishStreak = 0;
            _root.save.fishScore += cybFishCurrentExp * 100;
            _root.save.fishScoreToday += cybFishCurrentExp * 100;
            _root.save.fishExp += cybFishCurrentExp;
            gainCareerEXP(12, 50 + cybFishCurrentExp * 3 + _root.save.fishLevel, true);
            if (_root.save.permaBanPenalty[35] == 3) {
                gainGreenCoin(15000);
            }
            else if (_root.save.permaBanPenalty[35] == 2) {
                gainGreenCoin(10000);
            }
            else if (_root.save.permaBanPenalty[35] == 1) {
                gainGreenCoin(7500);
            }
            else {
                gainGreenCoin(2500);
            }
            gainGreenCoin(5);
            dispNews(175, "[Cyborg] Fishing Mastery increased! (+" + withComma(cybFishCurrentExp) + ")");
            if (cybFishCurrent == 52) {
                _root.save.awesomeRefill += 1;
            }
            if (cybFishCurrent == 53) {
                _root.save.gardenFertilizer += 1;
            }
            if (cybFishCurrent == 54) {
                _root.save.gardenMegaFertilizer += 1;
            }
            if (cybFishCurrent == 55) {
                _root.save.mysteryBox[1] += 1;
            }
            if (cybFishCurrent == 56) {
                _root.save.mysteryBox[7] += 1;
            }
            if (cybFishCurrent == 57) {
                _root.save.mysteryBox[8] += 1;
            }
            if (cybFishCurrent == 58) {
                _root.save.mysteryBox[4] += 1;
            }
            if (cybFishCurrent == 59) {
                gainWhiteCoin(1);
            }
            if (cybFishCurrent == 60) {
                _root.save.boostPotion += 1;
            }
            if (cybFishCurrent == 61) {
                _root.save.megaBoostPotion += 1;
            }
            expToGain = Math.floor(cybFishAExp * Math.pow(_root.save.level, 0.6) * _root.save.boost / 100 * 0.8);
            if (_root.save.permaBanPenalty[6] == 3) {
                expToGain = Math.floor(expToGain * 2);
            }
            else if (_root.save.permaBanPenalty[6] == 2) {
                expToGain = Math.floor(expToGain * 1.6);
            }
            else if (_root.save.permaBanPenalty[6] == 1) {
                expToGain = Math.floor(expToGain * 1.4);
            }
            gainEXP(expToGain, 22);
            dispNews(175, "[Cyborg] " + tempName + " GET! (+" + withComma(expToGain) + " EXP)");
            if (_root.save.fishLevel > 30) {
                if (_root.save.fishLevel > 50) {
                    expToGain = Math.floor(expToGain * (_root.save.fishLevel * 0.03 - 0.3));
                }
                else {
                    expToGain = Math.floor(expToGain * (_root.save.fishLevel * 0.05 - 1.3));
                }
                gainEXP(expToGain, 22);
                dispNews(175, "[Cyborg] Bonus LEGEND EXP gained! (+" + withComma(expToGain) + " EXP)");
            }
            if (_root.save.questType == "Result") {
                if (_root.save.questSubtype == "Success") {
                    _root.save.questCount += 1;
                }
            }
            gainCyborgEXP(1);
            _root.save.fishTotal += 1;
            _root.save.fishFound[cybFishCurrent] += 1;
            _root.save.fishLeft[cybFishCurrent] += 1;
        }
        if (_root.save.questType == "Junk" && cybFishCurrent >= 11 && cybFishCurrent <= 30) {
            if (_root.save.questSubtype == "Any") {
                _root.save.questCount += 1;
            }
            if (_root.save.questSubtype == "Lv. 5+" && cybFishCurrent >= 15) {
                _root.save.questCount += 1;
            }
            if (_root.save.questSubtype == "Lv. 10+" && cybFishCurrent >= 20) {
                _root.save.questCount += 1;
            }
            if (_root.save.questSubtype == "Lv. 20+" && cybFishCurrent >= 25) {
                _root.save.questCount += 1;
            }
            if (_root.save.questSubtype == "Lv. 30" && cybFishCurrent >= 30) {
                _root.save.questCount += 1;
            }
        }
        if (_root.save.questType == "Fish" && (cybFishCurrent >= 31 && cybFishCurrent <= 50 || cybFishCurrent >= 71)) {
            if (_root.save.questSubtype == "Any") {
                _root.save.questCount += 1;
            }
            if (_root.save.questSubtype == "Lv. 5+" && cybFishCurrent >= 35) {
                _root.save.questCount += 1;
            }
            if (_root.save.questSubtype == "Lv. 10+" && cybFishCurrent >= 40) {
                _root.save.questCount += 1;
            }
            if (_root.save.questSubtype == "Lv. 20+" && cybFishCurrent >= 45) {
                _root.save.questCount += 1;
            }
            if (_root.save.questSubtype == "Lv. 30" && cybFishCurrent >= 50) {
                _root.save.questCount += 1;
            }
        }
        if (_root.save.questType == "Special Item") {
            if (cybFishCurrent <= 10 || cybFishCurrent >= 52) {
                if (_root.save.questSubtype == "Any") {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Treasure Box" && cybFishCurrent >= 1 && cybFishCurrent <= 3) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Key" && cybFishCurrent >= 4 && cybFishCurrent <= 6) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Energy Drink" && cybFishCurrent >= 7 && cybFishCurrent <= 8) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Pet Food" && cybFishCurrent >= 9 && cybFishCurrent <= 10) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Energy Refill" && cybFishCurrent == 52) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Fertilizer" && cybFishCurrent == 53) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Mega Fertilizer" && cybFishCurrent == 54) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Mystery Box" && cybFishCurrent >= 55 && cybFishCurrent <= 58) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Explosion Crate" && cybFishCurrent == 55) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Awesome Crate" && cybFishCurrent == 56) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Chaos Crate" && cybFishCurrent == 57) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Legendary Box" && cybFishCurrent == 58) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "White Coin" && cybFishCurrent == 59) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Regular Boost Potion" && cybFishCurrent == 60) {
                    _root.save.questCount += 1;
                }
                if (_root.save.questSubtype == "Mega Boost Potion" && cybFishCurrent == 61) {
                    _root.save.questCount += 1;
                }
            }
        }
    }
    _root.save.botOp[op] += 1;
}

