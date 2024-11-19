
// You can write more code here
import { BottomBar } from "@/ui/BottomBar";
/* START OF COMPILED CODE */

class Ui extends Phaser.Scene {

	constructor() {
		super("Ui");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// bottomBar
		const bottomBar = new BottomBar(this, 0, 620);
		this.add.existing(bottomBar);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Ui };
