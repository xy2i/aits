import { random } from "@/flash/random";
import { _root } from "@/flash/root";
import { checkAchievements } from "@/lib/achievements";
import { gainBoost } from "@/lib/boost";
import { gainCareerEXP } from "@/lib/career";
import { gainBlueCoin, gainCoin, gainGreenCoin } from "@/lib/coin";
import { checkCyborg } from "@/lib/cyborg";
import { gainEventToken } from "@/lib/event";
import { gainEXP } from "@/lib/exp";
import { currentFeature, Feature } from "@/lib/feature";
import { convertMin, withComma } from "@/lib/format";
import { harvestAllTree } from "@/lib/garden";
import { dispNews } from "@/lib/news";
import { checkPet, killPet } from "@/lib/pet";
import { printMoney } from "@/lib/printer";

export function loadMain(main) {
    console.log("im loadmain() function")
    function dispAsc() {
        elapsed_days = Math.floor(_root.save.ascendPlayTime / 86400);
        remaining = _root.save.ascendPlayTime - elapsed_days * 86400;
        if (_root.saveid >= 20 && !isNaN(_root.save.challengeTime)) {
            elapsed_days = Math.floor(_root.save.challengeTime / 86400);
            remaining = _root.save.challengeTime - elapsed_days * 86400;
        }
        elapsed_hours = Math.floor(remaining / 3600);
        remaining -= elapsed_hours * 3600;
        elapsed_minutes = Math.floor(remaining / 60);
        remaining -= elapsed_minutes * 60;
        elapsed_seconds = Math.floor(remaining / 1);
        remaining -= elapsed_seconds * 1;
        if (elapsed_hours < 10) {
            elapsed_hours = "0" + elapsed_hours;
        }
        if (elapsed_minutes < 10) {
            elapsed_minutes = "0" + elapsed_minutes;
        }
        if (elapsed_seconds < 10) {
            elapsed_seconds = "0" + elapsed_seconds;
        }
        _root.topBar.ascentDisp.ascentText.text = elapsed_days + "d + " + elapsed_hours + ":" + elapsed_minutes + ":" + elapsed_seconds;
    }
    function checkCareer() {
        _root.curCareerLevel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        _root.totalCareerLevel = 0;
        _root.careerActivated = 0;
        i = 1;
        while (i <= 16) {
            _root.totalCareerLevel += _root.save.careerLevel[i];
            if (_root.save.careerActive[i] > 0) {
                _root.careerActivated += 1;
                _root.curCareerLevel[i] = _root.save.careerLevel[i];
            }
            if (_root.save.careerBoost[i] > 0) {
                _root.curCareerLevel[i] = _root.save.careerLevel[i];
            }
            _root["careerLevel" + i] = _root.save.careerLevel[i];
            i++;
        }
    }
    function checkBestiary() {
        _root.totalRing = 0;
        i = 1;
        while (i <= 22) {
            if (_root.save.arenaRingOwned[i] == 1) {
                _root.totalRing += 1;
            }
            i++;
        }
        _root.bestiaryLevel = 0;
        _root.totalAllyTamed = 0;
        _root.totalAllyMastered = 0;
        _root.totalAllyMaxed = 0;
        _root.totalUltra = 0;
        _root.uniqueKill = 0;
        _root.uniqueUlt1 = 0;
        _root.uniqueUlt2 = 0;
        _root.uniqueUlt3 = 0;
        i = 1;
        while (i <= 500) {
            if (!isNaN(_root.save.arenaBestiary[i])) {
                _root.uniqueKill += 1;
            }
            if (!isNaN(_root.save.arenaBestiaryUlt1[i])) {
                _root.uniqueUlt1 += 1;
            }
            if (!isNaN(_root.save.arenaBestiaryUlt2[i])) {
                _root.uniqueUlt2 += 1;
            }
            if (!isNaN(_root.save.arenaBestiaryUlt3[i])) {
                _root.uniqueUlt3 += 1;
            }
            if (!isNaN(_root.save.arenaAllyEXP[i])) {
                _root.totalAllyTamed += 1;
                if (_root.save.arenaAllyEXP[i] >= 10000) {
                    _root.totalAllyMastered += 1;
                }
                if (_root.save.arenaAllyUpgrade[i] >= 10) {
                    _root.totalAllyMaxed += 1;
                }
                if (_root.save.arenaAllyUpgrade[i] == 15) {
                    _root.totalUltra += 1;
                }
            }
            if (!isNaN(_root.save.arenaBestiary[i])) {
                if (_root.save.arenaBestiary[i] >= 100000) {
                    _root.bestiaryLevel += 6;
                }
                else if (_root.save.arenaBestiary[i] >= 10000) {
                    _root.bestiaryLevel += 5;
                }
                else if (_root.save.arenaBestiary[i] >= 1000) {
                    _root.bestiaryLevel += 4;
                }
                else if (_root.save.arenaBestiary[i] >= 100) {
                    _root.bestiaryLevel += 3;
                }
                else if (_root.save.arenaBestiary[i] >= 10) {
                    _root.bestiaryLevel += 2;
                }
                else if (_root.save.arenaBestiary[i] >= 1) {
                    _root.bestiaryLevel += 1;
                }
            }
            i++;
        }
        if (_root.saveid == 26 && _root.totalAllyTamed >= 200) {
            _root.clearChallenge();
        }
    }
    function incDt() {
        _root.summonCount += 1;
        _root.antiLag += 1;
    }
    function incDt2() {
        _root.summonCount += 1;
        _root.antiLag2 += 1;
    }
    function trackZoneKill() {
        _root.treasureHunterKill = _root.save.arenaBestiary[240];
        _root.crystalKill = _root.save.arenaBestiary[322];
        if (isNaN(_root.crystalKill)) {
            _root.crystalKill = 0;
        }
        if (!isNaN(_root.save.arenaBestiary[435])) {
            _root.crystalKill += _root.save.arenaBestiary[435];
        }
        if (!isNaN(_root.save.arenaBestiaryExtra[322])) {
            _root.crystalKill -= _root.save.arenaBestiaryExtra[322];
        }
        if (!isNaN(_root.save.arenaBestiaryExtra[435])) {
            _root.crystalKill -= _root.save.arenaBestiaryExtra[435];
        }
        if (!isNaN(_root.save.arenaBestiaryExtra[240])) {
            _root.treasureHunterKill -= _root.save.arenaBestiaryExtra[240];
        }
        if (isNaN(_root.treasureHunterKill)) {
            _root.treasureHunterKill = 0;
        }
        i = 1;
        while (i <= 91) {
            _root["zoneKill" + i] = _root.save.arenaZoneKill[i];
            i++;
        }
    }
    function trackRuneLevel() {
        i = 1;
        while (i <= 6) {
            _root["runeLevel" + i] = _root.save.arenaRuneLevel[i];
            i++;
        }
    }
    function fixStuff() {
        if (isNaN(_root.save.currentExp) || isNaN(_root.save.totalExp)) {
            _root.save.currentExp = 0;
            _root.save.totalExp = 0;
            _root.save.level = 1;
        }
        if (isNaN(_root.save.arenaExp)) {
            _root.save.arenaExp = 0;
        }
        if (isNaN(_root.save.coin)) {
            _root.save.coin = 0;
        }
        if (isNaN(_root.save.greenCoin)) {
            _root.save.greenCoin = 0;
        }
        if (isNaN(_root.save.blueCoin)) {
            _root.save.blueCoin = 0;
        }
    }
    function calcReqExp() {
        _root.requiredExp = _root.save.level * _root.save.level * 10 + 10;
        if (_root.save.gDifficulty == 3) {
            _root.requiredExp = Math.floor(_root.requiredExp * 4);
            if (_root.save.level == 8999) {
                _root.requiredExp = 10000000000000 - _root.save.totalExp;
                if (_root.save.gOldAscension == false) {
                    if (_root.save.banned >= 1000) {
                        _root.requiredExp += 25000000000000;
                    }
                    else if (_root.save.banned >= 800) {
                        _root.requiredExp += 10000000000 * (_root.save.banned - 800) + 23000000000000;
                    }
                    else if (_root.save.banned >= 600) {
                        _root.requiredExp += 20000000000 * (_root.save.banned - 600) + 19000000000000;
                    }
                    else if (_root.save.banned >= 400) {
                        _root.requiredExp += 30000000000 * (_root.save.banned - 400) + 13000000000000;
                    }
                    else if (_root.save.banned >= 200) {
                        _root.requiredExp += 40000000000 * (_root.save.banned - 200) + 5000000000000;
                    }
                    else if (_root.save.banned >= 100) {
                        _root.requiredExp += 50000000000 * (_root.save.banned - 100);
                    }
                }
            }
            if (_root.save.level == 9000) {
                _root.requiredExp = 12000000000000 - _root.save.totalExp;
                if (_root.save.gOldAscension == false) {
                    if (_root.save.banned >= 1000) {
                        _root.requiredExp += 25000000000000;
                    }
                    else if (_root.save.banned >= 800) {
                        _root.requiredExp += 10000000000 * (_root.save.banned - 800) + 23000000000000;
                    }
                    else if (_root.save.banned >= 600) {
                        _root.requiredExp += 20000000000 * (_root.save.banned - 600) + 19000000000000;
                    }
                    else if (_root.save.banned >= 400) {
                        _root.requiredExp += 30000000000 * (_root.save.banned - 400) + 13000000000000;
                    }
                    else if (_root.save.banned >= 200) {
                        _root.requiredExp += 40000000000 * (_root.save.banned - 200) + 5000000000000;
                    }
                    else if (_root.save.banned >= 100) {
                        _root.requiredExp += 50000000000 * (_root.save.banned - 100);
                    }
                }
            }
        }
        else if (_root.save.gDifficulty == 2) {
            _root.requiredExp = Math.floor(_root.requiredExp * 2);
            if (_root.save.level == 8999) {
                _root.requiredExp = 5000000000000 - _root.save.totalExp;
                if (_root.save.gOldAscension == false) {
                    if (_root.save.banned >= 1000) {
                        _root.requiredExp += 25000000000000;
                    }
                    else if (_root.save.banned >= 800) {
                        _root.requiredExp += 10000000000 * (_root.save.banned - 800) + 23000000000000;
                    }
                    else if (_root.save.banned >= 600) {
                        _root.requiredExp += 20000000000 * (_root.save.banned - 600) + 19000000000000;
                    }
                    else if (_root.save.banned >= 400) {
                        _root.requiredExp += 30000000000 * (_root.save.banned - 400) + 13000000000000;
                    }
                    else if (_root.save.banned >= 200) {
                        _root.requiredExp += 40000000000 * (_root.save.banned - 200) + 5000000000000;
                    }
                    else if (_root.save.banned >= 100) {
                        _root.requiredExp += 50000000000 * (_root.save.banned - 100);
                    }
                }
            }
            if (_root.save.level == 9000) {
                _root.requiredExp = 6000000000000 - _root.save.totalExp;
                if (_root.save.gOldAscension == false) {
                    if (_root.save.banned >= 1000) {
                        _root.requiredExp += 25000000000000;
                    }
                    else if (_root.save.banned >= 800) {
                        _root.requiredExp += 10000000000 * (_root.save.banned - 800) + 23000000000000;
                    }
                    else if (_root.save.banned >= 600) {
                        _root.requiredExp += 20000000000 * (_root.save.banned - 600) + 19000000000000;
                    }
                    else if (_root.save.banned >= 400) {
                        _root.requiredExp += 30000000000 * (_root.save.banned - 400) + 13000000000000;
                    }
                    else if (_root.save.banned >= 200) {
                        _root.requiredExp += 40000000000 * (_root.save.banned - 200) + 5000000000000;
                    }
                    else if (_root.save.banned >= 100) {
                        _root.requiredExp += 50000000000 * (_root.save.banned - 100);
                    }
                }
            }
        }
        else if (_root.save.level == 8999) {
            _root.requiredExp = 2500000000000 - _root.save.totalExp;
            if (_root.save.gOldAscension == false) {
                if (_root.save.banned >= 1000) {
                    _root.requiredExp += 25000000000000;
                }
                else if (_root.save.banned >= 800) {
                    _root.requiredExp += 10000000000 * (_root.save.banned - 800) + 23000000000000;
                }
                else if (_root.save.banned >= 600) {
                    _root.requiredExp += 20000000000 * (_root.save.banned - 600) + 19000000000000;
                }
                else if (_root.save.banned >= 400) {
                    _root.requiredExp += 30000000000 * (_root.save.banned - 400) + 13000000000000;
                }
                else if (_root.save.banned >= 200) {
                    _root.requiredExp += 40000000000 * (_root.save.banned - 200) + 5000000000000;
                }
                else if (_root.save.banned >= 100) {
                    _root.requiredExp += 50000000000 * (_root.save.banned - 100);
                }
            }
        }
        else if (_root.save.level == 9000) {
            _root.requiredExp = 3000000000000 - _root.save.totalExp;
            if (_root.save.gOldAscension == false) {
                if (_root.save.banned >= 1000) {
                    _root.requiredExp += 25000000000000;
                }
                else if (_root.save.banned >= 800) {
                    _root.requiredExp += 10000000000 * (_root.save.banned - 800) + 23000000000000;
                }
                else if (_root.save.banned >= 600) {
                    _root.requiredExp += 20000000000 * (_root.save.banned - 600) + 19000000000000;
                }
                else if (_root.save.banned >= 400) {
                    _root.requiredExp += 30000000000 * (_root.save.banned - 400) + 13000000000000;
                }
                else if (_root.save.banned >= 200) {
                    _root.requiredExp += 40000000000 * (_root.save.banned - 200) + 5000000000000;
                }
                else if (_root.save.banned >= 100) {
                    _root.requiredExp += 50000000000 * (_root.save.banned - 100);
                }
            }
        }
        if (_root.save.level > 9002 || _root.save.level == 9002 && _root.save.totalExp < 999000000000000) {
            _root.save.level = 1;
            _root.save.currentExp = 0;
            _root.save.totalExp = 0;
            _root.save.bestLevel = 1;
        }
        if (_root.save.level == 9002) {
            _root.save.currentExp = 0;
            _root.save.totalExp = 999999999999999;
            _root.requiredExp = 1;
        }
        else if (_root.save.level == 9001) {
            _root.requiredExp = 999999999999999 - _root.save.totalExp;
        }
    }
    function checkLevel() {
        if (_root.save.banned >= 5) {
            if (_root.save.reforgingCoin >= 10000000000000) {
                _root.save.reforgingOrb1 += Math.floor(_root.save.reforgingCoin / 10000000000000);
                _root.save.reforgingOrbTotal1 += Math.floor(_root.save.reforgingCoin / 10000000000000);
                _root.save.reforgingCoin %= 10000000000000;
            }
            if (_root.save.reforgingGreenCoin >= 10000000000) {
                _root.save.reforgingOrb2 += Math.floor(_root.save.reforgingGreenCoin / 10000000000);
                _root.save.reforgingOrbTotal2 += Math.floor(_root.save.reforgingGreenCoin / 10000000000);
                _root.save.reforgingGreenCoin %= 10000000000;
            }
            if (_root.save.reforgingBlueCoin >= 10000000) {
                _root.save.reforgingOrb3 += Math.floor(_root.save.reforgingBlueCoin / 10000000);
                _root.save.reforgingOrbTotal3 += Math.floor(_root.save.reforgingBlueCoin / 10000000);
                _root.save.reforgingBlueCoin %= 10000000;
            }
            if (_root.save["autoAscendEnabled" + _root.save.gDifficulty] == true && _root.save.gOldAscension != true) {
                if (_root.save.level >= 9001) {
                    toAutoAscend = false;
                    if (_root.save.gDifficulty == 1) {
                        if (_root.save.reforgingOrb1 >= 1) {
                            _root.save.reforgingOrb1 -= 1;
                            toAutoAscend = true;
                        }
                    }
                    else if (_root.save.gDifficulty == 2) {
                        if (_root.save.reforgingOrb1 >= 2 && _root.save.reforgingOrb2 >= 1) {
                            _root.save.reforgingOrb1 -= 2;
                            _root.save.reforgingOrb2 -= 1;
                            toAutoAscend = true;
                        }
                    }
                    else if (_root.save.gDifficulty == 3) {
                        if (_root.save.reforgingOrb1 >= 4 && _root.save.reforgingOrb2 >= 2 && _root.save.reforgingOrb3 >= 1) {
                            _root.save.reforgingOrb1 -= 4;
                            _root.save.reforgingOrb2 -= 2;
                            _root.save.reforgingOrb3 -= 1;
                            toAutoAscend = true;
                        }
                    }
                    if (toAutoAscend == true) {
                        _root.save.ascStupidity = 0;
                        _root.save.progBoxAsc = 0;
                        _root.save.refillAsc = 0;
                        i = 0;
                        while (i <= 40) {
                            _root.save.expSauceAsc[i] = 0;
                            i++;
                        }
                        if (_root.save.gDifficulty >= 2) {
                            _root.save.bannedHard += 1;
                            _root.save.permaStupidityHard += 1;
                            _root.save.autoAscendCount2 += 1;
                            if (_root.save.speedRunAscendHard > Math.floor(_root.save.ascendPlayTime / 60)) {
                                _root.save.speedRunAscendHard = Math.floor(_root.save.ascendPlayTime / 60);
                            }
                        }
                        if (_root.save.gDifficulty >= 3) {
                            _root.save.bannedImpossible += 1;
                            _root.save.permaStupidityImpossible += 1;
                            _root.save.autoAscendCount3 += 1;
                            if (_root.save.speedRunAscendImpossible > Math.floor(_root.save.ascendPlayTime / 60)) {
                                _root.save.speedRunAscendImpossible = Math.floor(_root.save.ascendPlayTime / 60);
                            }
                        }
                        _root.save.level = 8999;
                        if (_root.save.gDifficulty == 3) {
                            _root.save.currentExp = 9718380419960;
                            _root.gainWhiteCoinB(2250);
                            _root.save.stupidity += 9;
                            _root.save.remStupidity += 9;
                            _root.save.totalStupidity += 9;
                        }
                        else if (_root.save.gDifficulty == 2) {
                            _root.save.currentExp = 4859190209980;
                            _root.gainWhiteCoinB(750);
                            _root.save.stupidity += 3;
                            _root.save.remStupidity += 3;
                            _root.save.totalStupidity += 3;
                        }
                        else {
                            _root.save.currentExp = 2429595104990;
                            _root.gainWhiteCoinB(250);
                            _root.save.stupidity += 1;
                            _root.save.remStupidity += 1;
                            _root.save.totalStupidity += 1;
                        }
                        _root.save.totalExp = _root.save.currentExp;
                        _root.save.expLag = 0;
                        if (_root.save.speedRunAscend > Math.floor(_root.save.ascendPlayTime / 60)) {
                            _root.save.speedRunAscend = Math.floor(_root.save.ascendPlayTime / 60);
                        }
                        _root.save.autoAscendCount1 += 1;
                        _root.save.banned += 1;
                        _root.save.permaStupidity += 1;
                        _root.save.ascendPlayTime = 0;
                        _root.save.seppukuAscension = 0;
                        ti = 1;
                        while (ti <= _root.save.autoAp) {
                            tmpCost = ti * (ti + 1) / 2;
                            if (ti >= 10) {
                                tmpCost *= ti - 9;
                            }
                            if (_root.save.remStupidity >= tmpCost) {
                                _root.save.remStupidity -= tmpCost;
                                _root.save.ascStupidity += 1;
                            }
                            ti++;
                        }
                        _root.topBar.ascentDisp.ascentText.text = "+" + _root.save.banned;
                    }
                }
            }
        }
        calcReqExp();
        let lfrt = 0;
        let lfrYC = 0;
        let lfrGC = 0;
        let lfrBC = 0;
        let lfr = 1;
        while (lfr <= 1) {
            if (_root.save.currentExp >= _root.requiredExp && !isNaN(_root.save.currentExp) && _root.save.currentExp != Infinity && _root.save.level < 9002) {
                _root.save.level += 1;
                lfrt += 1;
                if (lfrt < 50 && _root.save.level < 8998) {
                    lfr -= 1;
                }
                _root.save.totalExp += _root.requiredExp;
                _root.save.currentExp -= _root.requiredExp;
                if (_root.save.level == 9000) {
                    _root.save.currentExp = Math.floor(_root.save.currentExp / 2);
                }
                if (_root.save.level == 9001) {
                    _root.save.currentExp = Math.floor(_root.save.currentExp / 10);
                }
                lfrYC += 200 * _root.save.level;
                if (_root.save.level % 1000 == 0) {
                    lfrBC += _root.save.level;
                }
                else if (_root.save.level % 100 == 0) {
                    lfrGC += 10 * _root.save.level;
                }
                else {
                    lfrGC += 1 * _root.save.level;
                }
                if (_root.save.showBanner != false) {
                    if (_root.save.level % 1000 == 0 || _root.save.level == 9001 || _root.save.level == 9002) {
                        _root.accomplishPop.targetX = 10;
                        _root.accomplishPop.count = 0;
                        _root.accomplishPop.gotoAndStop(3);
                        _root.accomplishPop.lolMessage.text = "You are now Lv. " + withComma(_root.save.level) + "! Congratulations!";
                    }
                }
                if (_root.save.questType == "Level Up") {
                    _root.save.questCount += 1;
                }
                calcReqExp();
            }
            lfr++;
        }
        if (lfrt > 0) {
            if (_root.save.bestLevel < _root.save.level) {
                _root.save.bestLevel = _root.save.level;
            }
            if (_root.save.level == 8999) {
                _root.save.yoEpicFail = 25465;
                if (_root.save.gDifficulty >= 2) {
                    _root.save.coin += _root.save.bankCoin;
                    _root.save.greenCoin += _root.save.bankGreenCoin;
                    _root.save.blueCoin += _root.save.bankBlueCoin;
                    _root.save.bankCoin = 0;
                    _root.save.bankGreenCoin = 0;
                    _root.save.bankBlueCoin = 0;
                    _root.save.featureBoostGen = true;
                    _root.save.featureBoostAuto = true;
                    _root.save.featureGarden = true;
                    _root.save.featureBattleArena = true;
                    _root.save.featureButtonMachine = true;
                    _root.save.featureMoneyPrinter = true;
                    _root.save.featureMysteryShop = true;
                    _root.save.featureArcade = true;
                    _root.save.featureStadium = true;
                    _root.save.featureTukkunFCG = true;
                    _root.save.featureLolMarket = true;
                    _root.save.featureAwesomeAdventures = true;
                    _root.save.featureFishing = true;
                    _root.save.featureEpicLicense = true;
                    _root.save.featureMiniGarden = true;
                    _root.save.featureTravelingTicket = true;
                    _root.save.featureSuperBattery = true;
                    _root.save.featureArcadePack = true;
                    _root.save.featureManualSprayer = true;
                    _root.save.featureSpecialSprayer = true;
                    _root.save.featureDoomSprayer = true;
                    _root.save.featureEnergyToolbar = true;
                    _root.save.featurePremiumSprayer = true;
                    _root.save.boostMax = 1600;
                }
            }
            else if (_root.save.level == 9000) {
                if (_root.save.banned < 100) {
                    _root.gainWhiteCoinB(1000);
                }
            }
            else if (_root.save.level == 9001) {
                if (_root.saveid >= 10 && _root.saveid <= 13) {
                    if (isNaN(_root.saveGlobal.challengeTime[0]) || _root.saveGlobal.challengeTime[0] > Math.floor(_root.save.ascendPlayTime)) {
                        _root.saveGlobal.challengeTime[0] = Math.floor(_root.save.ascendPlayTime);
                        _root.saveGlobal.challengeAttempted[0] = true;
                        _root.saveGlobal.challengePerfect[0] = true;
                    }
                }
                if (_root.save.speedRun9001 > Math.floor(_root.save.ascendPlayTime / 60)) {
                    _root.save.speedRun9001 = Math.floor(_root.save.ascendPlayTime / 60);
                }
                _root.gainBlueCoin(Math.min(Math.floor(_root.finalExp / 200000000), 100000));
                if (_root.save.gOldAscension == true) {
                    if (_root.save.gDifficulty == 3) {
                        _root.gainWhiteCoinB(500);
                    }
                    else if (_root.save.gDifficulty == 2) {
                        _root.gainWhiteCoinB(250);
                    }
                    else if (_root.save.gDifficulty == 1) {
                        _root.gainWhiteCoinB(125);
                    }
                }
                else if (_root.save.gDifficulty == 3) {
                    _root.gainWhiteCoinB(1000);
                }
                else if (_root.save.gDifficulty == 2) {
                    _root.gainWhiteCoinB(500);
                }
                else if (_root.save.gDifficulty == 1) {
                    _root.gainWhiteCoinB(250);
                }
            }
            else if (_root.save.level == 9002) {
                if (_root.save.speedRun9002 > Math.floor(_root.save.ascendPlayTime / 60)) {
                    _root.save.speedRun9002 = Math.floor(_root.save.ascendPlayTime / 60);
                }
                _root.save.count9002 += 1;
            }
            _root.gainCoin(lfrYC, 39);
            if (lfrGC > 0) {
                _root.gainGreenCoinND(lfrGC);
            }
            if (lfrBC > 0) {
                _root.gainBlueCoin(lfrBC);
            }
            gainBoost(100 * lfrt, 1);
            dispNews(2, "LEVEL UP! You are now Lv. " + withComma(_root.save.level) + ".");
            if (_root._quality != "LOW") {
                _root.topBar.levelStar.levelAnim._alpha = 100;
            }
        }
        _root.finalExp = _root.save.currentExp + _root.save.totalExp;
        if (isNaN(_root.finalExp)) {
            _root.finalExp = 0;
        }
        if (_root.finalExp > 999999999999999) {
            _root.finalExp = 999999999999999;
        }
        if (_root.save.bestExp < _root.finalExp) {
            _root.save.bestExp = _root.finalExp;
        }
        if (_root.saveid == 23 && _root.save.level >= 3000) {
            _root.clearChallenge();
        }
        else if (_root.saveid == 24 && _root.save.level >= 1337) {
            _root.clearChallenge();
        }
    }
    function checkMini() {
        if (_root.save.featureMiniGarden == true || _root.save.autoHarvestTime > 0) {
            main.miniGarden.setVisible(true);
            let plantedTrees = 0;
            let readyTrees = 0;
            let i = 1;
            while (i <= _root.save.gardenCapacity) {
                if (_root.save.gardenTrees[i] > 0 && _root.save.gardenPurchaseTime[i] + _root.save.gardenExpiryTime[i] - _root.systemtimenow > 0) {
                    plantedTrees += 1;
                    if (_root.save.gardenRecentTime[i] + _root.save.gardenHarvestTime[i] - _root.systemtimenow <= 0) {
                        readyTrees += 1;
                    }
                }
                i++;
            }
            main.miniGarden.miniGardenText.text = readyTrees + " / " + plantedTrees;
            if (readyTrees > 0) {
                main.miniGarden.miniGardenText.tint = 16776960;
                if (_root.save.autoHarvestTime > 0) {
                    harvestAllTree();
                }
            }
            else if (plantedTrees == 0) {
                main.miniGarden.miniGardenText.tint = 16711680;
            }
            else {
                main.miniGarden.miniGardenText.tint = 10066329;
            }
            if (readyTrees > 0) {
                if (main.miniGarden.alpha != 1) {
                    main.miniGarden.alpha = 1;
                }
                else {
                    main.miniGarden.alpha = 0.3;
                }
            }
            else {
                main.miniGarden.alpha = 0.3;
            }
        }
        else {
            main.miniGarden.setVisible(false);
        }

        if (_root.save.featureSuperBattery == true) {
            main.superBattery.setVisible(true);
        }
        else {
            main.superBattery.setVisible(false);
        }

        if (_root.save.featureEnergyToolbar == true) {
            main.adventureReminder.setVisible(true);
            if (_root.save.awesomeEnergy > 0) {
                main.adventureReminder.alpha = 1;
            }
            else {
                main.adventureReminder.alpha = 0.3;
            }
            main.adventureReminder.adventureText.text = _root.save.awesomeEnergy;
        }
        else {
            main.adventureReminder.setVisible(false);
        }
        if (_root.save.doubleExpTime > 0) {
            main.cardTimerExp.setActive();
            main.cardTimerExp.timeText.text = convertMin(_root.save.doubleExpTime);
        }
        else {
            main.cardTimerExp.setInactive();
        }
        if (_root.save.doubleCoinTime > 0) {
            main.cardTimerCoin.setActive();
            main.cardTimerCoin.timeText.text = convertMin(_root.save.doubleCoinTime);
        }
        else {
            main.cardTimerCoin.setInactive();
        }
    }
    function dispStuff() {
        // console.warn("UNIMPLEMENTED techlight");
        // if (_root.save.featureTechnicalLight == true) {
        //     if (_root.tLight._currentframe != 2) {
        //         _root.tLight.gotoAndStop(2);
        //     }
        //     _root.tLight.t1.checkLight();
        //     _root.tLight.t2.checkLight();
        //     _root.tLight.t3.checkLight();
        //     _root.tLight.t4.checkLight();
        //     _root.tLight.t5.checkLight();
        //     _root.tLight.t6.checkLight();
        //     _root.tLight.t7.checkLight();
        //     _root.tLight.t8.checkLight();
        //     _root.tLight.t9.checkLight();
        // }
        // else {
        //     _root.tLight.gotoAndStop(3);
        // }
        // console.warn("UNIMPLEMENTED topbar");
        // if (_root.topBar.titleDisp.titleText.text != _root.save.userTitle) {
        //     _root.topBar.titleDisp.titleText.text = _root.save.userTitle;
        // }
        // titleColor = _root.save.titlered * 65536 + _root.save.titlegreen * 256 + _root.save.titleblue;
        // if (_root.topBar.titleDisp.titleText.textColor != titleColor) {
        //     _root.topBar.titleDisp.nameText.textColor = titleColor;
        //     _root.topBar.titleDisp.titleText.textColor = titleColor;
        // }
        if (_root.saveid >= 10) {
            _root.dispAsc();
        }
    }
    function progressUp() {
        let progSpeed;
        if (_root.progPercent < _root.save.progStore) {
            if (_root.save.idleMode == false || _root.idlerAppreciate == true || _root.saveid >= 10 && _root.saveid < 20) {
                if (_root.save.progSpeedManual > _root.save.progSpeedAuto) {
                    progSpeed = _root.save.progSpeedManual;
                }
                else {
                    progSpeed = _root.save.progSpeedAuto;
                }
            }
            else {
                progSpeed = _root.save.progSpeedAuto;
                if (_root.save.careerLevel[1] >= 100) {
                    progSpeed += 30;
                }
                progSpeed += _root.curCareerLevel[1] * 0.6;
            }
            progSpeed *= 1 + Math.min(Math.floor(_root.save.totalStupidity / 50), 20) * 0.01;
            if (_root.save.permaBanPenalty[31] == 3) {
                progSpeed *= 1.25;
            }
            else if (_root.save.permaBanPenalty[31] == 2) {
                progSpeed *= 1.15;
            }
            else if (_root.save.permaBanPenalty[31] == 1) {
                progSpeed *= 1.1;
            }
            if (_root.save.rewardClaim < 5) {
                progSpeed *= 2.5;
            }
            if (_root.save.gDifficulty >= 3 && _root.save.level < 8999) {
                progSpeed *= 0.8;
            }
            else if (_root.save.gDifficulty >= 2 && _root.save.level < 8999) {
                progSpeed *= 0.9;
            }
            _root.progPercent += 0.02 * (_root.save.boost / 100) * (40 / _root.fps) * (progSpeed / 100);
            if (_root.save.rewardClaim < 5) {
                _root.progPercent += 20 / _root.fps;
            }
            else if (_root.save.bestLevel < 35) {
                _root.progPercent += 0.125 * (_root.save.boost / 100) * (40 / _root.fps) * (progSpeed / 100);
            }
        }
    }
    function depleteBoost() {
        let ascendBonus = 100 * _root.save.banned;
        if (ascendBonus > 500) {
            ascendBonus = 500;
        }
        _root.boostMax = _root.save.boostMax + _root.save.boostZebra + ascendBonus;
        if (_root.saveid == 24) {
            _root.boostMax = 500;
        }
        _root.boostMin = 100;
        if (_root.boostMax < _root.boostMin + 1) {
            _root.boostMax = _root.boostMin + 1;
        }
        let antFreq = 0.3;
        let maxAnts = 50;
        if (_root.save.boost > _root.boostMax * 2.5) {
            _root.save.boost = _root.boostMax * 2.5;
        }
        if (_root.save.boost > _root.boostMax * 1.5) {
            antFreq *= 2 + (_root.save.boost - _root.boostMax) / 20 + (_root.save.boost - _root.boostMax * 1.5) / 5;
            maxAnts = Math.floor(maxAnts * (2 + (_root.save.boost - _root.boostMax) / 20 + (_root.save.boost - _root.boostMax * 1.5) / 5));
        }
        else if (_root.save.boost > _root.boostMax) {
            antFreq *= 2 + (_root.save.boost - _root.boostMax) / 20;
            maxAnts = Math.floor(maxAnts * (2 + (_root.save.boost - _root.boostMax) / 20));
        }
        else {
            antFreq *= 1 + (_root.save.boost - _root.boostMin) / (_root.boostMax - _root.boostMin) * 0.5;
            maxAnts = Math.floor(maxAnts * (1 + (_root.save.boost - _root.boostMin) / (_root.boostMax - _root.boostMin) * 0.5));
        }
        if (_root.save.featureSpecialSprayer == true) {
            maxAnts = Math.floor(maxAnts * 0.95);
        }
        if (_root.save.permaBanPenalty[9] == 3) {
            maxAnts = Math.floor(maxAnts * 0.8);
        }
        else if (_root.save.permaBanPenalty[9] == 2) {
            maxAnts = Math.floor(maxAnts * 0.88);
        }
        else if (_root.save.permaBanPenalty[9] == 1) {
            maxAnts = Math.floor(maxAnts * 0.92);
        }
        if (_root.save.permaBanPenalty[34] == 3) {
            antFreq *= 0.5;
        }
        else if (_root.save.permaBanPenalty[34] == 2) {
            antFreq *= 0.7;
        }
        else if (_root.save.permaBanPenalty[34] == 1) {
            antFreq *= 0.8;
        }
        if (maxAnts > 60000) {
            maxAnts = 60000;
        }
        if (maxAnts < 0) {
            maxAnts = 0;
        }
        if (_root.save.boost <= _root.boostMin) {
            antFreq = 0;
            maxAnts = 0;
            _root.save.boost = _root.boostMin;
        }
        if (_root.save.ants < maxAnts && _root.sprayCooldown1 < 165 && _root.sprayCooldown2 < 540) {
            _root.save.ants += Math.ceil(Math.random() * maxAnts * antFreq / 100);
        }
        else if (_root.save.ants > maxAnts) {
            _root.save.ants -= Math.ceil((_root.save.ants - maxAnts) / 2);
        }
        if (_root.save.boostFreeze > 3600) {
            _root.save.boostFreeze = 3600;
        }
        if (_root.save.boostFreeze > 0 && _root.save.ants > 0) {
            _root.save.boostFreeze -= 1;
        }
        else {
            if (_root.save.boost < _root.boostMax * 1.5 || _root.save.ants > 0) {
                _root.save.boost -= _root.save.ants / 600;
            }
            _root.save.boostProg = _root.save.boost;
            _root.save.boostExp = _root.save.boost;
            _root.save.boostCoin = _root.save.boost;
        }
        if (_root.save.boost > 500 && _root.saveid == 24) {
            _root.save.boost = 500;
        }
        if (_root.save.boostZebra > 300) {
            _root.save.boostZebra = 300;
        }
        if (_root.save.refundCooldown > 0) {
            _root.save.refundCooldown -= 1;
        }
        if (_root.save.restTime > 0) {
            _root.save.restTime -= 1;
        }
        if (_root.save.doubleExpTime > 0) {
            _root.save.doubleExpTime -= 1;
            if (_root.save.doubleExpTime <= 0) {
                dispNews(129, "1.5x EXP is deactivated.");
            }
        }
        if (_root.save.doubleCoinTime > 0) {
            _root.save.doubleCoinTime -= 1;
            if (_root.save.doubleCoinTime <= 0) {
                dispNews(129, "1.5x Coin is deactivated.");
            }
        }
        if (_root.save.rewardBotTime > 0) {
            _root.save.rewardBotTime -= 1;
            if (_root.save.rewardBotTime >= 3 && _root.save.rewardBotTime < 4) {
                dispNews(129, "Idlebot is deactivated.");
            }
        }
        if (_root.save.autoHarvestTime > 0) {
            _root.save.autoHarvestTime -= 1;
            if (_root.save.autoHarvestTime >= 3 && _root.save.autoHarvestTime < 4) {
                dispNews(129, "Autoharvest is deactivated.");
            }
        }
        if (_root.save.eliteButtonTime > 0) {
            _root.save.eliteButtonTime -= 1;
            if (_root.save.eliteButtonTime <= 0) {
                dispNews(129, "Invincibility Stars is deactivated.");
            }
        }
        if (_root.save.batteryChargerTime > 0) {
            _root.save.batteryChargerTime -= 1;
            if (_root.save.batteryChargerTime >= 3 && _root.save.batteryChargerTime < 4) {
                dispNews(129, "Battery Charger is deactivated.");
            }
        }
        if (_root.save.stadiumProTime > 0) {
            _root.save.stadiumProTime -= 1;
            if (_root.save.stadiumProTime <= 0) {
                dispNews(129, "Stadium Pro is deactivated.");
            }
        }
        if (_root.save.powerUserTime > 0) {
            _root.save.powerUserTime -= 1;
            if (_root.save.powerUserTime <= 0) {
                dispNews(129, "FCG Power User is deactivated.");
            }
        }
        if (_root.save.demandMasterTime > 0) {
            _root.save.demandMasterTime -= 1;
            if (_root.save.demandMasterTime <= 0) {
                dispNews(129, "Demand Master is deactivated.");
            }
        }
        if (_root.save.quickAdventuresTime > 0) {
            _root.save.quickAdventuresTime -= 1;
            if (_root.save.quickAdventuresTime <= 0) {
                dispNews(129, "Quick Adventures is deactivated.");
            }
        }
        if (_root.save.eliteFisherTime > 0) {
            _root.save.eliteFisherTime -= 1;
            if (_root.save.eliteFisherTime <= 0) {
                dispNews(129, "Elite Fisher is deactivated.");
            }
        }
        if (_root.save.noAntsTime > 0) {
            _root.save.noAntsTime -= 1;
            if (_root.save.noAntsTime >= 3 && _root.save.noAntsTime < 4) {
                dispNews(129, "Automatic Ant Spray is deactivated.");
            }
        }
        if (_root.save.doubleQuestTime > 0) {
            _root.save.doubleQuestTime -= 1;
            if (_root.save.doubleQuestTime <= 0) {
                dispNews(129, "2x Random Quest Reward is deactivated.");
            }
        }
    }
    function lagExp() {
        if (_root.save.expLag > 0) {
            _root.save.currentExp += Math.ceil(_root.save.expLag / 1.1);
            _root.save.expLag -= Math.ceil(_root.save.expLag / 1.1);
        }
        if (_root.save.coinLag > 0) {
            _root.save.coin += Math.ceil(_root.save.coinLag / 1.1);
            _root.save.coinLag -= Math.ceil(_root.save.coinLag / 1.1);
        }
    }
    function checkPrinter() {
        let moneyToPrint = Math.floor(((_root.save.printerLevel + 25) * Math.pow(Math.min(_root.save.level, 9001), 0.65) * 0.63 * 10 + 4560) * (100 + _root.save.printerLevel) / 100);
        moneyToPrint = Math.round(moneyToPrint / 125) * 500;
        let printSpeed = _root.save.printerCharge * 0.04 / _root.fps;
        if (_root.save.permaBanPenalty[4] == 3) {
            moneyToPrint = Math.round(moneyToPrint * 5);
        }
        else if (_root.save.permaBanPenalty[4] == 2) {
            moneyToPrint = Math.round(moneyToPrint * 3.4);
        }
        else if (_root.save.permaBanPenalty[4] == 1) {
            moneyToPrint = Math.round(moneyToPrint * 2.6);
        }
        _root.printPercent += printSpeed;
        if (_root.printPercent >= 100) {
            printMoney(moneyToPrint);
        }
    }
    function checkExpiry() {
        let expireCount = 0;
        let firstExpire = 0;
        let i = 1;
        while (i <= _root.save.gardenCapacity) {
            if (_root.save.gardenTrees[i] > 0) {
                if (_root.save.gardenPurchaseTime[i] + _root.save.gardenExpiryTime[i] - _root.systemtimenow < 0) {
                    _root.save.gardenTrees[i] = 0;
                    expireCount += 1;
                    if (expireCount == 1) {
                        firstExpire = i;
                    }
                }
            }
            i++;
        }
        if (expireCount >= 3) {
            dispNews(20, "Tree #" + firstExpire + " and " + (expireCount - 1) + " others expired.");
        }
        else if (expireCount == 2) {
            dispNews(20, "Tree #" + firstExpire + " and 1 other expired.");
        }
        else if (expireCount == 1) {
            dispNews(20, "Tree #" + firstExpire + " expired.");
        }
    }
    function updateMarket() {
        if (_root.save.featureLolMarket == true) {
            dispNews(107, "LolMarket prices have changed.");
            i = 1;
            while (i <= 10) {
                if (_root.save.lolDemand[i] > 100) {
                    _root.save.lolDemand[i] = 100;
                }
                else if (_root.save.lolDemand[i] < -100) {
                    _root.save.lolDemand[i] = -100;
                }
                _root.save.lolPrice[i] += _root.save.lolDemand[i];
                _root.save.lolDemand[i] += Math.round((Math.random() - Math.random()) * (2.5 + i / 4));
                if (_root.save.lolPrice[i] < 1000 * i) {
                    _root.save.lolDemand[i] += i;
                }
                else if (_root.save.lolPrice[i] < 1250 * i) {
                    _root.save.lolDemand[i] += 1;
                }
                else if (_root.save.lolPrice[i] > 2000 * i) {
                    _root.save.lolDemand[i] -= i;
                }
                else if (_root.save.lolPrice[i] > 1750 * i) {
                    _root.save.lolDemand[i] -= 1;
                }
                if (_root.save.lolPrice[i] < 450 * i) {
                    _root.save.lolPrice[i] = 450 * i;
                }
                else if (_root.save.lolPrice[i] > 2550 * i) {
                    _root.save.lolPrice[i] = 2550 * i;
                }
                if (_root.save.demandMasterTime > 0 && Math.random() < 0.35) {
                    if (_root.save.lolGems[i] >= Math.ceil(_root.save.lolCapacity / 2) && _root.save.lolDemand[i] < 15) {
                        _root.save.lolDemand[i] += 1;
                    }
                    else if (_root.save.lolGems[i] < Math.ceil(_root.save.lolCapacity / 2) && _root.save.lolDemand[i] > -15) {
                        _root.save.lolDemand[i] -= 1;
                    }
                }
                if (_root.save.careerLevel[9] >= 100 && Math.random() < 0.1) {
                    if (_root.save.lolGems[i] >= Math.ceil(_root.save.lolCapacity / 2) && _root.save.lolDemand[i] < 20) {
                        _root.save.lolDemand[i] += 2;
                    }
                    else if (_root.save.lolGems[i] < Math.ceil(_root.save.lolCapacity / 2) && _root.save.lolDemand[i] > -20) {
                        _root.save.lolDemand[i] -= 2;
                    }
                }
                if (Math.random() < 0.15) {
                    if (_root.save.lolGems[i] >= Math.ceil(_root.save.lolCapacity / 2)) {
                        _root.save.lolDemand[i] += 1;
                    }
                    else if (_root.save.lolGems[i] < Math.ceil(_root.save.lolCapacity / 2)) {
                        _root.save.lolDemand[i] -= 1;
                    }
                }
                if (_root.save.lolDemand[i] > 30) {
                    _root.save.lolDemand[i] -= Math.ceil(i / 2) + 1;
                }
                else if (_root.save.lolDemand[i] < -30) {
                    _root.save.lolDemand[i] += Math.ceil(i / 2) + 1;
                }
                if (_root.save.lolDemand[i] > 40) {
                    _root.save.lolDemand[i] -= i;
                }
                else if (_root.save.lolDemand[i] < -40) {
                    _root.save.lolDemand[i] += i;
                }
                i++;
            }
        }
    }
    if (_root.suc1 == true && _root.suc2 == true && _root.saveid < 10) {
        _root.actualKpaCount = 0;
        _root.actualShinyKpaCount = 0;
        i = 1;
        while (i <= _root.kpaCount) {
            if (_root.kpaOwned[i] == true) {
                _root.actualKpaCount += 1;
            }
            if (_root.kpaShiny[i] == true) {
                _root.actualShinyKpaCount += 1;
            }
            i++;
        }
    }
    _root.fishRodCount = 0;
    let i = 1;
    while (i <= 10) {
        if (_root.save.fishRodUnlock[i] == 1) {
            _root.fishRodCount += 1;
        }
        if (_root.fishRodCount >= 7) {
            _root.save.fishRodUnlock[10] = 1;
        }
        i++;
    }
    _root.stadiumHatUnlocked = 0;
    if (_root.save.stadiumRace >= 500 || _root.save.stadiumImpossibleRace >= 25) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.stadiumItem >= 500 || _root.save.stadiumImpossibleItem >= 25) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.stadiumDeathMatch >= 50 || _root.save.stadiumBestDeathMatch >= 1000) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.aceFinish > 0) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.stadiumBetCorrect >= 50) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.stadiumTokenMax >= 1000000) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.stadiumBunnyHat == true) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.stadiumH1 == true) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.stadiumH2 == true) {
        _root.stadiumHatUnlocked += 1;
    }
    if (_root.save.stadiumH3 == true) {
        _root.stadiumHatUnlocked += 1;
    }
    _root.totalUnrankedPower = 0;
    i = 1;
    while (i <= 40) {
        _root.totalUnrankedPower += _root.save.unrankedPower[i];
        i++;
    }
    _root.totalRestEfficiency = 0;
    i = 1;
    while (i <= 10) {
        _root.totalRestEfficiency += _root.save.restEfficiency[i];
        i++;
    }
    _root.organizeModule();
    if (_root.save.challengeInit != true) {
        _root.save.challengeInit = true;
        if (_root.saveid == 21) {
            _root.getArenaWeapon(100, "Gun", 149, true, 280, 13, 0, 18, 8, 0, 1, 0, 1, 0, 0, 0, "Coin", "Critical Damage", "", 0, Infinity, false, false, false, false, false, 0, "Golden Gun", "", true);
            _root.getArenaWeapon(125, "Sword", 133, false, 585, 6, 30, 20, 0, 0, 1, 0, 1, 0, 1, 0, "", "", "", 0, Infinity, false, false, false, false, false, 0, "Hero Sword", "", true);
            _root.getArenaArmor(80, "Hat", 109, 8, 0, 63, 14, 0, 0, 1, 0, 1, 0, 0, 0, "", "", "", 0, Infinity, false, false, false, false, false, 0, "Dragonewyn Hat", "", true);
            _root.getArenaArmor(80, "Shirt", 109, 8, 0, 82, 10, 0, 0, 1, 0, 1, 0, 0, 0, "", "", "", 0, Infinity, false, false, false, false, false, 0, "Dragonewyn Shirt", "", true);
            _root.getArenaArmor(80, "Gloves", 109, 16, 0, 50, 14, 0, 0, 1, 0, 1, 0, 0, 0, "", "", "", 0, Infinity, false, false, false, false, false, 0, "Dragonewyn Gloves", "", true);
            _root.getArenaArmor(80, "Pants", 109, 8, 0, 82, 10, 0, 0, 1, 0, 1, 0, 0, 0, "", "", "", 0, Infinity, false, false, false, false, false, 0, "Dragonewyn Pants", "", true);
            _root.getArenaArmor(80, "Shoes", 109, 8, 2, 50, 10, 4, 0, 1, 0, 1, 0, 0, 0, "", "", "", 0, Infinity, false, false, false, false, false, 0, "Dragonewyn Shoes", "", true);
            _root.getArenaAccessory(30, "Pendant", 20, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 10, 756, "", "", "", 0, Infinity, true, false, false, false, 0, "Collector\'s Pendant", "This special item is awarded to help you during Challenge #1. Use it well, and don\'t accidentally sell it! Oh wait, you can\'t even sell it...", true);
        }
        if (_root.saveid == 25) {
            _root.save.featureTukkunFCG = true;
            _root.save.fcgLevel = 60;
            _root.save.fcgRewardedLevel = 60;
            _root.save.fcgCash = 60000;
            i = 1;
            while (i <= 248) {
                _root.save.fcgOwned[i] += 6;
                i++;
            }
            _root.save.fcgChallenge5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            _root.save.fcgSeriousDeck = 13 + random(53);
        }
    }
    _root.towerCooldown = 30;
    i = 1;
    while (i <= _root.autoUpdateTime.length - 1) {
        if (_root.systemtimenow > _root.autoUpdateTime[i] && _root.save.au < i) {
            _root.save.au = i;
        }
        i++;
    }
    _root.sprayCooldown1 = 165;
    _root.sprayCooldown2 = 540;
    _root.cursoridle = 0;
    _root.failGrammar = 0;
    if (_root.save.seppukuEnd > 0) {
        _root.gotoAndStop(17);
    }
    let dispAlt = false;
    _root.totalEpicSkill = 0;
    i = 1;
    while (i <= 7) {
        _root.totalEpicSkill += _root.save.epicSkill[i];
        i++;
    }
    _root._quality = _root.saveGlobal.graphicQuality;
    _root.alreadyopened = 0;
    _root.treeToPlant = -1;
    if (_root["preloadedFile" + _root.saveID] != true) {
        _root["preloadedFile" + _root.saveID] = true;
        _root.save.totalPlays += 1;
    }
    _root.quitDuration = Math.ceil((_root.systemtimenow - _root.save.lastPlayed) / 3600000);
    if (_root.quitDuration > 72) {
        _root.quitDuration = 72;
    }
    if (_root.saveid >= 10 || _root.save.offlineProgress != true) {
        i = 1;
        while (i <= _root.save.gardenCapacity) {
            _root.save.gardenRecentTime[i] += _root.systemtimenow - _root.save.lastPlayed;
            _root.save.gardenPurchaseTime[i] += _root.systemtimenow - _root.save.lastPlayed;
            i++;
        }
        _root.save.gardenFertilizerAllow += _root.systemtimenow - _root.save.lastPlayed;
        _root.save.nextWizard += _root.systemtimenow - _root.save.lastPlayed;
        i = 1;
        while (i <= 3000) {
            if (_root.save.inventoryExist[i] == 1 && _root.save.inventoryExpiry[i] != Infinity) {
                _root.save.inventoryExpiry[i] += _root.systemtimenow - _root.save.lastPlayed;
            }
            i++;
        }
    }
    if (_root.quitDuration > 0 && _root.saveid < 10 && _root.save.offlineProgress == true) {
        if (_root.save.curBusiness != 0) {
            let businessOff = Math.floor((_root.systemtimenow - _root.save.lastPlayed) / 1000);
            if (businessOff < 0) {
                businessOff = 0;
            }
            if (businessOff > 86400) {
                businessOff = 86400;
            }
            _root.save.curBusinessOffline += businessOff;
        }
        if (_root.quitDuration > 1 && _root.save.bestLevel >= 25) {
            //console.warn("UNIMPLEMENTED offlineProg")
            //_root.offlineProg.gotoAndStop(2);
            if (_root.save.awesomeEnergy < _root.save.awesomeMaxEnergy * 5) {
                _root.save.awesomeEnergy = _root.save.awesomeMaxEnergy * 5;
            }
            _root.save.fishFatigue -= 1200 * (_root.quitDuration - 1);
            if (_root.save.permaBanPenalty[22] == 3) {
                _root.save.fishFatigue -= 1200 * (_root.quitDuration - 1);
            }
            else if (_root.save.permaBanPenalty[22] == 2) {
                _root.save.fishFatigue -= 720 * (_root.quitDuration - 1);
            }
            else if (_root.save.permaBanPenalty[22] == 1) {
                _root.save.fishFatigue -= 480 * (_root.quitDuration - 1);
            }
        }
        if (_root.save.petExist == 1) {
            let petFullnessDrop = _root.quitDuration * 2;
            if (petFullnessDrop > 72) {
                petFullnessDrop = 72;
            }
            if (_root.save.careerLevel[11] >= 100) {
                petFullnessDrop = Math.floor(petFullnessDrop / 2);
            }
            if (_root.save.petFullness >= petFullnessDrop) {
                _root.save.petFullness -= petFullnessDrop;
                dispNews(149, "Pet Fullness decreased! (-" + petFullnessDrop + ") / Remaining: " + _root.save.petFullness);
            }
            else {
                _root.save.petHealth -= petFullnessDrop - _root.save.petFullness;
                dispNews(149, "Pet Fullness decreased! (-" + _root.save.petFullness + ") / Remaining: 0");
                dispNews(150, "Pet Health decreased! (-" + (petFullnessDrop - _root.save.petFullness) + ") / Remaining: " + _root.save.petHealth);
                _root.save.petFullness = 0;
                if (_root.save.petHealth > 0) {
                    dispNews(152, "Your pet is VERY hungry. Feed it before it dies.");
                }
                else {
                    killPet();
                }
            }
        }
    }
    if (_root.save.longestQuit < _root.quitDuration) {
        _root.save.longestQuit = _root.quitDuration;
    }
    _root.save.lastPlayed = _root.systemtimenow;
    _root.progPercent = 0;
    _root.printPercent = 0;
    _root.mainSummonCount = 0;
    _root.mainAntiLag = 0;
    _root.souvenirLimit = [0, 500, 250, 250, 250, 100, 250, 1000, 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    _root.souvenirRC = 0;
    i = 1;
    while (i <= 24) {
        _root.souvenirRC += _root.save.souvenir[i];
        if (_root.save.souvenir[i] > _root.souvenirLimit[i]) {
            _root.souvenirRC = 0;
        }
        i++;
    }
    i = 1;
    while (i <= 10) {
        if (isNaN(_root.save.mysteryBox[i])) {
            _root.save.mysteryBox[i] = 0;
        }
        i++;
    }
    let recentReputation = _root.save.awesomeReputation;
    let delay1sec = 0;
    let delay5min = 0;
    if (_root.save.bestLevel < _root.save.level) {
        _root.save.bestLevel = _root.save.level;
    }
    if (_root.save.boostPremium > 0) {
        _root.save.boostPremium -= 2;
    }
    checkCareer();
    fixStuff();
    checkLevel();
    depleteBoost();
    checkExpiry();
    updateMarket();
    trackZoneKill();
    checkBestiary();
    checkAchievements();
    _root.checkFullInventory();
    dispStuff();
    checkMini();
    let tipAlpha = 1300;
    _root.toBuyInsta = 0;
    return function tick() {
        // console.warn("UNIMPLEMENTED levelstar")
        // if (_root.topBar.levelStar.levelAnim._alpha > 0) {
        //     _root.topBar.levelStar.levelAnim._alpha -= 2;
        // }
        // console.warn("UNIMPLEMENTED I+P instaprogress shortcut")
        // if (Key.isDown(73) && Key.isDown(80)) {
        //     _root.toBuyInsta += 1;
        //     if (_root.toBuyInsta >= 40 && _root.toBuyInsta <= 600) {
        //         instaToBuy = _root.toBuyInsta * 2 - 80;
        //         instaMax = Math.floor(_root.save.coin / 75000000);
        //         if (instaToBuy > instaMax) {
        //             instaToBuy = instaMax;
        //         }
        //         _root.save.coin -= instaToBuy * 75000000;
        //         _root.progPercent += instaToBuy * 100;
        //     }
        // }
        // else {
        //     _root.toBuyInsta = 0;
        // }
        _root.scrollingDir = 0;
        _root.annUpdate -= 1;
        if (_root.saveid >= 20) {
            if (_root.save.totalPlayTime >= 1800) {
                _root.saveGlobal.challengeAttempted[_root.saveid - 20] = true;
            }
            if (_root.save.challengeToken == Math.floor(_root.saveid * (_root.saveid + 1) * (_root.saveid - 7) * 156.4)) {
                if (isNaN(_root.save.challengeTime)) {
                    _root.save.challengeTime = _root.save.totalPlayTime;
                }
                if (isNaN(_root.saveGlobal.challengeTime[_root.saveid - 20]) || _root.saveGlobal.challengeTime[_root.saveid - 20] > _root.save.challengeTime) {
                    _root.saveGlobal.challengeTime[_root.saveid - 20] = _root.save.challengeTime;
                }
                if (_root.systemtimenow < _root.challengeDeadline) {
                    _root.saveGlobal.challengePerfect[_root.saveid - 20] = true;
                }
            }
        }
        if (_root.save.rewardBotTime > 0) {
            if (_root.cursoridle > 10 + _root.save.progStore * 0.01) {
                if (_root.progPercent < 50 && _root.save.rewardBotTime > 10) {
                    _root.save.idleMode = false;
                }
                else {
                    _root.save.idleMode = true;
                }
            }
            else {
                _root.save.idleMode = false;
            }
        }
        // console.warn("UNIMPLEMENTED noHelp ach")
        // if (Key.isDown(112)) {
        //     _root.save.noHelp = 1337;
        // }
        // console.warn("UNIMPLEMENTED stat shortcut")
        // if (Key.isDown(17) && Key.isDown(83) && tempStatHold != true) {
        //     tempStatHold = true;
        //     if (_root.optionsScreen._currentframe != 5) {
        //         _root.optionsScreen.gotoAndStop(5);
        //     }
        //     else {
        //         _root.optionsScreen.gotoAndStop(1);
        //     }
        //     _root.actiondescription = "";
        //     _root.actiondescription = "";
        // }
        // else if (!Key.isDown(83)) {
        //     tempStatHold = false;
        // }
        _root.save.boostExp = _root.save.boost;
        _root.save.boostCoin = _root.save.boost;
        if (_root.fcgCooldown > 0 && !isNaN(_root.fcgCooldown)) {
            _root.fcgCooldown -= 1 / _root.fps;
        }
        _root.save.progBoxNext -= 1 / _root.fps;
        if (_root.save.progBoxNext < 0) {
            _root.save.progBoxNext = 0;
        }
        _root.save.refillNext -= 1 / _root.fps;
        if (_root.save.refillNext < 0) {
            _root.save.refillNext = 0;
        }
        delay1sec += 1 / _root.fps;
        delay5min += 1 / _root.fps;
        fixStuff();
        checkLevel();
        progressUp();
        lagExp();
        if (_root.save.featureMoneyPrinter == true) {
            checkPrinter();
        }
        if (_root.save.noob > 4000) {
            _root.save.noob = 0;
        }
        if (_root.save.noob > 3000) {
            _root.save.noob = 3000;
        }
        if (_root.save.progSpeedAuto > 200) {
            _root.save.progSpeedAuto = 1;
        }
        if (_root.save.progSpeedManual > 500) {
            _root.save.progSpeedManual = 1;
        }
        if (_root.save.gardenPoint > 9999999) {
            _root.save.gardenPoint = 9999999;
            _root.save.gardenPointMax = 9999999;
        }
        let bonusStatPct = _root.save.bannedB;
        if (bonusStatPct > 100) {
            bonusStatPct = 100;
        }
        if (isNaN(bonusStatPct)) {
            bonusStatPct = 0;
        }
        if (_root.save.arenaAttack > 90000 + bonusStatPct * 900) {
            _root.save.arenaAttack = 90000 + bonusStatPct * 900;
        }
        if (_root.save.arenaDefense > 90000 + bonusStatPct * 900) {
            _root.save.arenaDefense = 90000 + bonusStatPct * 900;
        }
        if (_root.save.arenaAccuracy > 18000 + bonusStatPct * 180) {
            _root.save.arenaAccuracy = 18000 + bonusStatPct * 180;
        }
        if (_root.save.arenaEvasion > 18000 + bonusStatPct * 180) {
            _root.save.arenaEvasion = 18000 + bonusStatPct * 180;
        }
        if (_root.save.arenaMaxHealth > 900000 + bonusStatPct * 9000) {
            _root.save.arenaMaxHealth = 900000 + bonusStatPct * 9000;
        }
        if (_root.save.arenaMaxMana > 360000 + bonusStatPct * 3600) {
            _root.save.arenaMaxMana = 360000 + bonusStatPct * 3600;
        }
        if (_root.save.arenaCrystal1 > 9999) {
            _root.save.arenaCrystal1 = 9999;
        }
        if (_root.save.arenaCrystal2 > 9999) {
            _root.save.arenaCrystal2 = 9999;
        }
        if (_root.save.arenaPixel > 999999999999) {
            _root.save.arenaPixel = 999999999999;
        }
        if (_root.save.arenaCraft > 999999999999) {
            _root.save.arenaCraft = 999999999999;
        }
        if (isNaN(_root.save.arenaPixel)) {
            _root.save.arenaPixel = 0;
        }
        if (isNaN(_root.save.arenaCraft)) {
            _root.save.arenaCraft = 0;
        }
        if (_root.save.arenaSuperiorCraft > 9999999) {
            _root.save.arenaSuperiorCraft = 9999999;
        }
        if (_root.save.arenaUnobtainium > 9999999) {
            _root.save.arenaUnobtainium = 9999999;
        }
        if (_root.save.arenaTukkonium > 9999999) {
            _root.save.arenaTukkonium = 9999999;
        }
        if (_root.save.arenaEnhancerFragment > 9999999) {
            _root.save.arenaEnhancerFragment = 9999999;
        }
        if (_root.save.arenaChaoticFragment > 9999999) {
            _root.save.arenaChaoticFragment = 9999999;
        }
        if (_root.save.arenaProofTraining > 9999999) {
            _root.save.arenaProofTraining = 9999999;
        }
        if (_root.save.arenaProofMission > 9999999) {
            _root.save.arenaProofMission = 9999999;
        }
        if (_root.save.arenaNerfGem > 9999999) {
            _root.save.arenaNerfGem = 9999999;
        }
        if (_root.save.arenaBacon > 9999999) {
            _root.save.arenaBacon = 9999999;
        }
        if (_root.save.robaconBacon > 9999999) {
            _root.save.robaconBacon = 9999999;
        }
        if (_root.save.restTime > 360000) {
            _root.save.restTime = 360000;
        }
        if (_root.save.doubleExpTime > 360000) {
            _root.save.doubleExpTime = 360000;
        }
        if (_root.save.doubleCoinTime > 360000) {
            _root.save.doubleCoinTime = 360000;
        }
        if (_root.save.rewardBotTime > 360000) {
            _root.save.rewardBotTime = 360000;
        }
        if (_root.save.autoHarvestTime > 360000) {
            _root.save.autoHarvestTime = 360000;
        }
        if (_root.save.eliteButtonTime > 360000) {
            _root.save.eliteButtonTime = 360000;
        }
        if (_root.save.batteryChargerTime > 360000) {
            _root.save.batteryChargerTime = 360000;
        }
        if (_root.save.stadiumProTime > 360000) {
            _root.save.stadiumProTime = 360000;
        }
        if (_root.save.powerUserTime > 360000) {
            _root.save.powerUserTime = 360000;
        }
        if (_root.save.demandMasterTime > 360000) {
            _root.save.demandMasterTime = 360000;
        }
        if (_root.save.quickAdventuresTime > 360000) {
            _root.save.quickAdventuresTime = 360000;
        }
        if (_root.save.eliteFisherTime > 360000) {
            _root.save.eliteFisherTime = 360000;
        }
        if (_root.save.awesomeReputation > 999999) {
            _root.save.awesomeReputation = 999999;
        }
        if (_root.save.awesomeReputation < -999999) {
            _root.save.awesomeReputation = -999999;
        }
        if (_root.save.awesomeMaxReputation > 999999) {
            _root.save.awesomeMaxReputation = 999999;
        }
        if (_root.save.gardenFertilizer > 9999) {
            _root.save.gardenFertilizer = 9999;
        }
        if (_root.save.gardenMegaFertilizer > 9999) {
            _root.save.gardenMegaFertilizer = 9999;
        }
        if (_root.save.awesomeRefill > 9999) {
            _root.save.awesomeRefill = 9999;
        }
        if (_root.save.boostPotion > 9999) {
            _root.save.boostPotion = 9999;
        }
        if (_root.save.megaBoostPotion > 9999) {
            _root.save.megaBoostPotion = 9999;
        }
        if (delay1sec >= 1) {
            dispStuff();
            checkMini();
            if (_root.save.reforgeMode == 2) {
                coinToReforge = Math.floor(_root.save.coin * 0.001);
                _root.save.reforgingCoin += coinToReforge;
                _root.save.coin -= coinToReforge;
                coinToReforge = Math.floor(_root.save.greenCoin * 0.001);
                _root.save.reforgingGreenCoin += coinToReforge;
                _root.save.greenCoin -= coinToReforge;
                coinToReforge = Math.floor(_root.save.blueCoin * 0.001);
                _root.save.reforgingBlueCoin += coinToReforge;
                _root.save.blueCoin -= coinToReforge;
            }
            if (_root.save.coin > 999999999999) {
                _root.save.coinOvercap += 1;
            }
            else {
                _root.save.coinOvercap = 0;
            }
            if (_root.save.greenCoin > 999999999) {
                _root.save.greenCoinOvercap += 1;
            }
            else {
                _root.save.greenCoinOvercap = 0;
            }
            if (_root.save.blueCoin > 999999) {
                _root.save.blueCoinOvercap += 1;
            }
            else {
                _root.save.blueCoinOvercap = 0;
            }
            _root.save.pokayCD[1] -= 1;
            _root.save.pokayCD[2] -= 1;
            _root.save.pokayCD[3] -= 1;
            _root.save.pokayCD[4] -= 1;
            _root.save.pokayCD[5] -= 1;
            _root.save.pokayCD[6] -= 1;
            _root.save.pokayCD[7] -= 1;
            if (_root.saveid <= 3) {
                let ptd = Math.floor(_root.save.totalPlayTime / 86400) + " days";
                if (_root.save.totalPlayTime < 3600) {
                    ptd = Math.floor(_root.save.totalPlayTime / 60) + " min.";
                }
                else if (_root.save.totalPlayTime < 176800) {
                    ptd = Math.floor(_root.save.totalPlayTime / 3600) + " hr.";
                }
                _root.saveGlobal.playTime[_root.saveid] = ptd;
                _root.saveGlobal.curLevel[_root.saveid] = withComma(_root.save.level);
                _root.saveGlobal.ascCount[_root.saveid] = withComma(_root.save.banned);
            }
            checkCyborg();
            if (_root.save.whiteCoinRefund > 0) {
                tempWcEarn = Math.min(_root.save.whiteCoinRefund, 999999 - _root.save.whiteCoin);
                _root.save.whiteCoin += tempWcEarn;
                _root.save.whiteCoinRefund -= tempWcEarn;
            }
            if (_root.towerCooldown > 0) {
                _root.towerCooldown -= 1;
            }
            _root.sprayCooldown1 -= 1;
            _root.sprayCooldown2 -= 1;
            _root.cursoridle += 1;
            if (_root.save.maxAchievement < _root.awards) {
                _root.save.maxAchievement = _root.awards;
            }
            if (_root.save.curBusiness != 0) {
                _root.save.curBusinessOnline += 1;
            }
            _root.sessionTimeLeft -= 1;
            _root.thisSession += 1;
            if (_root.save.longestSession < _root.thisSession) {
                _root.save.longestSession = _root.thisSession;
            }
            if (_root.sessionTimeLeft < 0) {
                _root.gotoAndStop(16);
            }
            _root.save.totalPlayTime += 1;
            _root.save.ascendPlayTime += 1;
            _root.save.houseVer -= 1;
            _root.failGrammar -= 1;
            if (_root.save.noAntsTime > 0) {
                if (_root.sprayCooldown1 <= 0 && _root.save.ants > 0) {
                    _root.sprayCooldown1 = 180;
                    _root.save.antsSprayed += Math.ceil(_root.save.ants * 0.9);
                    _root.save.ants = Math.floor(_root.save.ants * 0.1);
                }
                if (_root.save.featureDoomSprayer == true) {
                    if (_root.sprayCooldown2 <= 0 && _root.save.ants > 0) {
                        _root.sprayCooldown2 = 600;
                        _root.save.antsSprayed += _root.save.ants + 99;
                        _root.save.ants = -99;
                    }
                }
            }
            checkCareer();
            checkAchievements();
            depleteBoost();
            if (_root.save.featureGarden == true) {
                checkExpiry();
            }
            if (_root.save.featureButtonMachine == true) {
                let grandpaClickRate = _root.save.buttonGrandpaSpeed * 0.01;
                let grandpaExcellentRate = _root.save.buttonGrandpaAccuracy * 0.04;
                let grandpaExp = 0;
                let grandpaCoin = 0;
                let grandpaGreenCoin = 0;
                let grandpaBlueCoin = 0;
                let grandpaCareer = 0;
                let tmashbonusb = Math.floor(Math.sqrt(_root.save.buttonPress * 0.5));
                let tmashbonusd = _root.save.buttonMultiplier;
                if (tmashbonusb > 2500) {
                    tmashbonusb = 2500;
                }
                let tmul = Math.floor(100 + (tmashbonusb + tmashbonusd));
                if (_root.save.eliteButtonTime > 0) {
                    tmul += 200;
                }
                if (currentFeature !== Feature.Button) {
                    grandpaClickRate = grandpaClickRate * _root.save.buttonGrandpaDiscipline * 0.02;
                    grandpaExcellentRate = grandpaExcellentRate * _root.save.buttonGrandpaDiscipline * 0.02;
                }
                let i = 1;
                let grandpaPerf;
                let grandpaRating;
                let grandpaReward;
                while (i <= _root.save.buttonGrandpa) {
                    if (Math.random() < grandpaClickRate) {
                        grandpaPerf = 89;
                        grandpaRating = 4;
                        if (_root.save.questType == "Press") {
                            if (_root.save.questSubtype == "Any") {
                                _root.save.questCount += 1;
                            }
                        }
                        if (Math.random() < grandpaExcellentRate) {
                            grandpaPerf = 97;
                            grandpaRating = 6;
                            if (_root.save.questType == "Press") {
                                if (_root.save.questSubtype == "Great") {
                                    _root.save.questCount += 1;
                                }
                                if (_root.save.questSubtype == "Excellent") {
                                    _root.save.questCount += 1;
                                }
                            }
                            if (Math.random() < 0.25) {
                                grandpaPerf = 99;
                                grandpaRating = 7;
                                if (_root.save.questType == "Press") {
                                    if (_root.save.questSubtype == "Perfect") {
                                        _root.save.questCount += 1;
                                    }
                                }
                            }
                        }
                        else if (Math.random() < 0.5) {
                            grandpaPerf = 94;
                            grandpaRating = 5;
                            if (_root.save.questType == "Press") {
                                if (_root.save.questSubtype == "Great") {
                                    _root.save.questCount += 1;
                                }
                            }
                        }
                        _root.save.buttonPress += 1;
                        _root.save.buttonGrandpaPress += 1;
                        grandpaReward = Math.floor(Math.pow(_root.save.level * grandpaPerf * grandpaRating, 0.6) * tmul / 100);
                        grandpaExp += Math.floor(grandpaReward * _root.save.boost / 100 * 0.175 * (1 + _root.curCareerLevel[5] * 0.005) * (1 + _root.save.petStat[3] * 0.002));
                        grandpaCoin += Math.floor(grandpaReward * _root.save.boost / 100 * 0.05 * (1 + _root.curCareerLevel[5] * 0.005));
                        if (grandpaRating == 4) {
                            grandpaGreenCoin += 10;
                            grandpaCareer += 2;
                        }
                        if (grandpaRating == 5) {
                            grandpaGreenCoin += 50;
                            grandpaCareer += 5;
                        }
                        if (grandpaRating == 6) {
                            grandpaGreenCoin += 250;
                            grandpaBlueCoin += 1;
                            grandpaCareer += 10;
                            if (_root.save.permaBanPenalty[18] == 3) {
                                _root.save.buttonPurple += 1;
                            }
                            else if (_root.save.permaBanPenalty[18] == 2 && Math.random() < 0.75) {
                                _root.save.buttonPurple += 1;
                            }
                            else if (_root.save.permaBanPenalty[18] == 1 && Math.random() < 0.5) {
                                _root.save.buttonPurple += 1;
                            }
                            if (_root.save.careerLevel[5] >= 200) {
                                _root.progPercent += 30;
                            }
                        }
                        if (grandpaRating == 7) {
                            _root.save.buttonPerfect += 1;
                            _root.save.buttonPurple += 1;
                            if (_root.save.permaBanPenalty[18] == 3) {
                                _root.save.buttonPurple += 1;
                            }
                            else if (_root.save.permaBanPenalty[18] == 2 && Math.random() < 0.25) {
                                _root.save.buttonPurple += 1;
                            }
                            grandpaGreenCoin += 1000;
                            grandpaBlueCoin += 2;
                            grandpaCareer += 50;
                            if (_root.save.careerLevel[5] >= 100) {
                                _root.progPercent += 100;
                            }
                        }
                    }
                    i++;
                }
                if (_root.save.permaBanPenalty[24] == 3) {
                    grandpaExp = Math.floor(grandpaExp * 3);
                }
                else if (_root.save.permaBanPenalty[24] == 2) {
                    grandpaExp = Math.floor(grandpaExp * 2.2);
                }
                else if (_root.save.permaBanPenalty[24] == 1) {
                    grandpaExp = Math.floor(grandpaExp * 1.8);
                }
                gainEXP(grandpaExp, 8);
                gainCoin(grandpaCoin, 8);
                gainGreenCoin(grandpaGreenCoin);
                gainBlueCoin(grandpaBlueCoin);
                gainCareerEXP(5, Math.ceil(grandpaCareer * tmul / 1000), true);
            }
            if (_root.save.featureAwesomeAdventures == true) {
                if (_root.save.awesomeEnergyNext < -1800) {
                    _root.save.awesomeEnergyNext = -1800;
                }
                if (_root.save.awesomeEnergy < _root.save.awesomeMaxEnergy * 5) {
                    _root.save.awesomeEnergyNext -= 1;
                }
                let rgn = 0;
                while (_root.save.awesomeEnergyNext <= 0 && _root.save.awesomeEnergy < _root.save.awesomeMaxEnergy * 5 + 15) {
                    rdx = _root.save.awesomeEnergyNext;
                    _root.save.awesomeEnergyNext = 300 - _root.curCareerLevel[10];
                    if (_root.save.quickAdventuresTime > 0) {
                        _root.save.awesomeEnergyNext = Math.floor(_root.save.awesomeEnergyNext / 2);
                    }
                    i = 1;
                    while (i <= _root.todayEvent) {
                        yy = _root.clock_year % 10;
                        mm = _root.clock_month;
                        dd = _root.clock_date;
                        if (_root.eventList[yy][mm][dd][i] == "Wait time for Adventure Energy is reduced by 25%") {
                            _root.save.awesomeEnergyNext = Math.floor(_root.save.awesomeEnergyNext * 0.75);
                        }
                        i++;
                    }
                    if (_root.save.restTime > 0) {
                        _root.save.awesomeEnergyNext = Math.floor(_root.save.awesomeEnergyNext * (0.9 - _root.save.restEfficiency[9] * 0.01));
                    }
                    _root.save.awesomeEnergyNext += rdx;
                    rgn += 1;
                    _root.save.awesomeEnergy += 1;
                }
                if (rgn > 0) {
                    dispNews(112, "Adventure Energy gained! (" + (_root.save.awesomeEnergy - rgn) + " --> " + _root.save.awesomeEnergy + ")");
                }
                if (_root.save.awesomeEnergy >= _root.save.awesomeMaxEnergy * 5 + 15) {
                    _root.save.awesomeEnergy -= 15;
                    _root.save.awesomeRefill += 1;
                    dispNews(112, "15 Adventure Energy has been converted to 1 Energy Refill!");
                }
            }
            if (_root.mainAntiLag > 160) {
                _root.mainAntiLag = 0;
            }
            if (Math.random() < 0.05) {
                updateMarket();
            }
            _root.save.lolCooldown -= 1;
            if (_root.save.coinMax > 999999999999999) {
                _root.save.coinMax = 999999999999999;
            }
            if (_root.save.greenCoinMax > 999999999999) {
                _root.save.greenCoinMax = 999999999999;
            }
            if (_root.save.blueCoinMax > 999999999) {
                _root.save.blueCoinMax = 999999999;
            }
            if (_root.save.whiteCoinMax > 999999) {
                _root.save.whiteCoinMax = 999999;
            }
            if (_root.save.coinMax < _root.save.coin) {
                _root.save.coinMax = _root.save.coin;
            }
            if (_root.save.greenCoinMax < _root.save.greenCoin) {
                _root.save.greenCoinMax = _root.save.greenCoin;
            }
            if (_root.save.blueCoinMax < _root.save.blueCoin) {
                _root.save.blueCoinMax = _root.save.blueCoin;
            }
            if (_root.save.whiteCoinMax < _root.save.whiteCoin) {
                _root.save.whiteCoinMax = _root.save.whiteCoin;
            }
            if (_root.save.gardenPointMax < _root.save.gardenPoint) {
                _root.save.gardenPointMax = _root.save.gardenPoint;
            }
            if (_root.save.gardenFruitMax < _root.save.gardenFruit) {
                _root.save.gardenFruitMax = _root.save.gardenFruit;
            }
            if (_root.save.arenaPixelMax < _root.save.arenaPixel) {
                _root.save.arenaPixelMax = _root.save.arenaPixel;
            }
            if (_root.save.arenaCraftMax < _root.save.arenaCraft) {
                _root.save.arenaCraftMax = _root.save.arenaCraft;
            }
            if (_root.save.stadiumTokenMax < _root.save.stadiumToken) {
                _root.save.stadiumTokenMax = _root.save.stadiumToken;
            }
            if (_root.save.lolMaxProfit < _root.save.lolProfit) {
                _root.save.lolMaxProfit = _root.save.lolProfit;
            }
            if (_root.save.awesomeMaxReputation < Math.abs(_root.save.awesomeReputation)) {
                _root.save.awesomeMaxReputation = Math.abs(_root.save.awesomeReputation);
            }
            if (_root.save.awesomeReputation != recentReputation) {
                dispNews(113, "Adventure Reputation: " + withComma(recentReputation) + " --> " + withComma(_root.save.awesomeReputation));
                repChange = Math.abs(_root.save.awesomeReputation - recentReputation);
                if (repChange > 100) {
                    repChange = 100;
                }
                gainCareerEXP(10, 10 * repChange, true);
                recentReputation = _root.save.awesomeReputation;
            }
            if (_root.save.batteryChargerTime > 0 && _root.save.printerCharge < 400) {
                _root.save.totalPrinterCharge += Math.ceil((400 - _root.save.printerCharge) / 10);
                _root.save.printerCharge += Math.ceil((400 - _root.save.printerCharge) / 10);
            }
            if (_root.thisSession / 6 == Math.floor(_root.thisSession / 6)) {
                if (_root.cursoridle >= 600) {
                    gainCareerEXP(1, 250, true);
                }
                else if (_root.cursoridle >= 300) {
                    gainCareerEXP(1, 100, true);
                }
                else if (_root.cursoridle >= 60) {
                    gainCareerEXP(1, 50, true);
                }
                else if (_root.cursoridle >= 30) {
                    gainCareerEXP(1, 25, true);
                }
                else if (_root.cursoridle >= 6) {
                    gainCareerEXP(1, 10, true);
                }
                else if (_root.thisSession / 30 == Math.floor(_root.thisSession / 30)) {
                    gainCareerEXP(1, 10, true);
                }
            }
            if (_root.save.idleMode == false && _root.save.doingItWrong < _root.cursoridle) {
                _root.save.doingItWrong = _root.cursoridle;
            }
            i = 1;
            while (i <= 16) {
                if (_root.save.careerBoost[i] > 0) {
                    _root.save.careerBoost[i] -= 1;
                    if (_root.save.careerBoost[i] <= 0) {
                        _root.save.careerBoost[i] = 0;
                        dispNews(158, "[" + _root.careerName[i] + "] Career is no longer blessed!");
                    }
                }
                else if (_root.save.careerActive[i] > 0) {
                    _root.save.careerActive[i] -= 1;
                    if (_root.save.careerActive[i] <= 0) {
                        _root.save.careerActive[i] = 0;
                        dispNews(145, "[" + _root.careerName[i] + "] Career is deactivated!");
                    }
                }
                i++;
            }
            _root.save.lastPlayed = _root.systemtimenow;
            delay1sec -= 1;
        }
        if (delay5min >= 300) {
            if (_root.save.boost < _root.boostMax * 1.5 - 1 && _root.save.boostPotion >= 1 && _root.save.boostAuto == true) {
                _root.save.boostPotion -= 1;
                gainBoost(9999, 3);
                if (_root.save.boostFreeze < 45 + Math.min(Math.floor(_root.save.totalStupidity / 500), 250)) {
                    _root.save.boostFreeze = 45 + Math.min(Math.floor(_root.save.totalStupidity / 500), 250);
                }
            }
            if (_root.save.gDifficulty == 1 || _root.save.level >= 8999) {
                _root.save.gardenFullness -= 50;
            }
            else if (_root.save.gDifficulty == 2) {
                _root.save.gardenFullness -= 20;
            }
            else if (_root.save.gDifficulty == 3) {
                _root.save.gardenFullness -= 5;
            }
            if (_root.save.gardenFullness < 0) {
                _root.save.gardenFullness = 0;
            }
            if (_root.saveid >= 10) {
                _root.save.speedRunCoin += 1;
                _root.save.speedRunNextDay -= 5;
                if (_root.save.speedRunNextDay <= 0) {
                    _root.anotherDay = true;
                    _root.save.speedRunNextDay = 1440;
                }
                else if (_root.saveid >= 20) {
                    dispNews(159, "[CHALLENGE] Next day will begin in " + withComma(_root.save.speedRunNextDay) + " minutes.");
                }
                else {
                    dispNews(159, "[SPEEDRUN] Next day will begin in " + withComma(_root.save.speedRunNextDay) + " minutes.");
                }
            }
            if (_root.save.hyperDay[1] != _root.todayCode && _root.save.hyperDay[2] != _root.todayCode) {
                gainEventToken(10);
            }
            if (_root.save.boostPremium > 0) {
                _root.save.boostPremium -= 2;
            }
            let fatigueRestore = 100;
            if (_root.save.permaBanPenalty[22] == 3) {
                fatigueRestore += 100;
            }
            else if (_root.save.permaBanPenalty[22] == 2) {
                fatigueRestore += 60;
            }
            else if (_root.save.permaBanPenalty[22] == 1) {
                fatigueRestore += 40;
            }
            if (_root.save.restTime > 0) {
                if (Math.random() < 0.2) {
                    fatigueRestore = Math.floor(fatigueRestore * (1.5 + _root.save.restEfficiency[10] * 0.05));
                }
            }
            _root.save.fishFatigue -= fatigueRestore;
            if (_root.cursoridle < 300 || _root.cursoridle < 129600 && Math.random() < 0.3) {
                checkPet();
            }
            let autoSaveX = true;
            // console.warn("UNIMPLEMENTED autosaveX currentFrame")
            // if (_root.house._currentframe == 10) {
            //     autoSaveX = false;
            // }
            // if (_root.house._currentframe == 22 && _root.fishStatus == 2) {
            //     autoSaveX = false;
            // }
            if (autoSaveX == true) {
                _root.my_so.flush();
            }
            _root.recMys = _root.systemtimenow;
            i = 1;
            while (i <= _root.autoUpdateTime.length - 1) {
                if (_root.systemtimenow > _root.autoUpdateTime[i] && _root.save.au < i) {
                    _root.save.au = i;
                }
                i++;
            }
            delay5min = 0;
        }
    };
    if (_root.saveid >= 20) {
        _root.showPopup("Challenge Mode", "You\'re now attempting Challenge #" + (_root.saveid - 20) + "!\nAvoid playing another savefile at the same time to prevent possible losses.\nAll Challenges are RANKED, so do NOT cheat. Cheaters will be banned from the game!!");
    }
    if (_root.saveid == 4) {
        _root.save.safeHacking = true;
    }
    _root.kongregate.stats.submit("Version Playing", upnumber);
    if (_root.save.mh == true) {
        _root.kongregate.stats.submit("nope", 38);
    }
    if (_root.kongregate_username == "TheLinkToThePast" || _root.kongregate_username == "Oregane" || _root.kongregate_username == "Tukkun") {
        if (_root.save.tlttpSkin != true && _root.emptyOutfitSlot >= 1) {
            _root.save.tlttpSkin = true;
            _root.getArenaOutfit(1, "Skin", 13, 706, 0, "Exclusive Skin!!!!1!", "Thank you for participating in TLTTP\'s Challenge!");
        }
    }
    if (_root.save.bestLevel >= 1000 && _root.saveid <= 3) {
        _root.saveGlobal.challengeUnlocked = true;
    }
    if (_root.saveid != 4) {
        if (_root.save.featureBattleArena == true) {
            _root.kongregate.stats.submit("Awesome", 1);
        }
    }
    if (_root.viewCredits == true) {
        _root.save.support = 1337;
    }
}