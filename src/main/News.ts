import { _root } from "@/flash/root";
import { currentFeature } from "@/lib/feature";
import { NewsMode } from "./NewsMode";
import { NewsScrollBar } from "./NewsScrollBar";
import { NewsSetting } from "./NewsSetting";
import { NewsTabButton } from "./NewsTabButton";
import { UpButton } from "./UpButton";

// You can write more code here

/* START OF COMPILED CODE */

class News extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(0, 20, 500, 80);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.alpha = 0.8;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		rectangle_1.fillAlpha = 0.8;
		this.add(rectangle_1);

		// newsTabButton
		const newsTabButton = new NewsTabButton(scene, 20, 0);
		this.add(newsTabButton);

		// newsTabButton_1
		const newsTabButton_1 = new NewsTabButton(scene, 80, 0);
		this.add(newsTabButton_1);

		// newsTabButton_2
		const newsTabButton_2 = new NewsTabButton(scene, 140, 0);
		this.add(newsTabButton_2);

		// newsTabButton_3
		const newsTabButton_3 = new NewsTabButton(scene, 200, 0);
		this.add(newsTabButton_3);

		// newsTabButton_4
		const newsTabButton_4 = new NewsTabButton(scene, 260, 0);
		this.add(newsTabButton_4);

		// upButton
		const upButton = new UpButton(scene, 0, 20);
		upButton.alpha = 0.5;
		this.add(upButton);

		// downButton
		const downButton = new UpButton(scene, 0, 81);
		downButton.alpha = 0.5;
		this.add(downButton);

		// superbreak1
		const superbreak1 = scene.add.text(21, 25, "", {});
		superbreak1.text = "[00:00:00]";
		superbreak1.setStyle({ "fontFamily": "Tempesta Seven Extended", "fontSize": "8px" });
		this.add(superbreak1);

		// superbreak2
		const superbreak2 = scene.add.text(21, 45, "", {});
		superbreak2.text = "[00:00:00]";
		superbreak2.setStyle({ "fontFamily": "Tempesta Seven Extended", "fontSize": "8px" });
		this.add(superbreak2);

		// superbreak3
		const superbreak3 = scene.add.text(21, 65, "", {});
		superbreak3.text = "[00:00:00]";
		superbreak3.setStyle({ "fontFamily": "Tempesta Seven Extended", "fontSize": "8px" });
		this.add(superbreak3);

		// superbreak4
		const superbreak4 = scene.add.text(21, 85, "", {});
		superbreak4.text = "[00:00:00]";
		superbreak4.setStyle({ "fontFamily": "Tempesta Seven Extended", "fontSize": "8px" });
		this.add(superbreak4);

		// superbreak1a
		const superbreak1a = scene.add.text(83, 25, "", {});
		superbreak1a.setStyle({ "fontFamily": "Tempesta Seven", "fontSize": "8px" });
		this.add(superbreak1a);

		// superbreak2a
		const superbreak2a = scene.add.text(83, 45, "", {});
		superbreak2a.setStyle({ "fontFamily": "Tempesta Seven", "fontSize": "8px" });
		this.add(superbreak2a);

		// superbreak3a
		const superbreak3a = scene.add.text(83, 65, "", {});
		superbreak3a.setStyle({ "fontFamily": "Tempesta Seven", "fontSize": "8px" });
		this.add(superbreak3a);

		// superbreak4a
		const superbreak4a = scene.add.text(83, 85, "", {});
		superbreak4a.setStyle({ "fontFamily": "Tempesta Seven", "fontSize": "8px" });
		this.add(superbreak4a);

		// newsMode
		const newsMode = new NewsMode(scene, 480.5, 0);
		this.add(newsMode);

		// newsSetting
		const newsSetting = new NewsSetting(scene, -1, -1);
		this.add(newsSetting);

		// rectangle_2
		const rectangle_2 = scene.add.rectangle(0, 20, 500, 80.5);
		rectangle_2.setOrigin(0, 0);
		rectangle_2.alpha = 0.8;
		rectangle_2.fillColor = 0;
		rectangle_2.fillAlpha = 0.8;
		rectangle_2.isStroked = true;
		rectangle_2.strokeColor = 0;
		rectangle_2.lineWidth = 2;
		this.add(rectangle_2);

		// rectangle_3
		const rectangle_3 = scene.add.rectangle(0, 20, 20, 80.5);
		rectangle_3.setOrigin(0, 0);
		rectangle_3.alpha = 0.8;
		rectangle_3.fillColor = 0;
		rectangle_3.fillAlpha = 0.8;
		rectangle_3.isStroked = true;
		rectangle_3.strokeColor = 0;
		rectangle_3.lineWidth = 2;
		this.add(rectangle_3);

		// newsScrollBar
		const newsScrollBar = new NewsScrollBar(scene, 0, 40);
		this.add(newsScrollBar);

		// newsTabButton (prefab fields)
		newsTabButton.tabNumber = 1;

		// newsTabButton_1 (prefab fields)
		newsTabButton_1.tabNumber = 2;

		// newsTabButton_2 (prefab fields)
		newsTabButton_2.tabNumber = 3;

		// newsTabButton_3 (prefab fields)
		newsTabButton_3.tabNumber = 4;

		// newsTabButton_4 (prefab fields)
		newsTabButton_4.tabNumber = 5;

		// upButton (prefab fields)
		upButton.pointerup;
		upButton.direction = "up";

		// downButton (prefab fields)
		downButton.pointerup;
		downButton.direction = "down";

		this.superbreak1 = superbreak1;
		this.superbreak2 = superbreak2;
		this.superbreak3 = superbreak3;
		this.superbreak4 = superbreak4;
		this.superbreak1a = superbreak1a;
		this.superbreak2a = superbreak2a;
		this.superbreak3a = superbreak3a;
		this.superbreak4a = superbreak4a;

		/* START-USER-CTR-CODE */
		upButton.pointerup = () => {
			if (_root.breakoffset > 0) {
				_root.breakoffset -= 4;
				if (_root.breakoffset < 0) {
					_root.breakoffset = 0;
				}
				_root.updateBreakNews = 1;
			}
		}
		downButton.pointerup = () => {
			if (_root.breakoffset < 26) {
				_root.breakoffset += 4;
				if (_root.breakoffset > 26) {
					_root.breakoffset = 26;
				}
				_root.updateBreakNews = 1;
			}
		}

		this.scene.events.once("scene-awake", () => {
			if (_root.saveGlobal.defTab == 0) {
				_root.saveGlobal.defTab = 2;
			}
			_root.curTab = _root.saveGlobal.defTab;
			_root.breakoffset = 0;
			this.updateNews();
		})
		this.scene.events.on('update', this.update, this);
		/* END-USER-CTR-CODE */
	}

	private superbreak1: Phaser.GameObjects.Text;
	private superbreak2: Phaser.GameObjects.Text;
	private superbreak3: Phaser.GameObjects.Text;
	private superbreak4: Phaser.GameObjects.Text;
	private superbreak1a: Phaser.GameObjects.Text;
	private superbreak2a: Phaser.GameObjects.Text;
	private superbreak3a: Phaser.GameObjects.Text;
	private superbreak4a: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	tempFeature = 0;

	updateNews() {
		let b;
		let fr;
		if (_root.curTab <= 4) {
			b = 1;
			while (b <= 4) {
				let c = b + _root.breakoffset;
				this["superbreak" + b].text = _root["X" + _root.curTab + "breakStamp" + c];
				this["superbreak" + b].tint = _root["X" + _root.curTab + "breakColor" + c];
				this["superbreak" + b + "a"].text = _root["X" + _root.curTab + "breakNews" + c];
				this["superbreak" + b + "a"].tint = _root["X" + _root.curTab + "breakColor" + c];
				b++;
			}
		}
		else if (_root.curTab == 5) {
			fr = currentFeature;
			b = 1;
			while (b <= 4) {
				let c = b + _root.breakoffset;
				this["superbreak" + b].text = _root["F" + fr + "breakStamp" + c];
				this["superbreak" + b].tint = _root["F" + _root.curTab + "breakColor" + c];
				this["superbreak" + b + "a"].text = _root["F" + fr + "breakNews" + c];
				this["superbreak" + b + "a"].tint = _root["F" + _root.curTab + "breakColor" + c];
				b++;
			}
		}
	}

	update() {
		if (currentFeature != this.tempFeature) {
			_root.updateBreakNews = 1;
			this.tempFeature = currentFeature;
		}
		if (_root.updateBreakNews == 1) {
			this.updateNews();
			_root.updateBreakNews = 0;
		}
	};

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { News };
