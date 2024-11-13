// @ts-nocheck frame 11\DoAction
import { _root } from "@/flash/root";

export function onEnter() {
    _root.selectSavefile = function selectSavefile(sid) {
        if (sid <= 4) {
            _root.saveid = sid;
            _root.gotoAndStop(19);
        }
        else if (sid == 5) {
            _root.challengeMode.gotoAndStop(2);
        }
    }
    _root.actualKpaCount = 0;
    _root.actualShinyKpaCount = 0;
    let testVersion = false;
    if (testVersion == true) {
        _root.save.noobMode = true;
        _root.save.noobMode2 = true;
        _root.saveGlobal.adminMode = "TEST VERSION";
    }
    let onEnterFrame = null;
    // tb1.text = _root.saveGlobal.playTime[0];
    // tb2.text = _root.saveGlobal.curLevel[0];
    // tb3.text = _root.saveGlobal.ascCount[0];
    // tb4.text = _root.saveGlobal.playTime[1];
    // tb5.text = _root.saveGlobal.curLevel[1];
    // tb6.text = _root.saveGlobal.ascCount[1];
    // tb7.text = _root.saveGlobal.playTime[2];
    // tb8.text = _root.saveGlobal.curLevel[2];
    // tb9.text = _root.saveGlobal.ascCount[2];
    // tb10.text = _root.saveGlobal.playTime[3];
    // tb11.text = _root.saveGlobal.curLevel[3];
    // tb12.text = _root.saveGlobal.ascCount[3];
    let chalCount = 0;
    let i = 1;
    while (i <= 6) {
        if (!isNaN(_root.saveGlobal.challengeTime[i])) {
            chalCount += 1;
        }
        i++;
    }
    // tb13.text = chalCount + " / 6 completed";
    if (_root.autoStart == true && _root.saveGlobal.skipMenu == true) {
        _root.selectSavefile(_root.saveGlobal.selectedSave);
        _root.autoStart = false;
    }
}