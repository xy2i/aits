
// You can write more code here

import { _root } from "@/flash/root";
import { COIN_SOFTCAP, CoinType } from "@/lib/coin";
import { convertSecCD, withComma } from "@/lib/format";

const OVERCAP = {
	[CoinType.Yellow]: "coinOvercap",
	[CoinType.Green]: "greenCoinOvercap",
	[CoinType.Blue]: "blueCoinOvercap",
}

const COIN_NAME = {
	[CoinType.Yellow]: "Coins",
	[CoinType.Green]: "Green Coins",
	[CoinType.Blue]: "Blue Coins"
}

function timerText(coinType: CoinType): string {
	const coinName = COIN_NAME[coinType];
	const coinSoftcap = withComma(COIN_SOFTCAP[coinType]);
	return `<b><font color=\'#FFFF00\'>Overcap!</font></b>\nYou have over ${coinSoftcap} ${coinName}. If you do not spend your Coins within 5 minutes, you will stop being able to gain more Coins until you have ${coinSoftcap} ${coinName} or below. Please spend ${coinName} until you have ${coinSoftcap} ${coinName} or below to be able to continue gaining more ${coinName}.`
}

function cappedText(coinType: CoinType): string {
	const coinName = COIN_NAME[coinType];
	const coinSoftcap = withComma(COIN_SOFTCAP[coinType]);
	return `<b><font color=\'#FFFF00\'>Overcap!</font></b>\nYou have had over ${coinSoftcap} ${coinName} for more than 5 minutes. Please spend ${coinName} until you have ${coinSoftcap} ${coinName} or below to be able to continue gaining more ${coinName}.`
}

/* START OF COMPILED CODE */

class Overcap extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 5, y ?? 0);

		// triangle
		const triangle = scene.add.triangle(0, 0, 0, 20, 10, 0, 20, 20);
		triangle.setOrigin(0, 0);
		triangle.isFilled = true;
		triangle.fillColor = 16422450;
		this.add(triangle);

		// timer
		const timer = scene.add.text(-5, 10, "", {});
		timer.text = "5:00";
		timer.setStyle({ "align": "center", "fixedWidth": 30, "fontFamily": "Tempesta Seven Extended", "fontSize": "8px", "stroke": "#000000ff", "strokeThickness": 3, "shadow.blur": 2, "shadow.stroke": true });
		this.add(timer);

		// overlay
		const overlay = scene.add.rectangle(-5, 0, 30, 20);
		overlay.setOrigin(0, 0);
		this.add(overlay);

		this.triangle = triangle;
		this.timer = timer;

		/* START-USER-CTR-CODE */
		overlay.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout());
		this.scene.events.on('update', this.update, this);
		/* END-USER-CTR-CODE */

		// custom definition props
		this.coinType = "yellow";
	}

	private triangle: Phaser.GameObjects.Triangle;
	private timer: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	private coinType: CoinType;
	private tim: number;

	update() {
		this.tim = _root.save[OVERCAP[this.coinType]];
		if (this.tim >= 300) {
			this.triangle.fillColor = 0xfa3232;
			this.timer.setStyle({
				"fontFamily": "Tempesta Seven Condensed"
			});
			this.triangle.alpha = 1;
			this.timer.text = "OVER!"
		}
		else if (this.tim > 0) {
			this.triangle.fillColor = 0xfa9632;
			this.timer.setStyle({
				"fontFamily": "Tempesta Seven Extended"
			});
			this.triangle.alpha = 1;
			this.timer.text = convertSecCD(300 - this.tim);
		}
		else {
			this.triangle.alpha = 0;
			this.timer.text = "";
		}
	}

	pointerover() {
		if (this.tim >= 300) {
			_root.actiondescription = cappedText(this.coinType);
		}
		else if (this.tim > 0) {
			_root.actiondescription = timerText(this.coinType);
		}
	}
	pointerout() {
		_root.actiondescription = "";
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Overcap };
