
// You can write more code here

import { _root } from "@/flash/root";
import { Display } from "phaser";

const COIN_STYLES = {
	yellow: { main: 0xff9900, secondary: 0xffff00, label: "Y" },
	green: { main: 0x009900, secondary: 0x00ff00, label: "G" },
	blue: { main: 0x0000ff, secondary: 0x0099ff, label: "B" },
};

const DESCRIPTION = {
	yellow: "<b><font color=\'#FFFF00\'>Coin</font></b>\nThe main currency in Anti-Idle: The Game. Needed to buy most features and many other important things in the game.\n\nCoins become a lot easier to get as you level up.",
	green: "<b><font color=\'#FFFF00\'>Green Coin</font></b>\nNeeded for many important upgrades and certain items.\n\nGreen Coins can be obtained from the Progress Bar and most features in the game, though, they are less common.",
	blue: "<b><font color=\'#FFFF00\'>Blue Coin</font></b>\nNeeded for many useful items in the Mystery Shop.\n\nBlue Coins are very hard to find. You can get more Blue Coins from quests and by not idling.",
}

/* START OF COMPILED CODE */

class Coin extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// back
		const back = scene.add.ellipse(0, 0, 25, 25);
		back.setOrigin(0, 0);
		back.isFilled = true;
		back.fillColor = 16776960;
		back.strokeColor = 16750848;
		this.add(back);

		// outerRing
		const outerRing = scene.add.ellipse(0, 0, 25, 25);
		outerRing.setOrigin(0, 0);
		outerRing.isStroked = true;
		outerRing.strokeColor = 16750848;
		this.add(outerRing);

		// innerRing
		const innerRing = scene.add.ellipse(2, 2, 21, 21);
		innerRing.setOrigin(0, 0);
		innerRing.isStroked = true;
		innerRing.strokeColor = 16750848;
		this.add(innerRing);

		// text
		const text = scene.add.text(9, 8, "", {});
		text.text = "Y";
		text.setStyle({ "color": "#ff9900", "fontFamily": "Tempesta Seven", "fontSize": "10px", "fontStyle": "bold" });
		this.add(text);

		/* START-USER-CTR-CODE */
		back.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout());

		this.scene.events.once("scene-awake", () => {
			const { main, secondary, label } = COIN_STYLES[this.coinType];
			text.text = label;
			text.setColor(Display.Color.ValueToColor(main).rgba);
			outerRing.strokeColor = main;
			innerRing.strokeColor = main;
			back.fillColor = secondary;
		});
		/* END-USER-CTR-CODE */
	}

	public coinType: "yellow" | "green" | "blue" | "white" = "yellow";

	/* START-USER-CODE */
	pointerover() {
		_root.actiondescription = DESCRIPTION[this.coinType];
	}
	pointerout() {
		_root.actiondescription = "";
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Coin };
