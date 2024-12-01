
// You can write more code here

const ACTIVE_COLORS = {
	"exp": "#00ff00",
	"coin": "#ffff00",
}
const LABEL = {
	"exp": "EXP",
	"coin": "Coin",
}

export
	/* START OF COMPILED CODE */

class CardTimer extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// card_timer_bg
		const card_timer_bg = scene.add.image(23, 20, "card-timer-bg");
		card_timer_bg.scaleX = 0.25;
		card_timer_bg.scaleY = 0.25;
		this.add(card_timer_bg);

		// label
		const label = scene.add.text(0, 0, "", {});
		label.text = "1.5x EXP";
		label.setStyle({ "color": "#666", "fixedWidth": 50, "fontFamily": "Tempesta Seven Extended", "fontSize": "8px" });
		this.add(label);

		// timeText
		const timeText = scene.add.text(3, 14.85, "", {});
		timeText.text = "0:00";
		timeText.setStyle({ "align": "center", "color": "#666", "fixedWidth": 40, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px", "fontStyle": "bold" });
		this.add(timeText);

		this.label = label;
		this.timeText = timeText;

		/* START-USER-CTR-CODE */
		this.scene.events.once("scene-awake", () => {
			label.text = `1.5x ${LABEL[this.timerType]}`;
		})
		/* END-USER-CTR-CODE */
	}

	private label: Phaser.GameObjects.Text;
	private timeText: Phaser.GameObjects.Text;
	public timerType: "exp"|"coin" = "exp";

	/* START-USER-CODE */
	setActive() {
		this.label.setStyle({
			"color": ACTIVE_COLORS[this.timerType],
		})
		this.timeText.setStyle({
			"color": ACTIVE_COLORS[this.timerType],
		})
	}
	setInactive() {
		this.label.setStyle({
			"color": "#666",
		})
		this.timeText.setStyle({
			"color": "#666",
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
