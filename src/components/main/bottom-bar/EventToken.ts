
// You can write more code here
export
	/* START OF COMPILED CODE */

class EventToken extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// stroke
		const stroke = scene.add.polygon(0, 0, "0 5 5 0 15 0 20 5 20 15 15 20 5 20 0 15");
		stroke.setOrigin(0, 0);
		stroke.isFilled = true;
		stroke.fillColor = 6671333;
		stroke.isStroked = true;
		stroke.strokeColor = 486791;
		this.add(stroke);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(7.5, 5, 5, 1.5);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 486791;
		rectangle_1.strokeColor = 26112;
		this.add(rectangle_1);

		// rectangle
		const rectangle = scene.add.rectangle(7.5, 13, 5, 1.5);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.fillColor = 486791;
		rectangle.strokeColor = 26112;
		this.add(rectangle);

		// rectangle_2
		const rectangle_2 = scene.add.rectangle(7.5, 9, 5, 1.5);
		rectangle_2.setOrigin(0, 0);
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 486791;
		rectangle_2.strokeColor = 26112;
		this.add(rectangle_2);

		// rectangle_3
		const rectangle_3 = scene.add.rectangle(7.5, 5, 1.5, 9);
		rectangle_3.setOrigin(0, 0);
		rectangle_3.isFilled = true;
		rectangle_3.fillColor = 486791;
		rectangle_3.strokeColor = 26112;
		this.add(rectangle_3);

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
