import { setupSOLReader } from '@/flash/sol';

import { Game, type Types } from "phaser";
import { CXFORMWITHALPHA } from "@/flash/pipeline/cxformwithalpha";
import { GlobalMouseWheelPlugin } from '@/loader/mouseWheelHandler';
import { Preloader } from '@/scenes/Preloader';
import { Loader } from '@/scenes/Loader';
import { MainMenu } from '@/mainMenu/MainMenu';
import { GlobalClickPlugin } from '@/loader/clickHandler';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 650,
    height: 650,
    parent: 'game-container',
    backgroundColor: '#1D232A',
    //pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    fps: {
        forceSetTimeOut: true,
        target: 40
    },
    plugins: {
        global: [
            { key: "GlobalMouseWheel", plugin: GlobalMouseWheelPlugin, start: true, },
            { key: "GlobalClick", plugin: GlobalClickPlugin, start: true, },
        ],
    },
    scene: [
        Preloader,
        Loader,
        MainMenu,
    ],
};

let input = document.createElement("input");
input.type = "file";
document.body.appendChild(input);
setupSOLReader();

export default new Game(config);
