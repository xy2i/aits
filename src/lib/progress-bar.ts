import { _root } from "@/flash/root";
import { gainBoost } from "./boost";
import { gainCareerEXP } from "./career";
import { gainBlueCoin, gainCoin, gainGreenCoinND, gainWhiteCoin } from "./coin";
import { gainEventToken } from "./event";
import { gainEXP } from "./exp";
import { withComma } from "./format";
import { dispNews } from "./news";

export function claimReward() {
    if (_root.save.seppukuPenalty > _root.save.seppukuAscension) {
        _root.save.seppukuPenalty -= 1;
    }
    let rewardToClaim = Math.ceil(_root.progPercent / 200);
    if (rewardToClaim > 500) {
        rewardToClaim = 500;
    }
    _root.progPercent -= 100 * rewardToClaim;
    _root.save.progFrag += 1 * rewardToClaim;
    _root.save.rewardClaim += 1 * rewardToClaim;
    let i = 1;
    while (i <= _root.todayEvent) {
        let yy = _root.clock_year % 10;
        let mm = _root.clock_month;
        let dd = _root.clock_date;
        if (_root.eventList[yy][mm][dd][i] == "Receive Event Tokens by claiming rewards") {
            gainEventToken(1);
        }
        i++;
    }
    let expToGet = Math.floor(1.4 * _root.save.boost * Math.pow(_root.save.level, 0.6) * (1 + _root.achRedCoin / 10000 + _root.save.petBestLevel / 100 + (_root.save.mainQuestC * 1 + _root.save.mainQuestB * 3 + _root.save.mainQuestA * 6 + _root.save.mainQuestS * 10) / 2500) * rewardToClaim);
    let coinToGet = Math.floor(0.35 * _root.save.boost * Math.pow(_root.save.level, 0.6) * (0.8 + Math.random() * 0.4) * (1 + _root.achRedCoin / 10000 + _root.save.petBestLevel / 100 + (_root.save.mainQuestC * 1 + _root.save.mainQuestB * 3 + _root.save.mainQuestA * 6 + _root.save.mainQuestS * 10) / 2500) * rewardToClaim);
    if (_root.save.bestLevel < 35) {
        expToGet = Math.floor(expToGet * 0.5);
        if (expToGet > _root.requiredExp * 2) {
            expToGet = _root.requiredExp * 2;
        }
    }
    let greenCoinToGet = 100 * rewardToClaim;
    let blueCoinToGet = 0;
    if (_root.save.rewardClaim <= 5) {
        expToGet = 4;
        coinToGet = 1000;
        greenCoinToGet = 200;
        blueCoinToGet = 20;
    }
    if (_root.save.idleMode == false) {
        _root.save.rewardClaimManual += 1 * rewardToClaim;
        if (Math.random() < 0.1 && _root.save.rewardBotTime > 0) {
            gainCareerEXP(1, rewardToClaim, true);
        }
        greenCoinToGet += 100 * rewardToClaim;
        let bcChance = 0.1;
        if (_root.save.permaBanPenalty[2] == 3) {
            bcChance = 0.6;
        }
        else if (_root.save.permaBanPenalty[2] == 2) {
            bcChance = 0.4;
        }
        if (_root.save.permaBanPenalty[2] == 1) {
            bcChance = 0.3;
        }
        if (Math.random() < bcChance) {
            blueCoinToGet += rewardToClaim;
        }
        if (_root.save.questType == "Claim Reward") {
            _root.save.questCount += 1 * rewardToClaim;
        }
    }
    else {
        _root.save.rewardClaimAuto += 1 * rewardToClaim;
        if (Math.random() < 0.1) {
            gainCareerEXP(1, rewardToClaim, true);
        }
        if (_root.save.questType == "Claim Reward") {
            if (_root.save.questSubtype != "No Idle Mode") {
                _root.save.questCount += 1 * rewardToClaim;
            }
        }
    }
    let doubleMod = 1;
    if (_root.save.featureEpicLicense == true) {
        if (Math.random() < _root.save.epicSkill[1] * 0.01) {
            _root.progPercent += 100 * rewardToClaim;
            dispNews(8, "Epic Skill [Double Progress] activated!");
        }
        if (Math.random() < _root.save.epicSkill[2] * 0.01) {
            gainBoost(2 * rewardToClaim, 3);
            dispNews(9, "Epic Skill [Boost Charger] activated!");
        }
        if (Math.random() < _root.save.epicSkill[3] * 0.01) {
            coinToGet += 1000000 * rewardToClaim;
            greenCoinToGet += 500 * rewardToClaim;
            dispNews(10, "Epic Skill [Coin Collector] activated!");
        }
        if (Math.random() < _root.save.epicSkill[4] * 0.01) {
            _root.save.printerCharge += 1 * rewardToClaim;
            _root.save.totalPrinterCharge += 1 * rewardToClaim;
            dispNews(11, "Epic Skill [Battery Booster] activated!");
        }
        if (Math.random() < _root.save.epicSkill[5] * 0.01) {
            _root.save.fishFatigue -= 1 * rewardToClaim;
            dispNews(12, "Epic Skill [Fanatical Fisher] activated!");
        }
        if (Math.random() < _root.save.epicSkill[6] * 0.01) {
            doubleMod = 2;
            dispNews(13, "Epic Skill [Module Master] activated!");
        }
        if (Math.random() < _root.save.epicSkill[7] * 0.01) {
            _root.save.botEnergy += 1 * rewardToClaim;
            if (_root.save.botEnergy > 359999) {
                _root.save.botEnergy = 359999;
            }
            dispNews(184, "Epic Skill [Cyborg Charger] activated!");
        }
    }
    i = 1;
    while (i <= 9) {
        let mcModif = 1;
        let j = 1;
        while (j <= 9) {
            if (i != j && _root.save.progModuleType[i] == _root.save.progModuleType[j]) {
                mcModif = 0.9;
            }
            j++;
        }
        if (Math.random() < _root.save.progModuleChance[i] / 10000 * doubleMod * mcModif) {
            let tempMod = _root.save.progModuleType[i];
            if (tempMod == 1) {
                expToGet += Math.floor(_root.save.progModuleEffect[i] * 0.014 * _root.save.boost * Math.pow(_root.save.level, 0.6) * (1 + _root.achRedCoin / 10000 + _root.save.petBestLevel / 100 + (_root.save.mainQuestC * 1 + _root.save.mainQuestB * 3 + _root.save.mainQuestA * 6 + _root.save.mainQuestS * 10) / 2500) * rewardToClaim);
            }
            else if (tempMod == 2) {
                coinToGet += Math.floor(_root.save.progModuleEffect[i] * 0.0035 * _root.save.boost * Math.pow(_root.save.level, 0.6) * (0.8 + Math.random() * 0.4) * (1 + _root.achRedCoin / 10000 + _root.save.petBestLevel / 100 + (_root.save.mainQuestC * 1 + _root.save.mainQuestB * 3 + _root.save.mainQuestA * 6 + _root.save.mainQuestS * 10) / 2500) * rewardToClaim);
            }
            else if (tempMod == 3) {
                greenCoinToGet += _root.save.progModuleEffect[i] * rewardToClaim;
            }
            else if (tempMod == 4) {
                blueCoinToGet += _root.save.progModuleEffect[i] * rewardToClaim;
            }
            else if (tempMod == 5) {
                gainWhiteCoin(_root.save.progModuleEffect[i] * rewardToClaim);
            }
            else if (tempMod == 6) {
                gainBoost(_root.save.progModuleEffect[i] * rewardToClaim, 3);
            }
            else if (tempMod == 7) {
                if (_root.save.boostFreeze <= 0 || Math.random() < 0.1 || rewardToClaim >= 10) {
                    _root.save.boostFreeze += _root.save.progModuleEffect[i] * Math.ceil(rewardToClaim * 0.1);
                }
            }
            else if (tempMod == 8) {
                _root.save.doubleExpTime += _root.save.progModuleEffect[i] * rewardToClaim;
            }
            else if (tempMod == 9) {
                _root.save.doubleCoinTime += _root.save.progModuleEffect[i] * rewardToClaim;
            }
            else if (tempMod == 10) {
                let tr = 1;
                while (tr <= 50) {
                    if (_root.save.gardenTrees[tr] > 0 && _root.save.gardenTreeModuleProc[tr] < 10000000 && _root.save.gardenTrees[tr] != 1) {
                        _root.save.gardenHarvestValue[tr] += _root.save.progModuleEffect[i] * rewardToClaim;
                        _root.save.gardenTreeModuleProc[tr] += _root.save.progModuleEffect[i] * rewardToClaim;
                        if (_root.save.gardenTreeModuleProc[tr] > 10000000) {
                            _root.save.gardenHarvestValue[tr] -= _root.save.gardenTreeModuleProc[tr] - 10000000;
                            _root.save.gardenTreeModuleProc[tr] = 10000000;
                        }
                    }
                    tr++;
                }
            }
            else if (tempMod == 11) {
                _root.save.petMana += _root.save.progModuleEffect[i] * rewardToClaim;
            }
            else if (tempMod == 12) {
                _root.save.gardenPoint += _root.save.progModuleEffect[i] * rewardToClaim;
            }
            else if (tempMod == 13) {
                _root.save.gardenFruit += _root.save.progModuleEffect[i] * rewardToClaim;
            }
            else if (tempMod != 14) {
                if (tempMod != 15) {
                    if (tempMod != 16) {
                        if (tempMod == 17) {
                            _root.save.arenaPixel += _root.save.progModuleEffect[i] * rewardToClaim * _root.save.arenaLevel;
                        }
                        else if (tempMod == 18) {
                            _root.save.arenaCraft += _root.save.progModuleEffect[i] * rewardToClaim * _root.save.arenaLevel;
                        }
                        else if (tempMod == 19) {
                            _root.save.arenaSuperiorCraft += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 20) {
                            _root.save.arenaUnobtainium += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 21) {
                            _root.save.arenaEnhancerFragment += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 22) {
                            _root.save.arenaBacon += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 23) {
                            _root.save.arenaCrystal1 += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 24) {
                            _root.save.arenaCrystal2 += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 25) {
                            _root.save.buttonPurple += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 26) {
                            let modCareer = random(12) + 1;
                            if (_root.save.careerLevel[modCareer] >= 100) {
                                gainCareerEXP(modCareer, _root.save.progModuleEffect[i] * rewardToClaim * 2, false);
                            }
                            else {
                                gainCareerEXP(modCareer, _root.save.progModuleEffect[i] * rewardToClaim, false);
                            }
                        }
                        else if (tempMod == 27) {
                            _root.save.arcade100kMedal += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 28) {
                            _root.save.stadiumToken += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 29) {
                            _root.save.fcgCash += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod >= 30 && tempMod <= 39) {
                            _root.save.lolGems[tempMod - 29] += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 40) {
                            if (_root.save.awesomeEnergy < _root.save.awesomeMaxEnergy * 5 + 15) {
                                _root.save.awesomeEnergyNext -= _root.save.progModuleEffect[i] * rewardToClaim;
                            }
                        }
                        else if (tempMod == 41) {
                            _root.save.specialPetFood += _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 42) {
                            _root.save.fishFatigue -= _root.save.progModuleEffect[i] * rewardToClaim;
                        }
                        else if (tempMod == 43) {
                            _root.save.totalMute += rewardToClaim;
                        }
                    }
                }
            }
        }
        doubleMod = 1;
        i++;
    }
    if (_root.save.gardenBreed1 != 0) {
        _root.save.gardenResearch += 1 * rewardToClaim;
    }
    if (_root.save.idleMode == false) {
        if (_root.save.permaBanPenalty[17] == 3) {
            expToGet = Math.floor(expToGet * 1.25);
        }
        else if (_root.save.permaBanPenalty[17] == 2) {
            expToGet = Math.floor(expToGet * 1.15);
        }
        else if (_root.save.permaBanPenalty[17] == 1) {
            expToGet = Math.floor(expToGet * 1.1);
        }
        if (_root.save.permaBanPenalty[26] == 3) {
            coinToGet = Math.floor(coinToGet * 1.25);
        }
        else if (_root.save.permaBanPenalty[26] == 2) {
            coinToGet = Math.floor(coinToGet * 1.15);
        }
        else if (_root.save.permaBanPenalty[26] == 1) {
            coinToGet = Math.floor(coinToGet * 1.1);
        }
    }
    else if (_root.save.idleMode == true) {
        if (_root.save.permaBanPenalty[25] == 3) {
            expToGet = Math.floor(expToGet * 1.15);
        }
        else if (_root.save.permaBanPenalty[25] == 2) {
            expToGet = Math.floor(expToGet * 1.09);
        }
        else if (_root.save.permaBanPenalty[25] == 1) {
            expToGet = Math.floor(expToGet * 1.06);
        }
        if (_root.save.permaBanPenalty[36] == 3) {
            coinToGet = Math.floor(coinToGet * 1.15);
        }
        else if (_root.save.permaBanPenalty[36] == 2) {
            coinToGet = Math.floor(coinToGet * 1.09);
        }
        else if (_root.save.permaBanPenalty[36] == 1) {
            coinToGet = Math.floor(coinToGet * 1.06);
        }
    }
    if (_root.saveid == 26) {
        expToGet = Math.floor(expToGet * 20);
        coinToGet = Math.floor(coinToGet * 2);
    }
    if (_root.save.permaBanPenalty[2] == 3) {
        greenCoinToGet += 500 * rewardToClaim;
    }
    else if (_root.save.permaBanPenalty[2] == 2) {
        greenCoinToGet += 300 * rewardToClaim;
    }
    else if (_root.save.permaBanPenalty[2] == 1) {
        greenCoinToGet += 200 * rewardToClaim;
    }
    gainEXP(expToGet, 0);
    gainCoin(coinToGet, 0);
    gainGreenCoinND(greenCoinToGet);
    gainBlueCoin(blueCoinToGet);
    if (rewardToClaim > 1) {
        dispNews(5, withComma(rewardToClaim) + " rewards claimed! (+" + withComma(expToGet) + " EXP | +" + withComma(coinToGet) + " Coins)");
    }
    else {
        dispNews(4, "Reward claimed! (+" + withComma(expToGet) + " EXP | +" + withComma(coinToGet) + " Coins)");
    }
    if (_root.save.level > 10) {
        if (Math.random() < (0.01 - _root.save.boost / 100000) * rewardToClaim) {
            gainBoost(5, 3);
            dispNews(6, "Yay, free boost! (+5% Boost)");
        }
    }
}