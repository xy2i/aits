import { _root } from "@/flash/root";
import { convertSecFull } from "@/lib/format";

// You can write more code here
export
	/* START OF COMPILED CODE */

	class RestTimer extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// rest_timer_bg
		const rest_timer_bg = scene.add.image(0, 10, "rest-timer-bg");
		rest_timer_bg.scaleX = 0.25;
		rest_timer_bg.scaleY = 0.25;
		rest_timer_bg.setOrigin(0, 0);
		this.add(rest_timer_bg);

		// label
		const label = scene.add.text(0, 0, "", {});
		label.text = "NOT RESTED";
		label.setStyle({ "align": "center", "color": "#666", "fixedWidth": 102, "fontFamily": "Tempesta Seven Extended", "fontSize": "8px" });
		this.add(label);

		// timeText
		const timeText = scene.add.text(0, 14.85, "", {});
		timeText.text = "0:00:00";
		timeText.setStyle({ "align": "center", "color": "#666", "fixedWidth": 102, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px", "fontStyle": "bold" });
		this.add(timeText);

		// overlay
		const overlay = scene.add.rectangle(0, 0, 102, 32);
		overlay.setOrigin(0, 0);
		this.add(overlay);

		this.label = label;
		this.timeText = timeText;

		/* START-USER-CTR-CODE */
		overlay.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup());
		this.scene.events.on("update", this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	private label: Phaser.GameObjects.Text;
	private timeText: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	pointerover() {
		_root.actiondescription = "<b><font color=\'#FFFF00\'>REST</font></b>\nYou can REST by giving your computer some rest and turn the game off. When you are RESTED, you will gain bonuses.\n\n<font color=\'#FFFF00\'>Click here for more details and to upgrade REST efficiency.</font>";
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerup() {
		console.warn("UNIMPLEMENTED rest options screen")
		// if (_root.optionsScreen._currentframe != 26) {
		// 	_root.optionsScreen.gotoAndStop(26);
		// }
		// else {
		// 	_root.optionsScreen.gotoAndStop(1);
		// }
	}

	update() {
		if (_root.save.restTime > 0) {
			this.styleActive();
			this.timeText.text = convertSecFull(_root.save.restTime);
		}
		else {
			this.styleInactive();
		}
	}

	styleActive() {
		this.label.setColor("#99FF00")
		this.timeText.setColor("#99FF00")
		this.label.text = "RESTED";
	}
	styleInactive() {
		this.label.setColor("#666")
		this.timeText.setColor("#666")
		this.label.text = "NOT RESTED";
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
