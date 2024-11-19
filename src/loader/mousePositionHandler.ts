import { _root } from "@/flash/root";
import { Plugins } from "phaser";

export class MousePositionPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    update() {
        const activePointer = this.game.input.activePointer;
        _root._mouseX = activePointer.x;
        _root._mouseX = activePointer.y;
    }
}