import { Plugins } from "phaser";

import { _root } from "@/flash/root";

export class GlobalClickPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    init() {
        this.game.events.on('destroy', this.destroy, this);
        this.game.canvas.addEventListener('mousedown', (event) => {
            _root.isMouseDown = true;
        });
        this.game.canvas.addEventListener('mouseup', (event) => {
            _root.isMouseDown = false;
        });
    }

    destroy() {
        if (this.game.canvas) {
            this.game.canvas.removeEventListener('mouseDown');
            this.game.canvas.removeEventListener('mouseUp');
        }
        super.destroy();
    }
}