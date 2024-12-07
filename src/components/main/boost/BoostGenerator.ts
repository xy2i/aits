
// You can write more code here

import { _root } from "@/flash/root";
export
	/* START OF COMPILED CODE */

	class BoostGenerator extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "boost-generator", frame);

		this.scaleX = 0.25;
		this.scaleY = 0.25;

		/* START-USER-CTR-CODE */
		this.postFX!.addGlow(0xffffff, 1, 0, false, 0.1, 5 * this.scene.cameras.main.zoom);

		this.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.pointerover())
			.on('pointerout', () => this.pointerout())
			.on('pointerdown', () => this.pointerdown());

		this.scene.events.on("update", this.update, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	pointerover() {
		_root.actiondescription = "<b><font color=\'#FFFF00\'>Boost Generator</font></b>\nIf you have <b>Boost Generator</b> in the Feature Shop purchased, you can click this button to refill or upgrade your Boost. Don\'t forget, Boost is very important!";
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerdown() {
		if (_root.save.featureBoostGen == true) {
			console.warn("UNIMPLEMENTED boost options");
			// if (_root.optionsScreen._currentframe != 4) {
			// 	_root.optionsScreen.gotoAndStop(4);
			// }
			// else {
			// 	_root.optionsScreen.gotoAndStop(1);
			// }
		}
		else {
			_root.showPopup("Boost Generator needed!", "You have to purchase the Boost Generator to buy Boost! The Boost Generator can be purchased in the Feature Shop.");
		}
	}
	update() {
		// console.warn("UNIMPLEMENTED boost refill notice")
		// 	if(_root.save.featureBoostGen == true)
		// 		{
		// 		   if(_root.save.boost < _root.boostMax - 50)
		// 		   {
		// 			  gotoAndStop(2);
		// 		   }
		// 		   else
		// 		   {
		// 			  gotoAndStop(1);
		// 		   }
		// 		}
		// 		else
		// 		{
		// 		   gotoAndStop(1);
		// 		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
