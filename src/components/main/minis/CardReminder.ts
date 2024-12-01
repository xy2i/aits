
// You can write more code here

import { _root } from "@/flash/root";
import { convertSecFull } from "@/lib/format";

/* START OF COMPILED CODE */

class CardReminder extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 2.5);

		// background
		const background = scene.add.rectangle(0, 0, 40, 20);
		background.setOrigin(0, 0);
		background.isFilled = true;
		background.fillColor = 39168;
		background.isStroked = true;
		background.strokeColor = 13056;
		this.add(background);

		// card_reminder_icon
		const card_reminder_icon = scene.add.image(7, 9, "card-reminder-icon");
		card_reminder_icon.scaleX = 0.25;
		card_reminder_icon.scaleY = 0.25;
		this.add(card_reminder_icon);

		// cardText
		const cardText = scene.add.text(15, 0, "", {});
		cardText.text = "99";
		cardText.setStyle({ "align": "right", "color": "#00ff00", "fixedWidth": 25, "fixedHeight": 20.3, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px", "fontStyle": "bold" });
		cardText.setPadding({ "top": 4 });
		this.add(cardText);

		this.cardText = cardText;

		/* START-USER-CTR-CODE */
		cardText.postFX!.addGlow(0x000000, 2, 0, false, 0.25, 5);
		background
			.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup());

		this.scene.events.on("update", this.update, this);
		/* END-USER-CTR-CODE */
	}

	private cardText: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	checkDelay = 80;
	tempDesc = "";

	pointerover() {
		_root.actiondescription = "<b><font color=\'#FFFF00\'>Cards</font></b>\n" + this.tempDesc;
	}
	pointerout() {
		_root.actiondescription = "";
	}
	update() {
		this.checkDelay += 1;
		if (this.checkDelay > 80) {
			if (_root.save.featureCardToolbar == true) {
				this.setVisible(true);
				let cardActivated = 0;
				this.tempDesc = "<font color=\'#FFFF00\'>";
				if (_root.save.doubleExpTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\n1.5x EXP: <b>" + convertSecFull(_root.save.doubleExpTime) + "</b>";
				}
				if (_root.save.doubleCoinTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\n1.5x Coin: <b>" + convertSecFull(_root.save.doubleCoinTime) + "</b>";
				}
				this.tempDesc += "</font><font color=\'#BBDDFF\'>";
				if (_root.save.rewardBotTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nIdlebot: <b>" + convertSecFull(_root.save.rewardBotTime) + "</b>";
				}
				if (_root.save.autoHarvestTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nAutoharvest: <b>" + convertSecFull(_root.save.autoHarvestTime) + "</b>";
				}
				if (_root.save.batteryChargerTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nBattery Charger: <b>" + convertSecFull(_root.save.batteryChargerTime) + "</b>";
				}
				if (_root.save.demandMasterTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nDemand Master: <b>" + convertSecFull(_root.save.demandMasterTime) + "</b>";
				}
				if (_root.save.quickAdventuresTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nQuick Adventures: <b>" + convertSecFull(_root.save.quickAdventuresTime) + "</b>";
				}
				this.tempDesc += "</font><font color=\'#CCFF99\'>";
				if (_root.save.eliteButtonTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nInvincibility Stars: <b>" + convertSecFull(_root.save.eliteButtonTime) + "</b>";
				}
				if (_root.save.stadiumProTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nStadium Pro: <b>" + convertSecFull(_root.save.stadiumProTime) + "</b>";
				}
				if (_root.save.powerUserTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nFCG Power User: <b>" + convertSecFull(_root.save.powerUserTime) + "</b>";
				}
				if (_root.save.eliteFisherTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nElite Fisher: <b>" + convertSecFull(_root.save.eliteFisherTime) + "</b>";
				}
				this.tempDesc += "</font><font color=\'#FFCC99\'>";
				if (_root.save.noAntsTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\nAuto Ant Spray: <b>" + convertSecFull(_root.save.noAntsTime) + "</b>";
				}
				if (_root.save.doubleQuestTime > 0) {
					cardActivated += 1;
					this.tempDesc += "\n2x Quest Reward: <b>" + convertSecFull(_root.save.doubleQuestTime) + "</b>";
				}
				this.tempDesc += "</font>";
				if (cardActivated > 0) {
					this.alpha = 1;
				}
				else {
					this.alpha = .3;
				}
				this.cardText.text = cardActivated;
			}
			else {
				this.setVisible(false);
			}
			this.checkDelay = 0;
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { CardReminder };
