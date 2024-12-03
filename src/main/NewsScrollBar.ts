
// You can write more code here

import { _root } from "@/flash/root";

/* START OF COMPILED CODE */

class NewsScrollBar extends Phaser.GameObjects.Rectangle {

	constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number) {
		super(scene, x ?? 0, y ?? 0, width ?? 20, height ?? 14);

		this.setOrigin(0, 0);
		this.isFilled = true;
		this.fillColor = 6579300;
		this.isStroked = true;
		this.strokeColor = 0;
		this.lineWidth = 2;

		/* START-USER-CTR-CODE */
		this.setInteractive({ useHandCursor: true })
			.on("pointerdown", () => this.pointerdown());
		// release handled globally, since mouse can be outside
		// of scrollbar, see _root.isMouseDown
		this.scene.events.once("scene-awake", () => {
			this.baseY = this.getTopLeft(null, true).y;
		})
		this.scene.events.on('update', this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	baseY: number;
	dragging: boolean = false;

	pointerdown() {
		this.dragging = true;
	}

	update() {
		if (!_root.isMouseDown) {
			this.dragging = false;
		}
		if (_root._ymouse >= this.baseY - 40 && _root._ymouse <= this.baseY + 65 && _root._xmouse < 500 /*&& _root.optionsScreen._currentframe == 1*/) {
			//console.warn("UNIMPLEMENTED optionsScreen_currentFrame check for scrollbar");
			if (_root.scrollingDir == 1) {
				if (_root.breakoffset < 26) {
					_root.breakoffset += 1;
					_root.updateBreakNews = 1;
				}
			}
			else if (_root.scrollingDir == -1) {
				if (_root.breakoffset > 0) {
					_root.breakoffset -= 1;
					_root.updateBreakNews = 1;
				}
			}
		}
		if (this.dragging == true) {
			this.y = Math.round((40 - this.baseY) + _root._ymouse - 5);
			if (this.y < 40) {
				this.y = 40;
			}
			if (this.y > 66) {
				this.y = 66;
			}
			const tempOff = this.y - 40;
			if (_root.breakoffset != tempOff) {
				_root.breakoffset = tempOff;
				_root.updateBreakNews = 1;
			}
		}
		else {
			this.y = 40 + _root.breakoffset;
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { NewsScrollBar };
