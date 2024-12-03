import { Display } from "phaser";

// You can write more code here
export
	/* START OF COMPILED CODE */

	class Button extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// bottom
		const bottom = scene.add.rectangle(0, 5, 50, 15);
		bottom.setOrigin(0, 0);
		bottom.isFilled = true;
		bottom.fillColor = 6250335;
		this.add(bottom);

		// top
		const top = scene.add.rectangle(0, 0, 50, 5);
		top.setOrigin(0, 0);
		top.isFilled = true;
		top.fillColor = 7566195;
		this.add(top);

		// outline
		const outline = scene.add.rectangle(0, 0, 50, 20);
		outline.setOrigin(0, 0);
		outline.isFilled = true;
		outline.fillAlpha = 0.3;
		outline.isStroked = true;
		outline.strokeColor = 0;
		this.add(outline);

		this.outline = outline;

		/* START-USER-CTR-CODE */
		outline
			.setInteractive({ useHandCursor: true })
			.on("pointerover", () => {
				this.base_pointerover()
				this.pointerover()
			})
			.on("pointerout", () => {
				this.base_pointerout()
				this.pointerout()
			})
			.on("pointerdown", () => this.pointerdown())
			.on("pointerup", () => this.pointerup())

		this.scene.events.once("scene-awake", () => {
			outline.isFilled = false;

			const colorValue = Display.Color.ValueToColor(this.color);
			bottom.fillColor = colorValue.color;
			top.fillColor = colorValue.brighten(6).color;
			outline.strokeColor = colorValue.darken(15).color;
		})
		this.scene.events.on("update", this.base_update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	private outline: Phaser.GameObjects.Rectangle;
	public color: string = "#5F5F5F";
	public pointerup: () => void = () => { };
	public pointerover: () => void = () => { };
	public pointerout: () => void = () => { };
	public update: () => void = () => { };

	/* START-USER-CODE */
	base_pointerover() {
		this.outline.isFilled = true;
	}
	base_pointerout() {
		this.outline.isFilled = false;
	}
	pointerdown() {
		this.outline.isFilled = false;
	}
	base_update() {
		this.update();
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
