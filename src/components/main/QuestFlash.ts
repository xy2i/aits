
// You can write more code here

import { _root } from "@/flash/root";

export
	/* START OF COMPILED CODE */

	class QuestFlash extends Phaser.GameObjects.Rectangle {

	constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number) {
		super(scene, x ?? 0, y ?? 0, width ?? 50, height ?? 20);

		this.setOrigin(0, 0);
		this.isFilled = true;
		this.fillAlpha = 0.3;

		/* START-USER-CTR-CODE */
		this.alpha = 0;
		this.scene.events.on("update", this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	flashing = false;
	time = 0;
	del = 0;

	update() {
		this.del += 1;
		if (this.del >= 20) {
			this.del = 0;
			if (_root.save.questCount >= _root.save.questNeed) {
				this.flashing = true;
			}
			else if (this.alpha == 0) {
				this.flashing = false;
			}
			if (this.flashing == true) {
				this.time += 1;
				if (this.time >= 1) {
					this.alpha = 1;
				}
				if (this.time >= 2) {
					this.alpha = 0;
					this.time = 0;
				}
			}
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
