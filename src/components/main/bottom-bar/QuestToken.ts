
// You can write more code here
export
	/* START OF COMPILED CODE */

class QuestToken extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// stroke
		const stroke = scene.add.polygon(0, 0, "0 5 5 0 15 0 20 5 20 15 15 20 5 20 0 15");
		stroke.setOrigin(0, 0);
		stroke.isFilled = true;
		stroke.fillColor = 6671205;
		stroke.isStroked = true;
		stroke.strokeColor = 26112;
		this.add(stroke);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(10, 10, 7.5, 7.5);
		rectangle_1.isStroked = true;
		rectangle_1.strokeColor = 26112;
		rectangle_1.lineWidth = 1.5;
		this.add(rectangle_1);

		// rectangle
		const rectangle = scene.add.rectangle(13.473209381103516, 13.039499282836914, 7.5, 1.5);
		rectangle.angle = 45;
		rectangle.isFilled = true;
		rectangle.fillColor = 26112;
		rectangle.strokeColor = 26112;
		this.add(rectangle);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
