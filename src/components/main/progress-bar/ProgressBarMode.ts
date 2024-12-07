import { _root } from "@/flash/root";

// You can write more code here
export
	/* START OF COMPILED CODE */

	class ProgressBarMode extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// bg
		const bg = scene.add.rectangle(0, 1, 100, 20);
		bg.setOrigin(0, 0);
		bg.isFilled = true;
		bg.fillColor = 8355839;
		bg.fillAlpha = 0.5;
		bg.isStroked = true;
		bg.strokeColor = 0;
		bg.lineWidth = 2;
		this.add(bg);

		// rectangle
		const rectangle = scene.add.rectangle(0, 21, 100, 15);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.fillColor = 0;
		rectangle.isStroked = true;
		rectangle.strokeColor = 0;
		rectangle.lineWidth = 2;
		this.add(rectangle);

		// onoff
		const onoff = scene.add.text(1, 23, "", {});
		onoff.text = "OFF";
		onoff.setStyle({ "align": "center", "color": "#666666", "fixedWidth": 100, "fontFamily": "Tempesta Seven", "fontSize": "10px", "fontStyle": "bold" });
		this.add(onoff);

		// mode
		const mode = scene.add.text(1, 5, "", {});
		mode.text = "Idle Mode";
		mode.setStyle({ "align": "center", "color": "#333366", "fixedWidth": 100, "fontFamily": "Tempesta Seven", "fontSize": "10px", "fontStyle": "bold" });
		this.add(mode);

		// outline
		const outline = scene.add.rectangle(0, 0, 100, 35);
		outline.setOrigin(0, 0);
		outline.fillColor = 0;
		outline.isStroked = true;
		outline.strokeColor = 0;
		outline.lineWidth = 2;
		this.add(outline);

		this.bg = bg;
		this.onoff = onoff;
		this.mode = mode;

		/* START-USER-CTR-CODE */
		outline.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup());
		this.scene.events.once("scene-awake", () => {
			if (_root.save.idleMode == false) {
				this.styleIdleOff()
			}
			else if (_root.save.idleMode == true) {
				this.styleIdleOn();
			}
		});
		this.scene.events.on("update", this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	private bg: Phaser.GameObjects.Rectangle;
	private onoff: Phaser.GameObjects.Text;
	private mode: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	pointerover() {
		if (_root.save.rewardBotTime > 0) {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Idlebot is Working!</font></b>\nIdlebot will turn Idle Mode ON/OFF automatically depending on whether or not you are active. Even when inactive, the first half of the Progress Bar is filled at Idle Mode OFF speed!";
		}
		else if (_root.save.featureIdleMode == true) {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Idle Mode</font></b>\nWhen Idle Mode is ON, you don\'t have to interact with the keyboard or mouse to claim rewards from the Progress Bar. However, when Idle Mode is OFF, the Progress Bar fills more quickly.\n\nYou can click this button to turn Idle Mode ON/OFF.";
		}
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerup() {
		if (_root.save.featureIdleMode == true && _root.save.idleMode == false && _root.save.rewardClaim >= 5 && _root.save.rewardBotTime <= 0) {
			_root.save.idleMode = true;
		}
		else if (_root.save.featureIdleMode == true && _root.save.idleMode == true) {
			_root.save.idleMode = false;
		}
		else if (_root.save.rewardBotTime <= 0) {
			if (_root.save.rewardClaim >= 5) {
				_root.showPopup("Buy Idle Mode now!", "You have to purchase Idle Mode in the shop.");
			}
			else {
				_root.showPopup("Not ready yet!", "You have to claim 5 rewards before you turn Idle Mode on.");
			}
		}
	}

	update() {
		if (_root.save.featureIdleMode == false && _root.save.rewardBotTime <= 0) {
			this.styleLocked();
		}
		else if (_root.save.rewardBotTime > 0) {
			if (_root.save.idleMode == false) {
				this.styleAutoGray();
			}
			else {
				this.styleAutoWhite();
			}
		}
		else if (_root.save.idleMode == false) {
			this.styleIdleOff();
		}
		else if (_root.save.idleMode == true) {
			this.styleIdleOn();
		}
	}

	styleIdleOff() {
		this.mode.setColor("#333366");
		this.bg.fillColor = 0x7F7FFF;
		this.bg.fillAlpha = 0.5;
		this.onoff.text = "OFF";
		this.onoff.setColor("#666666");
	}
	styleIdleOn() {
		this.mode.setColor("#006600");
		this.bg.fillColor = 0x99FF00;
		this.bg.fillAlpha = 0.8;
		this.onoff.text = "ON";
		this.onoff.setColor("#fff");
	}
	styleLocked() {
		this.mode.setColor("#000000");
		this.bg.fillColor = 0x1E1E2D;
		this.bg.fillAlpha = 0.8;
		this.onoff.text = "LOCKED";
		this.onoff.setColor("#fff");
	}
	styleAutoGray() {
		this.mode.setColor("#666600");
		this.bg.fillColor = 0xFFFF00;
		this.bg.fillAlpha = 0.5;
		this.onoff.text = "AUTO";
		this.onoff.setColor("#666666");
	}
	styleAutoWhite() {
		this.mode.setColor("#666600");
		this.bg.fillColor = 0xFFFF00;
		this.bg.fillAlpha = 0.5;
		this.onoff.text = "AUTO";
		this.onoff.setColor("#fff");
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
