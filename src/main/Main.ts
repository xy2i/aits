import { House } from "@/components/house/House";
import { Boost } from "@/components/main/boost/Boost";
import { EventToken } from "@/components/main/bottom-bar/EventToken";
import { QuestToken } from "@/components/main/bottom-bar/QuestToken";
import { Button } from "@/components/main/Button";
import { AdventureReminder } from "@/components/main/minis/AdventureReminder";
import { CardReminder } from "@/components/main/minis/CardReminder";
import { CardTimer } from "@/components/main/minis/CardTimer";
import { MiniGarden } from "@/components/main/minis/MiniGarden";
import { SuperBattery } from "@/components/main/minis/SuperBattery";
import { ProgressBar } from "@/components/main/progress-bar/ProgressBar";
import { ProgressBarMode } from "@/components/main/progress-bar/ProgressBarMode";
import { RestTimer } from "@/components/main/progress-bar/RestTimer";
import { QuestFlash } from "@/components/main/QuestFlash";
import { _root } from "@/flash/root";
import { withComma } from "@/lib/format";
import { SIZE } from "@/main";
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

		// screenSize
		const screenSize = this.add.text(0, 611, "", {});
		screenSize.name = "screenSize";
		screenSize.setStyle({ "align": "right", "color": "#cccccc", "fixedHeight": 20.3, "fontFamily": "Tempesta Seven", "fontSize": "6px", "stroke": "", "resolution": 16 });

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
		const cardTimerExp = new CardTimer(this, 525, 543);
		this.add.existing(cardTimerExp);

		// cardTimerCoin
		const cardTimerCoin = new CardTimer(this, 585, 543);
		this.add.existing(cardTimerCoin);

		// bottomButtons
		const bottomButtons = this.add.container(0, 585);

		// achivementsButton
		const achivementsButton = new Button(this, 5, 2.5);
		achivementsButton.scaleX = 1.6;
		achivementsButton.scaleY = 1;
		bottomButtons.add(achivementsButton);

		// achievementsLabel
		const achievementsLabel = this.add.text(8, 7.5, "", {});
		achievementsLabel.text = "Achievements";
		achievementsLabel.setStyle({ "color": "#000000ff", "fontFamily": "Ronda Seven", "fontSize": "10px" });
		achievementsLabel.setPadding({"left":1});
		bottomButtons.add(achievementsLabel);

		// bg1
		const bg1 = this.add.rectangle(85, 2.5, 45, 20);
		bg1.setOrigin(0, 0);
		bg1.isFilled = true;
		bg1.fillColor = 0;
		bg1.fillAlpha = 0.8;
		bottomButtons.add(bg1);

		// achText
		const achText = this.add.text(85, 3.05, "", {});
		achText.text = "630";
		achText.setStyle({ "align": "right", "color": "#ffff00", "fixedWidth": 45, "fixedHeight": 20.32, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });
		achText.setPadding({"top":5,"right":2});
		bottomButtons.add(achText);

		// questsButton
		const questsButton = new Button(this, 135, 2.5);
		questsButton.scaleX = 1;
		questsButton.scaleY = 1;
		bottomButtons.add(questsButton);

		// questsLabel
		const questsLabel = this.add.text(135, 6.5, "", {});
		questsLabel.text = "Quests";
		questsLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		questsLabel.setPadding({"left":1});
		bottomButtons.add(questsLabel);

		// questFlash
		const questFlash = new QuestFlash(this, 135, 2);
		bottomButtons.add(questFlash);

		// bg
		const bg = this.add.rectangle(185, 2.5, 45, 20);
		bg.setOrigin(0, 0);
		bg.isFilled = true;
		bg.fillColor = 0;
		bg.fillAlpha = 0.8;
		bottomButtons.add(bg);

		// questText
		const questText = this.add.text(185, 2.5, "", {});
		questText.text = "100%";
		questText.setStyle({ "align": "right", "color": "#66ff00", "fixedWidth": 45, "fixedHeight": 20.32, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });
		questText.setPadding({ "top": 5, "right": 2 });
		bottomButtons.add(questText);

		// questDivider
		const questDivider = this.add.rectangle(230, 2.5, 1, 20);
		questDivider.setOrigin(0, 0);
		questDivider.isFilled = true;
		questDivider.fillColor = 65280;
		questDivider.fillAlpha = 0.8;
		bottomButtons.add(questDivider);

		// bg_1
		const bg_1 = this.add.rectangle(230, 2.5, 104.8, 20);
		bg_1.setOrigin(0, 0);
		bg_1.isFilled = true;
		bg_1.fillColor = 0;
		bg_1.fillAlpha = 0.8;
		bottomButtons.add(bg_1);

		// tokenText1
		const tokenText1 = this.add.text(230, 2, "", {});
		tokenText1.text = "9,999,999\n";
		tokenText1.setStyle({ "align": "right", "color": "#66ff00", "fixedWidth": 90, "fixedHeight": 20.32, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });
		tokenText1.setPadding({ "top": 5, "right": 2 });
		bottomButtons.add(tokenText1);

		// eventsButton
		const eventsButton = new Button(this, 350, 2.55);
		eventsButton.scaleX = 1;
		eventsButton.scaleY = 1;
		bottomButtons.add(eventsButton);

		// eventsLabel
		const eventsLabel = this.add.text(350, 6.55, "", {});
		eventsLabel.text = "Events";
		eventsLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		eventsLabel.setPadding({ "left": 1 });
		bottomButtons.add(eventsLabel);

		// bg_2
		const bg_2 = this.add.rectangle(400, 2, 104.8, 20);
		bg_2.setOrigin(0, 0);
		bg_2.isFilled = true;
		bg_2.fillColor = 0;
		bg_2.fillAlpha = 0.8;
		bottomButtons.add(bg_2);

		// tokenText
		const tokenText = this.add.text(400, 2, "", {});
		tokenText.text = "9,999,999\n";
		tokenText.setStyle({ "align": "right", "color": "#00ccff", "fixedWidth": 90, "fixedHeight": 20.32, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });
		tokenText.setPadding({ "top": 5, "right": 2 });
		bottomButtons.add(tokenText);

		// shopButton
		const shopButton = new Button(this, 520, 2.55);
		shopButton.scaleX = 1;
		shopButton.scaleY = 1;
		bottomButtons.add(shopButton);

		// shopLabel
		const shopLabel = this.add.text(520, 6.55, "", {});
		shopLabel.text = "Shop";
		shopLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		shopLabel.setPadding({ "left": 1 });
		bottomButtons.add(shopLabel);

		// bg_3
		const bg_3 = this.add.rectangle(570, 2, 70, 20);
		bg_3.setOrigin(0, 0);
		bg_3.isFilled = true;
		bg_3.fillColor = 0;
		bg_3.fillAlpha = 0.8;
		bottomButtons.add(bg_3);

		// shopText
		const shopText = this.add.text(570, 2, "", {});
		shopText.text = "0 / 28\n";
		shopText.setStyle({ "align": "right", "color": "#ff9900", "fixedWidth": 70, "fixedHeight": 20.32, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });
		shopText.setPadding({ "top": 5, "right": 2 });
		bottomButtons.add(shopText);

		// questToken
		const questToken = new QuestToken(this, 320, -0.5);
		questToken.scaleX = 1.25;
		questToken.scaleY = 1.25;
		bottomButtons.add(questToken);

		// eventToken_1
		const eventToken_1 = new EventToken(this, 490, -0.5);
		eventToken_1.scaleX = 1.25;
		eventToken_1.scaleY = 1.25;
		bottomButtons.add(eventToken_1);

		// uiBarButtons
		const uiBarButtons = this.add.container(150, 625);

		// statsButton
		const statsButton = new Button(this, 0, 0);
		statsButton.scaleX = 1;
		statsButton.scaleY = 1;
		uiBarButtons.add(statsButton);

		// statsLabel
		const statsLabel = this.add.text(0, 0, "", {});
		statsLabel.text = "Stats";
		statsLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		statsLabel.setPadding({"left":1,"top":5});
		uiBarButtons.add(statsLabel);

		// optionsButton
		const optionsButton = new Button(this, 55, 0);
		optionsButton.scaleX = 1;
		optionsButton.scaleY = 1;
		uiBarButtons.add(optionsButton);

		// optionsLabel
		const optionsLabel = this.add.text(55, 0, "", {});
		optionsLabel.text = "Options";
		optionsLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		optionsLabel.setPadding({"left":1,"top":5});
		uiBarButtons.add(optionsLabel);

		// careersButton
		const careersButton = new Button(this, 110, 0);
		careersButton.scaleX = 1;
		careersButton.scaleY = 1;
		uiBarButtons.add(careersButton);

		// careersButtonBrightness
		const careersButtonBrightness = careersButton.postFX!.addColorMatrix();
		careersButtonBrightness.brightness(0.3);

		// careersLabel
		const careersLabel = this.add.text(110, 0, "", {});
		careersLabel.text = "Careers";
		careersLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		careersLabel.setPadding({"left":1,"top":5});
		uiBarButtons.add(careersLabel);

		// petButton
		const petButton = new Button(this, 165, 0);
		petButton.scaleX = 1;
		petButton.scaleY = 1;
		uiBarButtons.add(petButton);

		// petButtonBrightness
		const petButtonBrightness = petButton.postFX!.addColorMatrix();
		petButtonBrightness.brightness(0.3);

		// petLabel
		const petLabel = this.add.text(165, 0, "", {});
		petLabel.text = "Pet";
		petLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		petLabel.setPadding({"left":1,"top":5});
		uiBarButtons.add(petLabel);

		// cyborgButton
		const cyborgButton = new Button(this, 220, 0);
		cyborgButton.scaleX = 1;
		cyborgButton.scaleY = 1;
		uiBarButtons.add(cyborgButton);

		// cyborgButtonBrightness
		const cyborgButtonBrightness = cyborgButton.postFX!.addColorMatrix();
		cyborgButtonBrightness.brightness(0.3);

		// cyborgLabel
		const cyborgLabel = this.add.text(220, 0, "", {});
		cyborgLabel.text = "Cyborg";
		cyborgLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		cyborgLabel.setPadding({"left":1,"top":5});
		uiBarButtons.add(cyborgLabel);

		// backButton
		const backButton = new Button(this, 285, 0);
		backButton.scaleX = 1;
		backButton.scaleY = 1;
		uiBarButtons.add(backButton);

		// backLabel
		const backLabel = this.add.text(285, 0, "", {});
		backLabel.text = "< Back";
		backLabel.setStyle({ "align": "center", "color": "#000000ff", "fixedWidth": 50, "fontFamily": "Ronda Seven", "fontSize": "10px" });
		backLabel.setPadding({"left":1,"top":5});
		uiBarButtons.add(backLabel);

		// middlePanel
		const middlePanel = this.add.container(10, 440);

		// news
		const news = new News(this, 0, 0);
		middlePanel.add(news);

		// boost
		const boost = new Boost(this, 517, -3);
		middlePanel.add(boost);

		// sidePanel
		const sidePanel = this.add.container(525, 80);

		// logo
		const logo = this.add.image(0, 0, "logo");
		logo.scaleX = 0.375;
		logo.scaleY = 0.375;
		logo.setOrigin(0, 0);
		sidePanel.add(logo);

		// saturateFx
		const saturateFx = logo.preFX!.addColorMatrix();
		saturateFx.saturate(2.5);

		// progressBar
		const progressBar = new ProgressBar(this, 44, 75);
		sidePanel.add(progressBar);

		// progressBarMode
		const progressBarMode = new ProgressBarMode(this, 4, 276);
		sidePanel.add(progressBarMode);

		// restTimer
		const restTimer = new RestTimer(this, 4, 322);
		sidePanel.add(restTimer);

		// topBar
		const topBar = new TopBar(this, 0, 0);
		this.add.existing(topBar);

		// house
		const house = new House(this, 10, 80);
		this.add.existing(house);

		// actionDescription
		const actionDescription = new ActionDescription(this, -4, 281);
		this.add.existing(actionDescription);

		// cardTimerCoin (prefab fields)
		cardTimerCoin.timerType = "coin";

		// achivementsButton (prefab fields)
		achivementsButton.color = "#AFAF2F";

		// questsButton (prefab fields)
		questsButton.color = "#2FAF2F";

		// eventsButton (prefab fields)
		eventsButton.color = "#2F95AF";

		// shopButton (prefab fields)
		shopButton.color = "#AF7C2F";

		// statsButton (prefab fields)
		statsButton.color = "#8D6EAC";

		// optionsButton (prefab fields)
		optionsButton.color = "#6E6EAC";

		// careersButton (prefab fields)
		careersButton.color = "#2F6295";

		// petButton (prefab fields)
		petButton.color = "#2F6295";

		// cyborgButton (prefab fields)
		cyborgButton.color = "#2F6295";

		// backButton (prefab fields)
		backButton.color = "#7C7C7C";

		this.screenSize = screenSize;
		this.miniGarden = miniGarden;
		this.superBattery = superBattery;
		this.adventureReminder = adventureReminder;
		this.cardTimerExp = cardTimerExp;
		this.cardTimerCoin = cardTimerCoin;
		this.achivementsButton = achivementsButton;
		this.achText = achText;
		this.questsButton = questsButton;
		this.questText = questText;
		this.tokenText1 = tokenText1;
		this.eventsButton = eventsButton;
		this.tokenText = tokenText;
		this.shopButton = shopButton;
		this.shopText = shopText;
		this.statsButton = statsButton;
		this.optionsButton = optionsButton;
		this.careersButtonBrightness = careersButtonBrightness;
		this.careersButton = careersButton;
		this.petButtonBrightness = petButtonBrightness;
		this.petButton = petButton;
		this.cyborgButtonBrightness = cyborgButtonBrightness;
		this.cyborgButton = cyborgButton;
		this.backButton = backButton;
		this.logo = logo;

		this.events.emit("scene-awake");
	}

	private screenSize!: Phaser.GameObjects.Text;
	public miniGarden!: MiniGarden;
	public superBattery!: SuperBattery;
	public adventureReminder!: AdventureReminder;
	public cardTimerExp!: CardTimer;
	public cardTimerCoin!: CardTimer;
	private achivementsButton!: Button;
	public achText!: Phaser.GameObjects.Text;
	private questsButton!: Button;
	public questText!: Phaser.GameObjects.Text;
	public tokenText1!: Phaser.GameObjects.Text;
	private eventsButton!: Button;
	public tokenText!: Phaser.GameObjects.Text;
	private shopButton!: Button;
	public shopText!: Phaser.GameObjects.Text;
	private statsButton!: Button;
	private optionsButton!: Button;
	private careersButtonBrightness!: Phaser.FX.ColorMatrix;
	private careersButton!: Button;
	private petButtonBrightness!: Phaser.FX.ColorMatrix;
	private petButton!: Button;
	private cyborgButtonBrightness!: Phaser.FX.ColorMatrix;
	private cyborgButton!: Button;
	private backButton!: Button;
	private logo!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	// Write your code here
	updateFunction;

	create() {
		this.cameras.main.setOrigin(0, 0);
		this.editorCreate();
		this.scene.sendToBack('Ui');

		this.achivementsButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Achievements</font></b>\nComplete achievements to make the Progress Bar give more EXP and Coins. They also give you bragging rights.";
		}
		this.achivementsButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.achivementsButton.pointerup = () => {
			if (_root.save.newbieProgress == 14) {
				_root.save.newbieProgress = 15;
			}
			console.warn("UNIMPLEMENTED _root.optionsScreen.gotoAndStop(6);")
			// if (_root.optionsScreen._currentframe != 6) {
			// 	_root.save.viewAchievement += 1;
			// 	console.warn("UNIMPLEMENTED _root.optionsScreen.gotoAndStop(6);")
			// 	_root.optionsScreen.gotoAndStop(6);
			// }
			// else {
			// 	_root.optionsScreen.gotoAndStop(1);
			// }
		}

		this.questsButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Quest</font></b>\nFinish quests and get awesome rewards, including Quest Tokens!";
		}
		this.questsButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.questsButton.pointerup = () => {
			console.warn("UNIMPLEMENTED quest options screen")
			// if (_root.optionsScreen._currentframe != 16 && _root.optionsScreen._currentframe != 17) {
			// 	_root.save.viewQuest += 1;
			// 	if (_root.save.questCount >= _root.save.questNeed || _root.questScreenPage == 2) {
			// 		_root.optionsScreen.gotoAndStop(17);
			// 	}
			// 	else {
			// 		_root.optionsScreen.gotoAndStop(16);
			// 	}
			// }
			// else {
			// 	_root.optionsScreen.gotoAndStop(1);
			// }
		}

		this.eventsButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Event</font></b>\nCheck which event is going on, what it is about and why it is awesome!";
		}
		this.eventsButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.eventsButton.pointerup = () => {
			console.warn("UNIMPLEMENTED events options screen")
			// if(_root.optionsScreen._currentframe != 18)
			// {
			//    _root.save.viewEvent += 1;
			//    _root.optionsScreen.gotoAndStop(18);
			// }
			// else
			// {
			//    _root.optionsScreen.gotoAndStop(1);
			// }
		}
		this.shopButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Shop</font></b>\nWhere new features, feature upgrades and other awesome things can be purchased!";
		}
		this.shopButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.shopButton.pointerup = () => {
			console.warn("UNIMPLEMENTED shop options screen")
			// if(_root.optionsScreen._currentframe < 29 || _root.optionsScreen._currentframe > 32)
			// {
			//    _root.optionsScreen.gotoAndStop(28 + _root.shopScreenPage);
			// }
			// else
			// {
			//    _root.optionsScreen.gotoAndStop(1);
			// }
		}

		this.statsButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Stats</font></b>\nView your stats!";
		}
		this.statsButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.statsButton.pointerup = () => {
			console.warn("UNIMPLEMENTED stats options screen")
			// if(_root.optionsScreen._currentframe != 5)
			// {
			//    _root.optionsScreen.gotoAndStop(5);
			// }
			// else
			// {
			//    _root.optionsScreen.gotoAndStop(1);
			// }
		}

		this.optionsButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Options</font></b>\nA bunch of confusing options to customize your gameplay.";
		}
		this.optionsButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.optionsButton.pointerup = () => {
			console.warn("UNIMPLEMENTED options options screen")
			// if(_root.optionsScreen._currentframe != 2)
			// 	{
			// 	   _root.save.viewOption += 1;
			// 	   _root.optionsScreen.gotoAndStop(2);
			// 	}
			// 	else
			// 	{
			// 	   _root.optionsScreen.gotoAndStop(1);
			// 	}
		}

		this.careersButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Careers</font></b>\nGain additional bonuses for doing stuff you usually do!\n\nRequired Level: 700";
		}
		this.careersButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.careersButton.pointerup = () => {
			if (_root.saveid == 24) {
				_root.showPopup("NOOOOOOOOO!", "You must resist your urges. You don\'t want to fail the challenge, do you?");
			}
			else if (_root.save.bestLevel >= 700) {
				console.warn("UNIMPLEMENTED careers options screen")
				// if (_root.optionsScreen._currentframe != 10) {
				// 	_root.optionsScreen.gotoAndStop(10);
				// }
				// else {
				// 	_root.optionsScreen.gotoAndStop(1);
				// }
			}
			else {
				_root.showPopup("Level 700 Required", "You have to be at least Lv. 700. Keep playing!");
			}
		}
		this.careersButton.update = () => {
			if (_root.save.bestLevel < 700) {
				this.careersButtonBrightness.brightness(0.3);
			}
			else {
				this.careersButtonBrightness.brightness(1);
			}
		}

		this.petButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Pet</font></b>\nRaise your very own pet, which gives you awesome bonuses!\n\nRequired Level: 900";
		}
		this.petButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.petButton.pointerup = () => {
			if (_root.saveid == 24) {
				_root.showPopup("NOOOOOOOOO!", "You must resist your urges. You don\'t want to fail the challenge, do you?");
			}
			else if (_root.save.bestLevel >= 900) {
				console.warn("UNIMPLEMENTED pet options screen")
				//    if(_root.optionsScreen._currentframe != 14 && _root.optionsScreen._currentframe != 15)
				//    {
				// 	  _root.optionsScreen.gotoAndStop(14);
				//    }
				//    else
				//    {
				// 	  _root.optionsScreen.gotoAndStop(1);
				//    }
			}
			else {
				_root.showPopup("Level 900 Required", "You have to be at least Lv. 900. Keep playing!");
			}
		}
		this.petButton.update = () => {
			if (_root.save.bestLevel < 900) {
				this.petButtonBrightness.brightness(0.3);
			}
			else {
				this.petButtonBrightness.brightness(1);
			}
		}

		this.cyborgButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Simulation Cyborg</font></b>\nA cyborg that can play for you!\n\nRequired Level: 1,250";
		}
		this.cyborgButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.cyborgButton.pointerup = () => {
			if (_root.save.bestLevel >= 1250 && _root.saveid < 10) {
				console.warn("UNIMPLEMENTED cyborg options screen")
				// if (_root.optionsScreen._currentframe != 27) {
				// 	_root.optionsScreen.gotoAndStop(27);
				// }
				// else {
				// 	_root.optionsScreen.gotoAndStop(1);
				// }
			}
			else if (_root.saveid >= 10) {
				_root.showPopup("Access Denied", "Simulation Cyborg is unavailable in Speedrun Mode and Challenges.");
			}
			else {
				_root.showPopup("Level 1250 Required", "You have to be at least Lv. 1250. Keep playing!");
			}
		}
		this.cyborgButton.update = () => {
			if (_root.save.bestLevel < 1250 && _root.saveid < 10) {
				this.cyborgButtonBrightness.brightness(0.3);
			}
			else {
				this.cyborgButtonBrightness.brightness(1);
			}
		}

		this.backButton.pointerover = () => {
			_root.actiondescription = "<b><font color=\'#FFFF00\'>Back to Menu</font></b>\nGo back to the main menu.";
		}
		this.backButton.pointerout = () => {
			_root.actiondescription = "";
		}
		this.backButton.pointerup = () => {
			this.scene.start('MainMenu');
			this.scene.bringToTop('Ui');
			// Keep this as the last line! Nothing else can be done
			// once the scene is removed.
			this.scene.remove("Main");
		}

		this.logo.postFX!.addGlow(0x000000, 7, 0, false, 1, 3);
		console.log(_root);
		this.updateFunction = loadMain(this);
	}

	checkBar() {
		this.achText.text = withComma(_root.awards);
		this.questText.text = Math.floor((_root.save.mainQuestC * 1 + _root.save.mainQuestB * 3 + _root.save.mainQuestA * 6 + _root.save.mainQuestS * 10) / 25) + "%";
		this.tokenText.text = withComma(_root.save.questToken);
		this.tokenText1.text = withComma(_root.save.eventToken);
		let featuresBought = 0;
		if (_root.save.featureIdleMode == true) {
			featuresBought += 1;
		}
		if (_root.save.featureBoostGen == true) {
			featuresBought += 1;
		}
		if (_root.save.featureGarden == true) {
			featuresBought += 1;
		}
		if (_root.save.featureBattleArena == true) {
			featuresBought += 1;
		}
		if (_root.save.featureButtonMachine == true) {
			featuresBought += 1;
		}
		if (_root.save.featureMoneyPrinter == true) {
			featuresBought += 1;
		}
		if (_root.save.featureArcade == true) {
			featuresBought += 1;
		}
		if (_root.save.featureStadium == true) {
			featuresBought += 1;
		}
		if (_root.save.featureTukkunFCG == true) {
			featuresBought += 1;
		}
		if (_root.save.featureLolMarket == true) {
			featuresBought += 1;
		}
		if (_root.save.featureAwesomeAdventures == true) {
			featuresBought += 1;
		}
		if (_root.save.featureFishing == true) {
			featuresBought += 1;
		}
		if (_root.save.featureEpicLicense == true) {
			featuresBought += 1;
		}
		if (_root.save.featureBoostAuto == true) {
			featuresBought += 1;
		}
		if (_root.save.featureManualSprayer == true) {
			featuresBought += 1;
		}
		if (_root.save.featureSpecialSprayer == true) {
			featuresBought += 1;
		}
		if (_root.save.featureDoomSprayer == true) {
			featuresBought += 1;
		}
		if (_root.save.featureMiniGarden == true) {
			featuresBought += 1;
		}
		if (_root.save.featureTravelingTicket == true) {
			featuresBought += 1;
		}
		if (_root.save.featureArcadePack == true) {
			featuresBought += 1;
		}
		if (_root.save.featureSuperBattery == true) {
			featuresBought += 1;
		}
		if (_root.save.featureEnergyToolbar == true) {
			featuresBought += 1;
		}
		if (_root.save.featureCardToolbar == true) {
			featuresBought += 1;
		}
		if (_root.save.featureTechnicalLight == true) {
			featuresBought += 1;
		}
		if (_root.save.stadiumH1 == true) {
			featuresBought += 1;
		}
		if (_root.save.stadiumH2 == true) {
			featuresBought += 1;
		}
		if (_root.save.stadiumH3 == true) {
			featuresBought += 1;
		}
		if (_root.save.fishRodUnlock[5] == true) {
			featuresBought += 1;
		}
		if (_root.save.fishRodUnlock[6] == true) {
			featuresBought += 1;
		}
		this.shopText.text = featuresBought + " / 29";
	}

	alt = false;
	update() {
		const { width, height } = this.game.canvas;
		this.screenSize.text = `${width}x${height} dpi=${window.devicePixelRatio
			}  text resolution=${(height / SIZE) * window.devicePixelRatio}`;

		this.updateFunction();

		this.alt = !this.alt;
		if (this.alt) {
			this.checkBar();
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Main };
