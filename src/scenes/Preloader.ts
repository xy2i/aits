
// You can write more code here

import { version } from "@/../package.json";
import { random } from "@/flash/random";
import { _root } from "@/flash/root";
import { SharedObject } from "@/flash/sharedobject";
import { loadFonts, preloadFonts } from '@/font';
import Phaser from "phaser";

const FLAVOR_TEXT = [
	"Did you know? Anti-Idle: The Game is loading!",
	"This is one of 11 messages you can get, LOL!",
	"Don\'t forget to come back and check for updates!",
	"If it takes too long to load or doesn\'t load at all, try refreshing.",
	"Happy Birthday! What, it isn\'t your birthday? Oh well...",
	"Loading epicness...",
	"Finding a way to reduce lag...",
	"Increasing player\'s Impatience Quotient...",
	"The game is fully loaded when the green bar is full, by the way.",
	"Oh, by the way, this isn\'t the game. This is just the preloader!",
];

/* START OF COMPILED CODE */

class Preloader extends Phaser.Scene {

	constructor() {
		super("Scene1");

		/* START-USER-CTR-CODE */
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

		// flashNumber
		const flashNumber = this.add.text(501, 637, "", {});
		flashNumber.name = "flashNumber";
		flashNumber.text = "v12345";
		flashNumber.setStyle({ "align": "right", "color": "#000", "fixedWidth": 150, "fixedHeight": 20, "fontFamily": "Tempesta Seven", "fontSize": "10px", "stroke": "" });

		this.loadingText = loadingText;
		this.loadingBar = loadingBar;
		this.flavorText = flavorText;
		this.flashNumber = flashNumber;

		this.events.emit("scene-awake");
	}

	private loadingText!: Phaser.GameObjects.Text;
	private loadingBar!: Phaser.GameObjects.Rectangle;
	private flavorText!: Phaser.GameObjects.Text;
	private flashNumber!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	/** Load assets */
	async preload() {
		if (import.meta.env.DEV) {
			_root.flashVer = `dev ${import.meta.env.COMMIT_HASH}`;
		} else {
			_root.flashVer = `${version}`;
		}
	}

	// Write your code here
	async create() {
		this.cameras.main.setOrigin(0, 0);
		this.editorCreate();
		this.flashNumber.text = _root.flashVer;
		this.flavorText.text = FLAVOR_TEXT[Math.floor(Math.random() * FLAVOR_TEXT.length)];
		this.loadingText.text = "Loading preloader fonts...";
		await preloadFonts();
		// Force reloading of fonts by restyling preloader elements
		this.flavorText.setStyle({ "color": "#000", "fontFamily": "Tempesta Seven", "fontSize": "10px", "maxLines": 100 });
		this.flashNumber.setStyle({ "color": "#000", "fontFamily": "Tempesta Seven", "fontSize": "10px", "maxLines": 100 });

		this.load.on('progress', (progress: number) => {
			//  Update the progress bar (our bar is 464px wide, so 100% = 464px)
			console.log("progress")
			this.loadingBar.width = 4 + (460 * progress);
		});

		this.load.on('complete', (progress: number) => {
			console.log("complete")
			this.loadingBar.width = 4 + (460 * progress);
		});
		this.loadingText.text = "Loading fonts...";
		await loadFonts();

		this.load.pack("asset-pack", "assets/asset-pack.json");
		this.loadingText.text = "Loading save file...";

		_root.kpaChip = false;
		_root.autoStart = true;
		_root.sessionTimeLeft = 2419200;
		_root.luckyNumber = 10000000 + random(90000000);
		_root.upnumber = 1861;
		_root.upnumberHidden = 0;
		_root.kongregate_username = "Guest";
		_root.offlineVersion = true;
		_root.globalSetting = SharedObject.getLocal("ATG_Global", "/");
		_root.saveGlobal = _root.globalSetting.data;
		_root.preloadedFile0 = false;
		_root.preloadedFile1 = false;
		_root.preloadedFile2 = false;
		_root.preloadedFile3 = false;
		_root.thisSession = 0;
		_root.refresh_year = 0;
		_root.refresh_month = 0;
		_root.refresh_date = 0;
		this.loadingText.text = "Load complete!";

		this.scene.start('Loader');
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Preloader };

