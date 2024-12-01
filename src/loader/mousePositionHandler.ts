import { _root } from "@/flash/root";
import { Plugins } from "phaser";

export class MousePositionPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    update() {
        const { width, height } = this.scene.sys.game.canvas;
        const { x, y } = this.game.input.activePointer;
        const zoom = this.scene.cameras.main.zoom;
        _root._xmouse = x / zoom;
        _root._ymouse = y / zoom;
    }
}