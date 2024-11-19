
// You can write more code here

import { _root } from "@/flash/root";
import { COIN_HARDCAP, CoinType } from "@/lib/coin";
import { withComma } from "@/lib/format";
import { AscentDisp } from "./AscentDisp";
import { Coin } from "./Coin";
import { ExpBar } from "./ExpBar";
import { Overcap } from "./Overcap";

function dispOverGC() {
	var _loc3_ = Math.floor(_root.save.greenCoin / 1000000000);
	var _loc2_ = Math.floor(_root.save.greenCoin % 1000000000 / 10000000);
	if (_loc2_ < 10) {
		_loc2_ = "0" + _loc2_;
	}
	return _loc3_ + "." + _loc2_ + "B";
}
function dispOverBC() {
	var _loc3_ = Math.floor(_root.save.blueCoin / 1000000);
	var _loc2_ = Math.floor(_root.save.blueCoin % 1000000 / 10000);
	if (_loc2_ < 10) {
		_loc2_ = "0" + _loc2_;
	}
	return _loc3_ + "." + _loc2_ + "M";
}

/* START OF COMPILED CODE */

class TopBar extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(0, 0, 650, 70);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		rectangle_1.fillAlpha = 0.5;
		this.add(rectangle_1);

		// coin
		const coin = new Coin(scene, 5, 7.5);
		this.add(coin);

		// coin_1
		const coin_1 = new Coin(scene, 5, 37);
		this.add(coin_1);

		// coin_2
		const coin_2 = new Coin(scene, 122, 37.5);
		this.add(coin_2);

		// coinText
		const coinText = scene.add.text(32, 15, "", {});
		coinText.text = "1,000,000,000,000";
		coinText.setStyle({ "color": "#ffff00", "fixedWidth": 190, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });
		this.add(coinText);

		// greenCoinText
		const greenCoinText = scene.add.text(32, 45, "", {});
		greenCoinText.text = "1,00B";
		greenCoinText.setStyle({ "color": "#66FF00", "fixedWidth": 100, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });
		this.add(greenCoinText);

		// blueCoinText
		const blueCoinText = scene.add.text(149, 45, "", {});
		blueCoinText.text = "1,00B";
		blueCoinText.setStyle({ "color": "#0099ff", "fixedWidth": 100, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px" });
		this.add(blueCoinText);

		// overcap
		const overcap = new Overcap(scene, 35, 10);
		this.add(overcap);

		// overcap_1
		const overcap_1 = new Overcap(scene, 35, 40);
		this.add(overcap_1);

		// overcap_2
		const overcap_2 = new Overcap(scene, 152, 40);
		this.add(overcap_2);

		// titleText
		const titleText = scene.add.text(200, 41, "", {});
		titleText.text = "Title";
		titleText.setStyle({ "align": "center", "color": "#e5e5e5", "fixedWidth": 220, "fixedHeight": 21.3, "fontFamily": "McLaren", "fontSize": "12px" });
		this.add(titleText);

		// nameText
		const nameText = scene.add.text(185, 16, "", {});
		nameText.text = "Name";
		nameText.setStyle({ "align": "center", "color": "#e5e5e5", "fixedWidth": 240, "fixedHeight": 28.4, "fontFamily": "McLaren", "fontSize": "17px" });
		this.add(nameText);

		// expBar
		const expBar = new ExpBar(scene, 400, 25);
		this.add(expBar);

		// ascentDisp
		const ascentDisp = new AscentDisp(scene, 400, 2.5);
		this.add(ascentDisp);

		// coin_1 (prefab fields)
		coin_1.coinType = "green";

		// coin_2 (prefab fields)
		coin_2.coinType = "blue";

		// overcap_1 (prefab fields)
		overcap_1.coinType = "green";

		// overcap_2 (prefab fields)
		overcap_2.coinType = "blue";

		this.coinText = coinText;
		this.greenCoinText = greenCoinText;
		this.blueCoinText = blueCoinText;
		this.titleText = titleText;
		this.nameText = nameText;

		/* START-USER-CTR-CODE */
		this.scene.events.once("scene-awake", () => {
			let kongName = _root.kongregate_username;
			if (kongName == undefined || kongName == "Guest") {
				kongName = _root.save.displayName;
			}
			nameText.text = kongName;
			titleText.text = _root.save.userTitle;
		});

		this.scene.events.on('update', this.update, this);
		/* END-USER-CTR-CODE */
	}

	private coinText: Phaser.GameObjects.Text;
	private greenCoinText: Phaser.GameObjects.Text;
	private blueCoinText: Phaser.GameObjects.Text;
	private titleText: Phaser.GameObjects.Text;
	private nameText: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	update() {
		if (_root.save.coin > COIN_HARDCAP[CoinType.Yellow]) {
			_root.save.coin = COIN_HARDCAP[CoinType.Yellow];
		}
		if (_root.save.greenCoin > COIN_HARDCAP[CoinType.Green]) {
			_root.save.greenCoin = COIN_HARDCAP[CoinType.Green];
		}
		if (_root.save.blueCoin > COIN_HARDCAP[CoinType.Blue]) {
			_root.save.blueCoin = COIN_HARDCAP[CoinType.Blue];
		}
		if (_root.save.whiteCoin > COIN_HARDCAP[CoinType.White]) {
			_root.save.whiteCoin = COIN_HARDCAP[CoinType.White];
		}
		this.coinText.text = withComma(_root.save.coin);
		if (_root.save.coin >= 1_000_000_000_000) {
			this.coinText.text = "    " + withComma(_root.save.coin);
		}
		this.greenCoinText.text = withComma(_root.save.greenCoin);
		if (_root.save.greenCoin >= 1_000_000_000) {
			this.greenCoinText.text = "    " + dispOverGC();
		}
		this.blueCoinText.text = withComma(_root.save.blueCoin);
		if (_root.save.blueCoin >= 1_000_000) {
			this.blueCoinText.text = "    " + dispOverBC();
		}
	}

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { TopBar };
