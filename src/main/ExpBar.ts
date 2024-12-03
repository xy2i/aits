import { _root } from "@/flash/root";
import { withComma } from "@/lib/format";
import { dispNews } from "@/lib/news";
import { InsideBar } from "./InsideBar";

// You can write more code here

/* START OF COMPILED CODE */

class ExpBar extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? -2.5);

		// background
		const background = scene.add.rectangle(0, 0, 200, 20);
		background.setOrigin(0, 0);
		background.isFilled = true;
		background.fillColor = 1320980;
		this.add(background);

		// insidebar
		const insidebar = new InsideBar(scene, 0, 0);
		this.add(insidebar);

		// numberdisp
		const numberdisp = scene.add.text(0, -4, "", {});
		numberdisp.text = "0";
		numberdisp.setStyle({ "align": "center", "color": "#00ff00", "fixedWidth": 200, "fixedHeight": 24.75, "fontFamily": "Noto Sans JP", "fontSize": "14px", "stroke": "#000", "strokeThickness": 3, "shadow.blur": 1, "shadow.stroke": true });
		numberdisp.setPadding({"top":4});
		this.add(numberdisp);

		// blackOutline
		const blackOutline = scene.add.rectangle(0, 0, 200, 20);
		blackOutline.setOrigin(0, 0);
		blackOutline.fillColor = 0;
		blackOutline.isStroked = true;
		blackOutline.strokeColor = 0;
		blackOutline.lineWidth = 2;
		this.add(blackOutline);

		this.background = background;
		this.insidebar = insidebar;
		this.numberdisp = numberdisp;

		/* START-USER-CTR-CODE */
		this.numberdisp.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.pointerover())
			.on('pointerout', () => this.pointerout())
			.on('pointerup', () => this.pointerup());

		this.scene.events.on('update', this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	private background: Phaser.GameObjects.Rectangle;
	private insidebar: InsideBar;
	private numberdisp: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	pow = 0;

	pointerover() {
		_root.actiondescription = "<b><font color=\'#FFFF00\'>EXP</font></b>\nWhen you gain enough EXP, you level up!";
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerup() {
		_root.save.experienced += 1;
		if (_root.save.level < 9002) {
			dispNews(167, withComma(_root.requiredExp - _root.save.currentExp) + " more EXP required to level up.");
			dispNews(167, "Current Level Progress: " + withComma(_root.save.currentExp) + " / " + withComma(_root.requiredExp) + " [" + Math.floor(_root.save.currentExp / _root.requiredExp * 10000) / 100 + "%]");
		}
		else {
			dispNews(167, "You are at the level cap! Congratulations!");
		}
		dispNews(167, "Level: " + _root.save.level + " | EXP: " + withComma(_root.finalExp) + " / " + withComma(_root.save.totalExp + _root.requiredExp));
	}
	update() {
		if (_root.saveid >= 20 && _root.save.challengeToken == Math.floor(_root.saveid * (_root.saveid + 1) * (_root.saveid - 7) * 156.4)) {
			this.numberdisp.text = "COMPLETE!";
		}
		else if (this.numberdisp.text != withComma(_root.finalExp)) {
			/// TODO glow effect on bar when exp gain
			// if (_root._quality == "BEST") {
			// 	this.pow = 1;
			// 	glow2 = new flash.filters.GlowFilter(65280, 40, 5, 5, pow, 1, false, false);
			// 	filters = [glow2];
			// }
			this.numberdisp.text = withComma(_root.finalExp);
			if (_root.eventName == "April Fools") {
				this.numberdisp.text = withComma(_root.finalExp * 3);
			}
		}
		this.insidebar.scaleX = _root.save.currentExp / _root.requiredExp;
		if (_root.save.level == 9002) {
			this.insidebar.scaleX = 1;
			if (_root.saveid != 4) {
				/// TODO shiny expbar
				// insideBar.gotoAndStop(8);
				// pbShiny.gotoAndStop(2);
			}
		}
		else if (_root.save.bestLevel == 9002) {
			if (_root.saveid != 4) {
				/// TODO 9002 bar
				// insideBar.gotoAndStop(9);
				// pbShiny.gotoAndStop(2);
			}
		}
		if (this.pow > 0) {
			/// TODO glow
			// pow -= 0.05;
			// glow2 = new flash.filters.GlowFilter(65280, 40, 5, 5, pow, 1, false, false);
			// filters = [glow2];
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { ExpBar };
