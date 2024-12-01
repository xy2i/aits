import { AdventureReminder } from "@/components/main/minis/AdventureReminder";
import { CardReminder } from "@/components/main/minis/CardReminder";
import { CardTimer } from "@/components/main/minis/CardTimer";
import { MiniGarden } from "@/components/main/minis/MiniGarden";
import { SuperBattery } from "@/components/main/minis/SuperBattery";
import { HEIGHT } from "@/main";
import { ActionDescription } from "./ActionDescription";
import { loadMain } from "./loadMain";
import { News } from "./News";
import { TopBar } from "./TopBar";

/* START OF COMPILED CODE */

class Main extends Phaser.Scene {

	constructor() {
		super("Main");

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// topBar
		const topBar = new TopBar(this, 0, 0);
		this.add.existing(topBar);

		// news
		const news = new News(this, 10, 440);
		this.add.existing(news);

		// screenSize
		const screenSize = this.add.text(0, 605, "", {});
		screenSize.name = "screenSize";
		screenSize.setStyle({ "align": "right", "color": "#cccccc", "fixedHeight": 20.3, "fontFamily": "Tempesta Seven", "fontSize": "10px", "stroke": "", "resolution": 16 });

		// miniGarden
		const miniGarden = new MiniGarden(this, 5, 555.4);
		this.add.existing(miniGarden);

		// superBattery
		const superBattery = new SuperBattery(this, 100, 555.4);
		this.add.existing(superBattery);

		// adventureReminder
		const adventureReminder = new AdventureReminder(this, 160.05, 556.6);
		this.add.existing(adventureReminder);

		// cardReminder
		const cardReminder = new CardReminder(this, 210.65, 556.6);
		this.add.existing(cardReminder);

		// cardTimerExp
		const cardTimerExp = new CardTimer(this, 525, 540);
		this.add.existing(cardTimerExp);

		// cardTimerCoin
		const cardTimerCoin = new CardTimer(this, 585, 540);
		this.add.existing(cardTimerCoin);

		// logo
		const logo = this.add.image(525, 85, "logo");
		logo.scaleX = 0.75;
		logo.scaleY = 0.75;
		logo.setOrigin(0, 0);

		// saturateFx
		const saturateFx = logo.preFX!.addColorMatrix();
		saturateFx.saturate(2.5);

		// actionDescription
		const actionDescription = new ActionDescription(this, -4, 282);
		this.add.existing(actionDescription);

		// cardTimerCoin (prefab fields)
		cardTimerCoin.timerType = "coin";

		this.screenSize = screenSize;
		this.miniGarden = miniGarden;
		this.superBattery = superBattery;
		this.adventureReminder = adventureReminder;
		this.cardTimerExp = cardTimerExp;
		this.cardTimerCoin = cardTimerCoin;
		this.logo = logo;

		this.events.emit("scene-awake");
	}

	private screenSize!: Phaser.GameObjects.Text;
	public miniGarden!: MiniGarden;
	public superBattery!: SuperBattery;
	public adventureReminder!: AdventureReminder;
	public cardTimerExp!: CardTimer;
	public cardTimerCoin!: CardTimer;
	private logo!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here
	updateFunction;

	create() {
		this.cameras.main.setOrigin(0, 0);
		this.editorCreate();

		this.logo.postFX!.addGlow(0x000000, 7, 0, false, 1, 3);
		this.updateFunction = loadMain(this);
	}

	update() {
		const { width, height } = this.game.canvas;
		this.screenSize.text = `${width}x${height} dpi=${window.devicePixelRatio
			}  text resolution=${(height / HEIGHT) * window.devicePixelRatio}`;

		this.updateFunction();
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Main };
