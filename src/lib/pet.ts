import { _root } from "@/flash/root";
import { gainCareerEXP } from "./career";
import { dispNews } from "./news";

let pl;
let petMaxMana;
let petMaxHealth;

export function checkPet() {
    if (_root.save.petExist == 1) {
        _root.petTotalFeed = 0;
        let i = 1;
        while (i <= 8) {
            _root.petTotalFeed += _root.save.petStat[i];
            i++;
        }
        if (_root.save.petBestLevel < Math.floor(_root.petTotalFeed / 8)) {
            _root.save.petBestLevel = Math.floor(_root.petTotalFeed / 8);
        }
        if (_root.save.petFullness > 0) {
            _root.save.petFullness -= 1;
            dispNews(149, "Pet Fullness ocreased! (-1) / Remaining: " + _root.save.petFullness);
            gainCareerEXP(11, _root.save.petFullness * 25, true);
            if (_root.cursoridle < 300) {
                pl = Math.floor((_root.save.petStat[1] + _root.save.petStat[2] + _root.save.petStat[3] + _root.save.petStat[4] + _root.save.petStat[5] + _root.save.petStat[6] + _root.save.petStat[7] + _root.save.petStat[8]) / 8);
                petMaxMana = Math.floor((100 + Math.min(pl, 100) + Math.max(Math.floor(pl * (pl - 100) / 25), 0)) * Math.max(1, pl / 10 - 10));
                petMaxHealth = 100 + Math.min(pl, 100) + Math.max(Math.floor(pl * (pl - 100) / 25), 0);
                if (_root.save.petMana < petMaxMana) {
                    _root.save.petMana += 1;
                    dispNews(148, "Pet Mana increased! (+1) / Current: " + _root.save.petMana);
                    if (Math.random() < _root.curCareerLevel[11] / 200) {
                        _root.save.petMana += 5;
                        dispNews(148, "Pet Mana increased! (+5) / Current: " + _root.save.petMana);
                    }
                }
            }
            if (_root.save.petFullness > 90 && _root.save.petHealth < petMaxHealth) {
                _root.save.petHealth += 1;
                dispNews(147, "Pet Health increased! (+1) / Current: " + _root.save.petHealth);
            }
            else if (_root.save.petFullness < 30) {
                dispNews(151, "Your pet is hungry. Feed it before its health drops.");
            }
        }
        else if (_root.save.petHealth > 0) {
            _root.save.petFullness = 0;
            if (_root.save.careerLevel[11] < 100 || Math.random() < 0.5) {
                _root.save.petHealth -= 1;
                dispNews(150, "Pet Health decreased! (-1) / Remaining: " + _root.save.petHealth);
                dispNews(152, "Your pet is very hungry. Feed it before it dies.");
            }
        }
    }
    else {
        let i = 1;
        while (i <= 8) {
            _root.save.petStat[i] = 0;
            i++;
        }
    }
}

export function killPet() {
    if (_root.save.petExist != 0) {
        _root.save.deadPetName = _root.save.petName;
        _root.save.deadPetStat[1] = _root.save.petStat[1];
        _root.save.deadPetStat[2] = _root.save.petStat[2];
        _root.save.deadPetStat[3] = _root.save.petStat[3];
        _root.save.deadPetStat[4] = _root.save.petStat[4];
        _root.save.deadPetStat[5] = _root.save.petStat[5];
        _root.save.deadPetStat[6] = _root.save.petStat[6];
        _root.save.deadPetStat[7] = _root.save.petStat[7];
        _root.save.deadPetStat[8] = _root.save.petStat[8];
        _root.save.petExist = 0;
        _root.save.petHealth = 0;
        _root.save.petMana = 0;
        _root.save.petStat[1] = 0;
        _root.save.petStat[2] = 0;
        _root.save.petStat[3] = 0;
        _root.save.petStat[4] = 0;
        _root.save.petStat[5] = 0;
        _root.save.petStat[6] = 0;
        _root.save.petStat[7] = 0;
        _root.save.petStat[8] = 0;
        dispNews(153, "Your pet has died.");
    }
}