
// You can write more code here

import { _root } from "@/flash/root";

/* START OF COMPILED CODE */

class NewsSetting extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// outline
		const outline = scene.add.image(11, 11, "8177");
		outline.scaleX = 0.25;
		outline.scaleY = 0.25;
		this.add(outline);

		/* START-USER-CTR-CODE */
		outline.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	pointerover() {
		_root.actiondescription = "<font color=\'#FFFF00\'><b>Breaking News Config</b></font>\nConfigure what kind of messages you want to see in the Breaking News, in which tabs, and change the colors of messages. These settings apply to all of your savefiles.";
	}
	pointerout() {
		_root.actiondescription = ""
	}
	pointerup() {

		_root.actiondescription = "";
		console.warn("UNIMPLEMENTED optionsScreen.gotoAndStop(25) breaking news config")
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { NewsSetting };
