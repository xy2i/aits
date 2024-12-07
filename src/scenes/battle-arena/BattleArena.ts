
// You can write more code here
export
	/* START OF COMPILED CODE */

class BattleArena extends Phaser.Scene {

	constructor() {
		super("BattleArena");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(0, 0, "", {});
		text.text = "battle arena";
		text.setStyle({ "backgroundColor": "#00acd7ff", "color": "#000000ff" });

		// skin
		const skin = this.add.image(35, 150, "skin");
		skin.scaleX = 0.5;
		skin.scaleY = 0.5;
		skin.setOrigin(0, 0);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create({ x, y, w, h }) {
		this.cameras.main.setViewport(x * this.cameras.main.zoom, y * this.cameras.main.zoom, w, h);

		console.log(x * this.cameras.main.zoom, y * this.cameras.main.zoom, w, h)
		console.log(this.cameras.main.zoom);
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
