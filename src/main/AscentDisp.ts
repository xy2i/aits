
// You can write more code here

import { _root } from "@/flash/root";

/* START OF COMPILED CODE */

class AscentDisp extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// triangle
		const triangle = scene.add.triangle(0, 3, 0, 15, 7.5, 0, 15, 15);
		triangle.setOrigin(0, 0);
		triangle.isFilled = true;
		triangle.fillColor = 16776960;
		triangle.isStroked = true;
		triangle.strokeColor = 16750848;
		this.add(triangle);

		// text_1
		const text_1 = scene.add.text(22, 1, "", {});
		text_1.text = "0d + 00:00:00";
		text_1.setStyle({ "color": "#ffff00", "fixedHeight": 20, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px", "fontStyle": "bold", "stroke": "#ff9900", "strokeThickness": 1, "shadow.color": "#ff9900", "shadow.blur": 5 });
		text_1.setPadding({"top":4});
		this.add(text_1);

		// overlay
		const overlay = scene.add.rectangle(-1, 0, 170, 20.3);
		overlay.setOrigin(0, 0);
		this.add(overlay);

		this.triangle = triangle;
		this.text_1 = text_1;

		/* START-USER-CTR-CODE */
		// triangle.postFX!.addGlow(16750848, 1, 0, false, 0.1, 5);
		// text_1.postFX!.addGlow(16750848, 1, 0, false, 0.1, 5);

        this.postFX!.addGlow(16750848, 1.25, 0, false, 0.1, 5);
		overlay
			.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup());

		this.scene.events.once("scene-awake", () => {
			if (_root.save.banned <= 0 && _root.saveid < 10) {
				this.setVisible(false);
			}
			this.text_1.text = "+" + _root.save.banned;
		})
		/* END-USER-CTR-CODE */
	}

	private triangle: Phaser.GameObjects.Triangle;
	private text_1: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	pointerover() {
		if (_root.saveid >= 20) {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Challenge Mode</font></b>\nYou\'re currently on Challenge Mode.";
		}
		else if (_root.saveid >= 10) {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Speedrun</font></b>\nYou\'re currently on Speedrun Mode. Reach level 9001 as fast as possible!";
		}
		else {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Ascension</font></b>\nThe number of times you have ascended so far.\n\nClick here to open Ascension menu.";
		}
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerup() {
		console.warn("UNIMPLEMENTED ascension screen")
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { AscentDisp };
