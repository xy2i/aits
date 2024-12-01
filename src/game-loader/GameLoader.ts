
// You can write more code here

import { BottomBar } from "@/ui/BottomBar";
import { loadGame } from "./loadGame";

/* START OF COMPILED CODE */

class GameLoader extends Phaser.Scene {

	constructor() {
		super("GameLoader");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// bottomBar
		const bottomBar = new BottomBar(this, 0, 620);
		this.add.existing(bottomBar);

		// text_1
		const text_1 = this.add.text(0, 19.85, "", {});
		text_1.text = "Loading...\n(This should take less than 2 seconds)";
		text_1.setStyle({ "align": "center", "color": "#666", "fixedWidth": 650, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		loadGame();

		this.scene.start("Main");
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { GameLoader };
