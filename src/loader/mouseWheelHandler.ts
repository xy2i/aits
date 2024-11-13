import { Plugins } from "phaser";

import { _root } from "@/flash/root";

export class GlobalMouseWheelPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    init() {
        this.game.events.on('destroy', this.destroy, this);

        function scrollUp() {
            _root.scrollingDir = -1;
        }
        function scrollDown() {
            _root.scrollingDir = 1;
        }

        // Add wheel event listener to the game canvas
        this.game.canvas.addEventListener('wheel', (event) => {
            const wheelNum = Math.sign(event.deltaY);
            if (wheelNum < 0) {
                scrollUp();
            }
            else if (wheelNum > 0) {
                scrollDown();
            }
        });
    }

    destroy() {
        if (this.game.canvas) {
            this.game.canvas.removeEventListener('wheel');
        }
        super.destroy();
    }
}