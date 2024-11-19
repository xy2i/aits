
// You can write more code here

/* START OF COMPILED CODE */

class UpButton extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(0, 0, 20, 20);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 16711680;
		rectangle_1.isStroked = true;
		rectangle_1.strokeColor = 0;
		this.add(rectangle_1);

		// triangle_up
		const triangle_up = scene.add.triangle(5, 5, 0, 10, 5, 0, 10, 10);
		triangle_up.setOrigin(0, 0);
		triangle_up.isFilled = true;
		triangle_up.isStroked = true;
		triangle_up.strokeColor = 0;
		this.add(triangle_up);

		// triangle_down
		const triangle_down = scene.add.triangle(5, 5, 0, 0, 5, 10, 10, 0);
		triangle_down.setOrigin(0, 0);
		triangle_down.isFilled = true;
		triangle_down.isStroked = true;
		triangle_down.strokeColor = 0;
		this.add(triangle_down);

		/* START-USER-CTR-CODE */
		this.scene.events.once("scene-awake", () => {
			triangle_up.setVisible(false);
			triangle_down.setVisible(false);
			switch (this.direction) {
				case "up": {
					triangle_up.setVisible(true);
					break;
				}
				case "down": {
					triangle_down.setVisible(true);
					break;
				}
			}
		})

		rectangle_1.setInteractive({ useHandCursor: true })
			.on("pointerup", () => {
				rectangle_1.fillColor = 0xff0000;
				this.pointerup()
			})
			.on("pointerdown", () => {
				rectangle_1.fillColor = 0xFF6000;
			});
		/* END-USER-CTR-CODE */
	}

	public pointerup: () => void = () => { };
	public direction: "up" | "down" | "left" | "right" = "up";

	/* START-USER-CODE */
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { UpButton };
