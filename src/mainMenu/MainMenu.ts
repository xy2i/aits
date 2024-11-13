
// You can write more code here

import { onEnter } from "./onenter";
import { BottomBar } from "@/script-nodes/BottomBar";

/* START OF COMPILED CODE */

class MainMenu extends Phaser.Scene {

	constructor() {
		super("MainMenu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	preload(): void {

		this.load.pack("asset-pack", "public/assets/asset-pack.json");
	}

	editorCreate(): void {

		// defaultBg
		const defaultBg = this.add.image(0, 0, "defaultBg");
		defaultBg.setOrigin(0, 0);
		defaultBg.tintTopLeft = 16777215;
		defaultBg.tintTopRight = 16777215;
		defaultBg.tintBottomLeft = 16777215;
		defaultBg.tintBottomRight = 16777215;

		// hueFx
		const hueFx = defaultBg.preFX!.addColorMatrix();
		hueFx.hue(-140);

		// brightnessFx
		const brightnessFx = defaultBg.preFX!.addColorMatrix();
		brightnessFx.brightness(0.25);

		// contrastFx
		const contrastFx = defaultBg.preFX!.addColorMatrix();
		contrastFx.contrast(0.2);

		// saturateFx
		const saturateFx = defaultBg.preFX!.addColorMatrix();
		saturateFx.saturate(0.2);

		// bottomBar
		const bottomBar = new BottomBar(this, 0, 620);
		this.add.existing(bottomBar);

		// anti_idle_logo
		const anti_idle_logo = this.add.image(256.419, 39.981, "anti-idle-logo");
		anti_idle_logo.setOrigin(0, 0);

		// text_1
		const text_1 = this.add.text(0, 151, "", {});
		text_1.text = "Welcome to Anti-Idle: The Game!";
		text_1.setStyle({ "align": "center", "color": "#c8e1fa", "fixedWidth": 650, "fixedHeight": 134.65, "fontFamily": "McLaren", "fontSize": "21px" });

		// text
		const text = this.add.text(0, 182, "", {});
		text.text = "Anti-Idle: The Game is a unique idle-type game created in 2009 (and still updated after 11 years!) \nby Tukkun.\n\nGain some EXP, level up and unlock tons of features and minigames! Anti-Idle: The Game can be \nplayed even when you are busy or not sitting near your computer, but there are also plenty of \nthings that you can do when you are actively playing - and all of that is completely FREE!\n\nWhat are you still waiting for? Press the big \"Awesome!\" button below there and join the \nawesomeness right away, with millions of other players!";
		text.setStyle({ "align": "center", "color": "#6496c8", "fixedWidth": 650, "fontFamily": "McLaren", "fontSize": "12px" });
		text.setLineSpacing(5.5);

		// text_2
		const text_2 = this.add.text(0, 585.2121894168807, "", {});
		text_2.text = "Your progress is automatically saved and is stored in your computer. Backup your savefile often!";
		text_2.setStyle({ "align": "center", "color": "#999", "fixedWidth": 650, "fontFamily": "McLaren", "fontSize": "12px" });
		text_2.setLineSpacing(5.5);

		this.defaultBg = defaultBg;

		this.events.emit("scene-awake");
	}

	private defaultBg!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { MainMenu }