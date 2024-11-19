
// You can write more code here

import { _root } from "@/flash/root";

/* START OF COMPILED CODE */

class ActionDescription extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// ad
		const ad = scene.add.container(-191, 0);
		this.add(ad);

		// box1
		const box1 = scene.add.rectangle(0, 0, 190, 100);
		box1.name = "box1";
		box1.setOrigin(0, 0);
		box1.isFilled = true;
		box1.fillColor = 197413;
		box1.fillAlpha = 0.9;
		box1.isStroked = true;
		box1.strokeColor = 255;
		ad.add(box1);

		// box2
		const box2 = scene.add.rectangle(-191, 0, 190, 100);
		box2.name = "box2";
		box2.setOrigin(0, 0);
		box2.isFilled = true;
		box2.fillColor = 2425603;
		box2.fillAlpha = 0.9;
		box2.isStroked = true;
		box2.strokeColor = 16711680;
		ad.add(box2);

		this.box1 = box1;
		this.box2 = box2;
		this.ad = ad;

		/* START-USER-CTR-CODE */

		this.text1 = this.scene.add.dom(0, 0, "div",
			`user-select: none;
			font-family: "Tempesta Seven";
			width: 190px;
			text-align: center;
			white-space: pre-line;
			font-size: 8px;`,
			"").setOrigin(0, 0);
		this.text1.name = "text1";
		this.text1.pointerEvents = "none";
		ad.add(this.text1);
		this.text2 = this.scene.add.dom(-191, 0, "div",
			`user-select: none;
			font-family: "Tempesta Seven";
			width: 190px;
			text-align: center;
			white-space: pre-line;
			font-size: 8px;`,
			"").setOrigin(0, 0);
		this.text2.name = "text1";
		this.text2.pointerEvents = "none";
		ad.add(this.text2);
		this.scene.events.once("scene-awake", () => {
			this.adX = this.scene.game.input.activePointer.x;
			this.adY = this.scene.game.input.activePointer.y;
			_root.actiondescription = "";
			_root.actiondescription2 = "";
		});

		this.scene.events.on('update', this.update, this);
		/* END-USER-CTR-CODE */
	}

	private box1: Phaser.GameObjects.Rectangle;
	private box2: Phaser.GameObjects.Rectangle;
	private ad: Phaser.GameObjects.Container;

	/* START-USER-CODE */
	text1: Phaser.GameObjects.DOMElement;
	text2: Phaser.GameObjects.DOMElement;
	adX: number;
	adY: number;

	checkMouse() {
		let tX = Math.round(_root._xmouse);
		let tY = Math.round(_root._ymouse);
		if (this.x != tX || this.y != tY) {
			if (tX > 0 && tX < 650 && tY > 0 && tY < 670) {
				if (_root.cursoridle < 600) {
					_root.cursoridle = 0;
				}
				this.x = tX;
				this.y = tY;
			}
		}
	}

	checkDesc() {
		let adL;
		let tY = Math.round(_root._ymouse);
		if (_root.actiondescription2 == "") {
			if (this.x > 450) {
				this.adX = -190;
			}
			else {
				this.adX = 15;
			}
		}
		else if (this.x > 450) {
			this.adX = -190;
			adL = true;
		}
		else if (this.x > 260) {
			this.adX = 15;
			adL = true;
		}
		else {
			this.adX = 15;
			adL = false;
		}
		const adHeight = this.ad.getBounds().height;
		if (adHeight > 0) {
			if (this.y > adHeight) {
				this.adY = -1 * adHeight;
			}
			else {
				this.adY = 15;
			}
		}
		if (this.adY > 650 - tY - adHeight) {
			this.adY = 650 - tY - adHeight;
		}
		this.ad.x = this.adX;
		this.ad.y = this.adY;
		let fr;
		const box1 = this.ad.getByName("box1");
		const box2 = this.ad.getByName("box2")
		if (_root.actiondescription2 != "") {
			box1.alpha = 1;
			this.text1.setVisible(true);
			box2.alpha = 1;
			this.text2.setVisible(true);
			fr = 1;
		}
		else if (_root.actiondescription != "") {
			box1.alpha = 1;
			this.text1.setVisible(true);
			box2.alpha = 0;
			this.text2.setVisible(false);
			fr = 2;
		}
		else if (_root.actiondescription == "") {
			box1.alpha = 0;
			this.text1.setVisible(false);
			box2.alpha = 0;
			this.text2.setVisible(false);
			fr = 3;
		}
		if (fr != 3) {
			this.text1.setHTML(_root.actiondescription);
			box1.displayHeight = this.text1.displayHeight;
			this.text2.setHTML(_root.actiondescription2);
			box2.displayHeight = this.text2.displayHeight;
		}
		if (fr == 1) {
			if (adL == true) {
				box2.x = -191;
				this.text2.x = -191;
			}
			else {
				box2.x = 191;
				this.text2.x = 191;
			}
		}
	}

	update() {
		_root._xmouse = this.scene.game.input.activePointer.x;
		_root._ymouse = this.scene.game.input.activePointer.y;
		this.checkMouse();
		this.checkDesc();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { ActionDescription };
