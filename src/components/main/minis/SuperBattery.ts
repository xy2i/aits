import { Battery } from "@/components/printer/Battery";
import { _root } from "@/flash/root";
// You can write more code here

/* START OF COMPILED CODE */

class SuperBattery extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// battery
		const battery = new Battery(scene, 0, 0);
		battery.scaleX = 0.5;
		battery.scaleY = 0.5;
		this.add(battery);

		// overlay
		const overlay = scene.add.rectangle(0, 0, 51, 21);
		overlay.setOrigin(0, 0);
		this.add(overlay);

		/* START-USER-CTR-CODE */
		overlay.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup())
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	pointerover() {
		_root.actiondescription = "<b><font color=\'#FFFF00\'>Super Battery</font></b>\nAllows you to charge your Money Printer everywhere. Isn\'t it convenient? It also gives your battery extra charges, which means more and faster Coins. Just like the Mini Garden, it costs you 2 Green Coins. But it\'s not like charging from the Money Printer screen doesn\'t cost 2 Green Coins anyway.";
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerup() {
		if (_root.save.greenCoin >= 2) {
			_root.save.greenCoin -= 2;
			if (_root.save.printerCharge < 160) {
				_root.save.totalPrinterCharge += 160 - _root.save.printerCharge;
				_root.save.printerCharge = 160;
			}
			if (_root.save.printerCharge < 200 && _root.save.featureSuperBattery == true) {
				_root.save.totalPrinterCharge += 200 - _root.save.printerCharge;
				_root.save.printerCharge = 200;
			}
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { SuperBattery };
