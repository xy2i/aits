import { _root } from "@/flash/root";
import { selectSavefile } from "./selectSavefile";

// You can write more code here


/* START OF COMPILED CODE */

class AwesomeButton extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(0, 0, 620, 60);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 9868850;
		this.add(rectangle_1);

		// text_1
		const text_1 = scene.add.text(0, 9, "", {});
		text_1.text = "Awesome!";
		text_1.setStyle({ "align": "center", "color": "#fafa96", "fixedWidth": 620, "fixedHeight": 60, "fontFamily": "McLaren", "fontSize": "40px" });
		this.add(text_1);

		// overlay
		const overlay = scene.add.rectangle(0, 0, 620, 60);
		overlay.setOrigin(0, 0);
		overlay.isFilled = true;
		overlay.fillAlpha = 0;
		this.add(overlay);

		this.overlay = overlay;

		/* START-USER-CTR-CODE */
		rectangle_1.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.pointerover())
			.on('pointerout', () => this.pointerout())
			.on('pointerdown', () => this.pointerdown());

		this.fadeTween = this.scene.tweens.add({
			targets: this.overlay,
			alpha: 0,
			duration: 667,
			yoyo: true,
			repeat: -1,
			ease: 'Linear'
		});

		this.scene.events.once("scene-awake", () => {
			this.pointerout();
		});
		/* END-USER-CTR-CODE */
	}

	private overlay: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */
	fadeTween: Phaser.Tweens.Tween;

	pointerover() {
		this.fadeTween.pause();
		this.overlay.setAlpha(0.5);
		this.overlay.setFillStyle(0xffffff, .5);
	}
	pointerout() {
		this.fadeTween.play();
		this.overlay.setFillStyle(0xffffff, .2);
	}
	pointerdown() {
		this.fadeTween.pause();
		this.overlay.setAlpha(.5);
		this.overlay.setFillStyle(0x00000);
		selectSavefile(this.scene.scene, _root.saveGlobal.selectedSave);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { AwesomeButton };

