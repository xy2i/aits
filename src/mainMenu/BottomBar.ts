
// You can write more code here

/* START OF COMPILED CODE */

class BottomBar extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// rectangle
		const rectangle = scene.add.rectangle(0, 0, 650, 30);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.fillColor = 0;
		rectangle.fillAlpha = 0.5;
		this.add(rectangle);

		// fps
		const fps = scene.add.text(5, 4, "", {});
		fps.setOrigin(0.5, 0.5);
		fps.text = "FPS";
		fps.setStyle({ "fontFamily": "Tempesta Seven", "fontSize": "7px" });
		this.add(fps);

		// fpsCounter
		const fpsCounter = scene.add.text(0, 16, "", {});
		fpsCounter.name = "fpsCounter";
		fpsCounter.setOrigin(0.5, 0.5);
		fpsCounter.text = "40";
		fpsCounter.setStyle({ "align": "right", "fixedWidth": 21, "fixedHeight": 20, "fontFamily": "Tempesta Seven", "fontSize": "10px" });
		this.add(fpsCounter);

		// bottomBar_1
		new BottomBar(this);

		// upNumberLabel
		const upNumberLabel = scene.add.text(630, 4, "", {});
		upNumberLabel.setOrigin(0.5, 0.5);
		upNumberLabel.text = "Ver.";
		upNumberLabel.setStyle({ "fontFamily": "Tempesta Seven", "fontSize": "7px" });
		this.add(upNumberLabel);

		// upNumber
		const upNumber = scene.add.text(610, 16, "", {});
		upNumber.name = "upNumber";
		upNumber.setOrigin(0.5, 0.5);
		upNumber.text = "1,500";
		upNumber.setStyle({ "align": "right", "color": "#cccccc", "fixedWidth": 40, "fixedHeight": 20, "fontFamily": "Tempesta Seven", "fontSize": "10px", "stroke": "" });
		this.add(upNumber);

		// flashVerLabel
		const flashVerLabel = scene.add.text(544, 4, "", {});
		flashVerLabel.setOrigin(0.5, 0.5);
		flashVerLabel.text = "AITS Version";
		flashVerLabel.setStyle({ "color": "#999999", "fontFamily": "Tempesta Seven", "fontSize": "7px" });
		this.add(flashVerLabel);

		// flashNumber
		const flashNumber = scene.add.text(448, 16, "", {});
		flashNumber.name = "flashNumber";
		flashNumber.setOrigin(0.5, 0.5);
		flashNumber.setStyle({ "align": "right", "color": "#999999", "fixedWidth": 150, "fixedHeight": 20, "fontFamily": "Tempesta Seven", "fontSize": "10px", "stroke": "" });
		this.add(flashNumber);

		// fps_1
		const fps_1 = scene.add.text(91.303, 4, "", {});
		fps_1.setOrigin(0.5, 0.5);
		fps_1.text = "Date & Time";
		fps_1.setStyle({ "fontFamily": "Tempesta Seven", "fontSize": "7px" });
		this.add(fps_1);

		// timeDisplay
		const timeDisplay = scene.add.text(30.001, 16, "", {});
		timeDisplay.name = "timeDisplay";
		timeDisplay.setOrigin(0.5, 0.5);
		timeDisplay.setStyle({ "align": "right", "color": "#cccccc", "fixedWidth": 115.01, "fixedHeight": 20.3, "fontFamily": "Tempesta Seven", "fontSize": "10px", "stroke": "" });
		this.add(timeDisplay);

		this.fpsCounter = fpsCounter;
		this.upNumber = upNumber;
		this.flashNumber = flashNumber;
		this.timeDisplay = timeDisplay;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private fpsCounter: Phaser.GameObjects.Text;
	private upNumber: Phaser.GameObjects.Text;
	private flashNumber: Phaser.GameObjects.Text;
	private timeDisplay: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
