
// You can write more code here

import { _root } from "@/flash/root";
import { gainCareerEXP } from "@/lib/career";
import { gainEXP } from "@/lib/exp";
import { withComma } from "@/lib/format";
import { dispNews } from "@/lib/news";

/* START OF COMPILED CODE */

class AdventureReminder extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 2.5);

		// background
		const background = scene.add.rectangle(0, 0, 40, 20);
		background.setOrigin(0, 0);
		background.isFilled = true;
		background.fillColor = 153;
		background.isStroked = true;
		background.strokeColor = 51;
		this.add(background);

		// adventure_reminder_icon
		const adventure_reminder_icon = scene.add.image(10, 10, "adventure-reminder-icon");
		adventure_reminder_icon.scaleX = 0.5;
		adventure_reminder_icon.scaleY = 0.5;
		this.add(adventure_reminder_icon);

		// adventureText
		const adventureText = scene.add.text(15, 0, "", {});
		adventureText.text = "99";
		adventureText.setStyle({ "align": "right", "color": "#00ccff", "fixedWidth": 25, "fixedHeight": 20.3, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px", "fontStyle": "bold" });
		adventureText.setPadding({ "top": 4 });
		this.add(adventureText);

		this.adventureText = adventureText;

		/* START-USER-CTR-CODE */
		adventureText.postFX!.addGlow(0x000000, 2, 0, false, 0.25, 5);

		this.shift = this.scene.input.keyboard?.addKeys("SHIFT");

		background
			.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup());
		this.scene.events.on("update", this.update, this);
		/* END-USER-CTR-CODE */
	}

	private adventureText: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	textCheckDelay = 80;

	update() {
		this.textCheckDelay += 1;
		if (this.textCheckDelay > 200) {
			this.textCheckDelay = 0;
			if (_root.save.awesomeEnergy > 0) {
				this.alpha = 1;
			}
			else {
				this.alpha = .3;
			}
			this.adventureText.text = _root.save.awesomeEnergy;
		}
	}
	pointerover() {
		_root.actiondescription = "<b><font color=\'#FFFF00\'>Adventure Reminder</font></b>\nDisplays your current Adventure Energy.\nIf you are too busy to adventure, you can also Shift + Click the Adventure Reminder to convert all of your remaining Adventure Energy into EXP. It will cost you 500,000 Green Coins.";
		_root.actiondescription += "\n\nEnergy: <b>" + _root.save.awesomeEnergy + "</b>";
		let cexpToEarn = Math.floor(160 + Math.pow(Math.abs(_root.save.awesomeReputation), 0.35));
		let expToEarn = Math.floor((2800 + Math.sqrt(Math.abs(_root.save.awesomeReputation))) * Math.pow(_root.save.level, 0.6) * (_root.save.boost / 100) * (1 + _root.save.petStat[8] * 0.002) * 0.75);
		if (_root.save.permaBanPenalty[12] == 3) {
			expToEarn = Math.floor(expToEarn * 3);
		}
		else if (_root.save.permaBanPenalty[12] == 2) {
			expToEarn = Math.floor(expToEarn * 2.2);
		}
		else if (_root.save.permaBanPenalty[12] == 1) {
			expToEarn = Math.floor(expToEarn * 1.8);
		}
		cexpToEarn *= Math.max(_root.save.awesomeEnergy, 0);
		expToEarn *= Math.max(_root.save.awesomeEnergy, 0);
		if (_root.save.careerActive[10] <= 0 && _root.save.careerBoost[10] <= 0) {
			cexpToEarn = 0;
		}
		_root.actiondescription += "\nEXP: <b>+" + withComma(expToEarn) + "</b>\nCareer EXP: <b>+" + withComma(cexpToEarn) + "</b>";
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerup() {
		if (_root.save.awesomeEnergy > 0 && _root.save.greenCoin >= 500000 && this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.SHIFT].isDown) {
			_root.save.greenCoin -= 500000;
			let cexpToEarn = Math.floor(160 + Math.pow(Math.abs(_root.save.awesomeReputation), 0.35));
			let expToEarn = Math.floor((2800 + Math.sqrt(Math.abs(_root.save.awesomeReputation))) * Math.pow(_root.save.level, 0.6) * (_root.save.boost / 100) * (1 + _root.save.petStat[8] * 0.002) * 0.75);
			if (_root.save.permaBanPenalty[12] == 3) {
				expToEarn = Math.floor(expToEarn * 3);
			}
			else if (_root.save.permaBanPenalty[12] == 2) {
				expToEarn = Math.floor(expToEarn * 2.2);
			}
			else if (_root.save.permaBanPenalty[12] == 1) {
				expToEarn = Math.floor(expToEarn * 1.8);
			}
			cexpToEarn *= Math.max(_root.save.awesomeEnergy, 0);
			expToEarn *= Math.max(_root.save.awesomeEnergy, 0);
			_root.save.awesomeEnergy = 0;
			gainCareerEXP(10, cexpToEarn, true);
			gainEXP(expToEarn, 14);
			dispNews(111, "Converted all Energy into EXP! (+" + withComma(expToEarn) + " EXP)");
			_root.actiondescription = "";
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { AdventureReminder };
