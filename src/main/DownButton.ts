
// You can write more code here

/* START OF COMPILED CODE */

class DownButton extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// rectangle
		const rectangle = scene.add.rectangle(0, 0, 20, 20);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.fillColor = 16711680;
		rectangle.isStroked = true;
		rectangle.strokeColor = 0;
		this.add(rectangle);

		// triangle_1
		const triangle_1 = scene.add.triangle(5, 5, 0, 0, 10, 0, 5, 10);
		triangle_1.setOrigin(0, 0);
		triangle_1.isFilled = true;
		triangle_1.isStroked = true;
		triangle_1.strokeColor = 0;
		this.add(triangle_1);

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
