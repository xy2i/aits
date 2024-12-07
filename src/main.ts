import { GlobalClickPlugin } from '@/loader/clickHandler';
import { GlobalMouseWheelPlugin } from '@/loader/mouseWheelHandler';
import { MainMenu } from '@/main-menu/MainMenu';
import { Loader } from '@/scenes/Loader';
import { Preloader } from '@/scenes/Preloader';
import { Game, type Types } from "phaser";
import { setupSOLReader } from './flash/sol';
import { GameLoader } from './game-loader/GameLoader';
import { CameraZoomPlugin, getAllGameObjects } from './loader/CameraZoomPlugin';
import { MousePositionPlugin } from './loader/mousePositionHandler';
import { Ui } from './ui/Ui';

export const SIZE = 650;


//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: "#1D232A",
    scale: {
        width: 650,
        height: 650,
        mode: Phaser.Scale.ScaleModes.NONE,
        zoom: 1 / (window.devicePixelRatio || 1),
    },
    parent: "game-container",
    dom: {
        createContainer: true,
    },
    antialias: true,
    callbacks: {
        postBoot: (game) => {
            game.scene.getScenes(false).forEach((scene) => {
                const { zoom } = game.scale;
                const { width, height } = game.scale.parentSize;
                const h = height / zoom;

                if (scene.cameras?.main) {
                    scene.cameras.main.setOrigin(0, 0);
                    scene.cameras.main.setZoom(h / SIZE);
                }
                scene.events.once("create", () => {
                    getAllGameObjects(scene.children).forEach((child) => {
                        if (child.type === "Text") {
                            const { width, height } = scene.sys.game.canvas;
                            child.setStyle({
                                resolution: (height / SIZE) * 1.25,
                            });
                        }
                    });
                });
            });

            game.scale.parentSize.setMax(2048, 2048);

            // First resize.
            game.scale.refresh();
        },
    },
    fps: {
        forceSetTimeOut: true,
        target: 40,
    },
    plugins: {
        global: [
            {
                key: "CameraZoom",
                plugin: CameraZoomPlugin,
                start: true,
            },
            {
                key: "MousePosition",
                plugin: MousePositionPlugin,
                start: true,
            },
            {
                key: "GlobalMouseWheel",
                plugin: GlobalMouseWheelPlugin,
                start: true,
            },
            { key: "GlobalClick", plugin: GlobalClickPlugin, start: true },
        ],
    },
    scene: [Preloader, Loader, MainMenu, GameLoader, Ui],
};

let input = document.createElement("input");
input.type = "file";
document.body.appendChild(input);
setupSOLReader();

export default new Game(config);
