
// You can write more code here

/* START OF COMPILED CODE */

class InsideBar extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// topRect
		const topRect = scene.add.rectangle(0, 0, 200, 5);
		topRect.setOrigin(0, 0);
		topRect.isFilled = true;
		this.add(topRect);

		// bottomRect
		const bottomRect = scene.add.rectangle(0, 5, 200, 15);
		bottomRect.setOrigin(0, 0);
		bottomRect.isFilled = true;
		this.add(bottomRect);

		this.topRect = topRect;
		this.bottomRect = bottomRect;

		/* START-USER-CTR-CODE */
		this.scene.events.on('update', this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	private topRect: Phaser.GameObjects.Rectangle;
	private bottomRect: Phaser.GameObjects.Rectangle;
	public color: "green" = "green";

	/* START-USER-CODE */
	update() {
		switch (this.color) {
			case "green": {
				this.topRect.fillColor = 0x466e46;
				this.bottomRect.fillColor = 0x3c643c;
			}
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { InsideBar };
