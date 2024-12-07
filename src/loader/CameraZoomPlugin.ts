import { SIZE } from "@/main";
import { Plugins } from "phaser";


export function getAllGameObjects(parent) {
    const objects = [];

    // If the parent is a container or a scene, traverse its children
    if (parent.list) {
        parent.list.forEach((child) => {
            objects.push(child);

            // Recursively check if the child has children
            if (child.list) {
                objects.push(...getAllGameObjects(child));
            }
        });
    }

    return objects;
}


export class CameraZoomPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    init() {
        // Hook into scene events
        this.game.scene.add = new Proxy(this.game.scene.add, {
            apply: (target, thisArg, args) => {
                console.log("proxy!!!!", args)
                const scene = target.apply(thisArg, args);
                scene.events.on('create', this.setZoom, this);

                return scene;
            }
        });
        this.game.scene.start = new Proxy(this.game.scene.start, {
            apply: (target, thisArg, args) => {
                const scene = target.apply(thisArg, args);
                this.setZoom();

                return scene;
            }
        });

        this.game.scale.on(
            "resize",
            (gameSize, baseSize, displaySize, prevWidth, prevHeight) => {
                this.setZoom();
                const game = this.game;
                const { zoom } = game.scale;
                const { width, height } = game.scale.parentSize;
                const w = width / zoom;
                const h = height / zoom;

                if (h === prevHeight) {
                    return;
                }
                game.scale.resize(h, h);
            }
        );
    }

    setZoom() {
        const { zoom } = this.game.scale;
        const { width, height } = this.game.scale.parentSize;
        const h = height / zoom;
        for (const scene of this.game.scene.getScenes(false)) {
            if (scene.cameras?.main) {
                scene.cameras.main.setZoom(h / SIZE);
                scene.cameras.main.setOrigin(0, 0);
            }

            // scale text elements resolution
            getAllGameObjects(scene.children).forEach(
                (child) => {
                    if (child.type === "Text") {
                        const { width, height } = scene.sys.game.canvas;
                        child.setStyle({
                            resolution: (height / SIZE) * 1.25 * window.devicePixelRatio,
                        });
                    }
                }
            );
        }
    }
}