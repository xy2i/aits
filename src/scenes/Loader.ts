
// You can write more code here

import { step2loadFunctions, step3loadBA, step4createAndUpgradeSave, step5News, step6Events, step7Fcg, step8AchievementsQuests, step9Fishing } from "@/loader/load"

/* START OF COMPILED CODE */

class Loader extends Phaser.Scene {

	constructor() {
		super("Loader");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// loadingText
		const loadingText = this.add.text(2, 6, "", {});
		loadingText.text = ">> Initializing: 1 / 8";
		loadingText.setStyle({ "color": "#ff0000", "fontFamily": "Tempesta Seven" });

		this.loadingText = loadingText;

		this.events.emit("scene-awake");
	}

	private loadingText!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here
	updateLoadingText(step: number) {
		this.loadingText.text = `>> Initializing: ${step} / 8`
	}

	updateLoadingDone() {
		this.loadingText.text = ">> Done!";
	}

	async create() {
		this.editorCreate();
		this.updateLoadingText(2);
		step2loadFunctions();
		this.updateLoadingText(3);
		step3loadBA();
		this.updateLoadingText(4);
		step4createAndUpgradeSave();
		this.updateLoadingText(5);
		step5News();
		this.updateLoadingText(6);
		step6Events();
		this.updateLoadingText(7);
		step7Fcg();
		this.updateLoadingText(8);
		step8AchievementsQuests();
		this.updateLoadingDone();
		step9Fishing();
		this.scene.start('MainMenu');
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Loader };