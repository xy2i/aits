
import { GlobalClickPlugin } from '@/loader/clickHandler';
import { GlobalMouseWheelPlugin } from '@/loader/mouseWheelHandler';
import { MainMenu } from '@/main-menu/MainMenu';
import { Loader } from '@/scenes/Loader';
import { Preloader } from '@/scenes/Preloader';
import { Game, type Types } from "phaser";
import { GameLoader } from './game-loader/GameLoader';
import { Main } from './main/Main';
import { Ui } from './ui/Ui';


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#1D232A',
    scale: {
        width: 650,
        height: 650,
        mode: Phaser.Scale.ScaleModes.NONE,
        zoom: 1 / (window.devicePixelRatio || 1)
    },
    parent: 'game-container',
    dom: {
        createContainer: true
    },
    callbacks: {
        postBoot: (game) => {
            game.scale.on(
                "resize",
                (gameSize, baseSize, displaySize, prevWidth, prevHeight) => {
                    const { zoom } = game.scale;
                    const { width, height } = game.scale.parentSize;
                    // const w = width / zoom;
                    const h = height / zoom;

                    if (h !== prevHeight) {
                        game.scale.resize(h, h);

                        for (const scene of game.scene.getScenes(false)) {
                            scene.cameras.main.setZoom(h / 650);
                        }
                    }
                }
            );

            for (const scene of game.scene.getScenes(false)) {
                scene.cameras.main.setOrigin(0, 0)
            }

            game.scale.parentSize.setMax(2048, 2048);

            // // First resize.
            game.scale.refresh();
        }
    },
    fps: {
        forceSetTimeOut: true,
        target: 40,
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
        GameLoader,
        Main,
        Ui,
    ],
};

// let input = document.createElement("input");
// input.type = "file";
// document.body.appendChild(input);
// setupSOLReader();

export default new Game(config);
