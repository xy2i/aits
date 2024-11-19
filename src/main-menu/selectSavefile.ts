import { _root } from "@/flash/root";
import { type Scenes } from "phaser";

export function selectSavefile(scene: Scenes.ScenePlugin, sid: number) {
    if (sid <= 4) {
        _root.saveid = sid;
        scene.start('GameLoader');
        // _root.gotoAndStop(19);
    }
    else if (sid == 5) {
        // console.warn("UNIMPLEMENTED challenge mode")
        //   _root.challengeMode.gotoAndStop(2);
    }
}