
// You can write more code here

import { _root } from "@/flash/root";
import { withComma } from "@/lib/format";
import { claimReward } from "@/lib/progress-bar";
import { InsideBar, InsideBarKind } from "@/main/insideBar";

export
	/* START OF COMPILED CODE */

	class ProgressBar extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// bg
		const bg = scene.add.rectangle(-2, -2, 24, 204);
		bg.setOrigin(0, 0);
		bg.isFilled = true;
		bg.fillColor = 0;
		bg.strokeColor = 0;
		bg.lineWidth = 2;
		this.add(bg);

		// bg_color
		const bg_color = scene.add.rectangle(0, 0, 20, 200);
		bg_color.setOrigin(0, 0);
		bg_color.isFilled = true;
		bg_color.fillColor = 1315880;
		bg_color.strokeColor = 0;
		bg_color.lineWidth = 2;
		this.add(bg_color);

		// insideBar
		const insideBar = new InsideBar(scene, 0, 200);
		insideBar.angle = -90;
		this.add(insideBar);

		// insideBar2
		const insideBar2 = new InsideBar(scene, 0, 200);
		insideBar2.angle = -90;
		this.add(insideBar2);

		// insideBar3
		const insideBar3 = new InsideBar(scene, 0, 200);
		insideBar3.angle = -90;
		this.add(insideBar3);

		// insideBar4
		const insideBar4 = new InsideBar(scene, 0, 200);
		insideBar4.angle = -90;
		this.add(insideBar4);

		// textBox
		const textBox = scene.add.text(0, 200, "", {});
		textBox.angle = -90;
		textBox.text = "50%";
		textBox.setStyle({ "align": "center", "color": "#ccffffff", "fixedWidth": 200, "fontFamily": "Noto Sans JP", "fontSize": "14px", "stroke": "" });
		textBox.setPadding({ "top": 2 });
		this.add(textBox);

		this.insideBar = insideBar;
		this.insideBar2 = insideBar2;
		this.insideBar3 = insideBar3;
		this.insideBar4 = insideBar4;
		this.textBox = textBox;

		/* START-USER-CTR-CODE */
		bg.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.pointerover())
			.on('pointerout', () => this.pointerout())
			.on('pointerdown', () => this.pointerdown());

		this.scene.input.keyboard?.on("keydown", () => this.keydown());

		this.scene.events.once('scene-awake', () => {
			this.insideBar.show(InsideBarKind.Blue);
			this.insideBar2.show(InsideBarKind.LightBlue);
			this.insideBar3.show(InsideBarKind.LightestBlue);
			this.insideBar4.show(InsideBarKind.LightBlue);
		});
		this.scene.events.on("update", this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	public insideBar: InsideBar;
	public insideBar2: InsideBar;
	public insideBar3: InsideBar;
	public insideBar4: InsideBar;
	private textBox: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	pow = 0;
	delay = 0;
	numberdisp = '0%';

	pointerover() {
		_root.actiondescription = "<b><font color=\'#FFFF00\'>Progress Bar</font></b>\nWhen the Progress Bar is full, do anything to claim your reward. Or you can turn Idle Mode on to claim rewards automatically.\n\nProgress Bar Speed:\n<b>" + _root.save.progSpeedAuto + "%</b> (Idle Mode ON)\n<b>" + _root.save.progSpeedManual + "%</b> (Idle Mode OFF)\n\nEpic Skills: <b>" + _root.totalEpicSkill + "</b>\nEquipped Module Slots: <b>" + _root.moduleSlotOccupied + "</b> / 9\nProgress Capacity: <b>" + withComma(_root.save.progStore) + "%</b>\nReward Multiplier: <b>" + withComma((1 + _root.achRedCoin / 10000 + _root.save.petBestLevel / 100 + (_root.save.mainQuestC * 1 + _root.save.mainQuestB * 3 + _root.save.mainQuestA * 6 + _root.save.mainQuestS * 10) / 2500) * 100) + "%</b>\n\nIncrease reward from Progress Bar by finishing Achievements, Main Quests, and by raising a Pet.\n\n<font color=\'#FFFF00\'>Click here to upgrade Progress Bar Speed, Epic Skills or change Progress Bar Modules.</font>";
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerdown() {
		_root.save.progTutorial = true;
		_root.cursoridle = 0;
		console.warn("UNIMPLEMENTED progressBar options")
		// if(_root.optionsScreen._currentframe != 20)
		// {
		//    _root.optionsScreen.gotoAndStop(20);
		// }
		// else
		// {
		//    _root.optionsScreen.gotoAndStop(1);
		// }
	}
	keydown() {
		if (_root.cursoridle < 600) {
			_root.cursoridle = 0;
		}
	}
	update() {
		this.delay += 1;
		this.numberdisp = Math.floor(_root.progPercent) + "%";
		if (this.delay >= 2) {
			this.delay = 0;
			if (_root._quality == "BEST" || _root._quality == "HIGH") {
				// console.warn("UNIMPLEMENTED progress bar glow")
				//   glow2 = new flash.filters.GlowFilter(65535,40,5,5,pow,1,false,false);
				//   filters = [glow2];
			}
		}
		let ibf = InsideBarKind.Blue;
		let ibt;
		if (_root.progPercent >= 100) {
			if (_root._quality == "BEST" || _root._quality == "HIGH") {
				this.pow = 1;
			}
			this.numberdisp = "Ready!";
		}
		if (_root.progPercent >= 200) {
			this.numberdisp = "Ready! [" + withComma(Math.floor(_root.progPercent / 100)) + "]";
		}
		if (_root.save.idleMode == true) {
			ibf = InsideBarKind.LightGreen;
		}
		if (_root.save.rewardBotTime > 0) {
			ibt = 10 + _root.save.progStore * 0.01;
			if (_root.cursoridle >= ibt) {
				ibf = InsideBarKind.LightGreen;
			}
			if (_root.cursoridle >= ibt && _root.cursoridle < ibt + 5) {
				this.numberdisp = "IDLEBOT ACTIVATED";
			}
			else if (_root.cursoridle > ibt / 2 && _root.cursoridle < ibt) {
				this.numberdisp = "Idlebot activating in " + Math.floor(ibt - _root.cursoridle) + "s";
			}
		}
		if (_root.progPercent >= 100) {
			if (_root.cursoridle < 0.5 || _root.save.rewardBotTime > 0 || _root.save.idleMode == true) {
				claimReward();
			}
		}
		this.insideBar.scaleX = _root.progPercent / 100;
		if (_root.progPercent > 100) {
			this.insideBar.scaleX = 1;
			if (_root.progPercent >= _root.save.progStore) {
				this.insideBar2.scaleX = 0;
				this.insideBar3.scaleX = 1;
				this.insideBar4.scaleX = 0;
			}
			else if (_root.progPercent % 200 > 100) {
				this.insideBar2.scaleX = 0;
				this.insideBar4.scaleX = (_root.progPercent % 200 - 100) / 100;
				if (_root.progPercent > 300) {
					this.insideBar3.scaleX = 1;
				}
				else {
					this.insideBar3.scaleX = 0;
				}
			}
			else {
				this.insideBar2.scaleX = 1;
				this.insideBar3.scaleX = (_root.progPercent % 200) / 100;
				this.insideBar4.scaleX = 0;
			}
		}
		else {
			this.insideBar2.scaleX = 0;
			this.insideBar3.scaleX = 0;
			this.insideBar4.scaleX = 0;
		}
		if (_root.save.rewardBotTime > 0) {
			ibt = 10 + _root.save.progStore * 0.01;
			if (_root.cursoridle >= ibt) {
				this.insideBar2.scaleX = this.insideBar.scaleX;
				if (this.insideBar2.scaleX > 0.5) {
					this.insideBar2.scaleX = 0.5;
				}
			}
		}
		if (this.pow > 0) {
			this.pow -= 0.1;
		}
		this.insideBar2.scaleX = this.insideBar2.scaleX;
		this.insideBar3.scaleX = this.insideBar3.scaleX;
		this.insideBar.show(ibf);
		this.textBox.text = this.numberdisp;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
