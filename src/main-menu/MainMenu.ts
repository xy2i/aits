
// You can write more code here
import { FileButton } from "@/main-menu/FileButton";
import { AwesomeButton } from "./AwesomeButton";

/* START OF COMPILED CODE */

class MainMenu extends Phaser.Scene {

	constructor() {
		super("MainMenu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	preload(): void {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	editorCreate(): void {

		// defaultBg
		const defaultBg = this.add.image(0, 0, "defaultBg");
		defaultBg.setOrigin(0, 0);
		defaultBg.tintTopLeft = 16777215;
		defaultBg.tintTopRight = 16777215;
		defaultBg.tintBottomLeft = 16777215;
		defaultBg.tintBottomRight = 16777215;

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

		// fileButton0
		const fileButton0 = new FileButton(this, 15, 445);
		this.add.existing(fileButton0);

		// fileButton1
		const fileButton1 = new FileButton(this, 140, 445);
		this.add.existing(fileButton1);

		// fileButton2
		const fileButton2 = new FileButton(this, 265, 445);
		this.add.existing(fileButton2);

		// fileButton3
		const fileButton3 = new FileButton(this, 390, 445);
		this.add.existing(fileButton3);

		// text_4
		const text_4 = this.add.text(1, 54, "", {});
		text_4.text = "put logo here";
		text_4.setStyle({ "align": "center", "color": "#c8e1fa", "fixedWidth": 650, "fixedHeight": 134.65, "fontFamily": "McLaren", "fontSize": "42px" });

		// awesomeButton
		const awesomeButton = new AwesomeButton(this, 15.1, 381);
		this.add.existing(awesomeButton);

		// fileButton0 (prefab fields)
		fileButton0.fileNumber = 0;

		// fileButton1 (prefab fields)
		fileButton1.fileNumber = 1;

		// fileButton2 (prefab fields)
		fileButton2.fileNumber = 2;

		// fileButton3 (prefab fields)
		fileButton3.fileNumber = 3;

		this.defaultBg = defaultBg;

		this.events.emit("scene-awake");
	}

	private defaultBg!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.cameras.main.setOrigin(0, 0);
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { MainMenu };

