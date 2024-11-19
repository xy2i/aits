import { ActionDescription } from "./ActionDescription";
import { loadMain } from "./loadMain";
import { News } from "./News";
import { TopBar } from "./TopBar";

/* START OF COMPILED CODE */

class Main extends Phaser.Scene {

	constructor() {
		super("Main");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {
		// topBar
		const topBar = new TopBar(this, 0, 0);
		this.add.existing(topBar);

		// news
		const news = new News(this, 41, 480);
		this.add.existing(news);

		// actionDescription
		const actionDescription = new ActionDescription(this, -4, 282);
		this.add.existing(actionDescription);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here
	updateFunction;

	create() {

		this.cameras.main.setOrigin(0, 0);
		this.editorCreate();

		this.updateFunction = loadMain();
	}

	update() {
		this.updateFunction();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Main };
