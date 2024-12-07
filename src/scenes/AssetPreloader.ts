
// You can write more code here

/* START OF COMPILED CODE */

class AssetPreloader extends Phaser.Scene {

	constructor() {
		super("Scene1");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// container_1
		const container_1 = this.add.container(175, 200);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(0, 0, 300, 50);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 6710886;
		container_1.add(rectangle_1);

		// loadingText
		const loadingText = this.add.text(4, 8, "", {});
		loadingText.text = "Anti-Idle: The Game is loading...";
		loadingText.setStyle({ "color": "#000000ff", "fontFamily": "Tempesta Seven", "fontSize": "10px", "fontStyle": "bold" });
		container_1.add(loadingText);

		// rectangle
		const rectangle = this.add.rectangle(0, 69, 300, 50);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.fillColor = 6710886;
		container_1.add(rectangle);

		// loadingBarbg
		const loadingBarbg = this.add.rectangle(25, 25, 250, 15);
		loadingBarbg.setOrigin(0, 0);
		loadingBarbg.isFilled = true;
		loadingBarbg.fillColor = 26112;
		container_1.add(loadingBarbg);

		// loadingBar
		const loadingBar = this.add.rectangle(25, 25, 250, 15);
		loadingBar.setOrigin(0, 0);
		loadingBar.isFilled = true;
		loadingBar.fillColor = 65280;
		container_1.add(loadingBar);

		// flavorText
		const flavorText = this.add.text(4, 73, "", {});
		flavorText.text = "Did you know? Anti-Idle: The Game is loading!";
		flavorText.setStyle({ "color": "#000", "fontFamily": "Tempesta Seven", "fontSize": "10px", "maxLines": 100 });
		flavorText.setWordWrapWidth(280, true);
		container_1.add(flavorText);

		// loadingTextAssets
		const loadingTextAssets = this.add.text(25, 26, "", {});
		loadingTextAssets.text = "Loading assets...";
		loadingTextAssets.setStyle({ "align": "right", "color": "#000000ff", "fixedWidth": 250, "fontFamily": "Tempesta Seven", "fontSize": "10px", "fontStyle": "bold" });
		container_1.add(loadingTextAssets);

		// flashNumber
		const flashNumber = this.add.text(501, 637, "", {});
		flashNumber.name = "flashNumber";
		flashNumber.text = "v12345";
		flashNumber.setStyle({ "align": "right", "color": "#000", "fixedWidth": 150, "fixedHeight": 20, "fontFamily": "Tempesta Seven", "fontSize": "10px", "stroke": "" });

		this.loadingText = loadingText;
		this.loadingBarbg = loadingBarbg;
		this.loadingBar = loadingBar;
		this.flavorText = flavorText;
		this.loadingTextAssets = loadingTextAssets;
		this.flashNumber = flashNumber;

		this.events.emit("scene-awake");
	}

	private loadingText!: Phaser.GameObjects.Text;
	private loadingBarbg!: Phaser.GameObjects.Rectangle;
	private loadingBar!: Phaser.GameObjects.Rectangle;
	private flavorText!: Phaser.GameObjects.Text;
	private loadingTextAssets!: Phaser.GameObjects.Text;
	private flashNumber!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
