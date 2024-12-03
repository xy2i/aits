
// You can write more code here

import { _root } from "@/flash/root";
import { harvestAllTree } from "@/lib/garden";

/* START OF COMPILED CODE */

class MiniGarden extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// mini_garden_bg
		const mini_garden_bg = scene.add.image(0, 0, "mini-garden-bg");
		mini_garden_bg.scaleX = 0.25;
		mini_garden_bg.scaleY = 0.25;
		mini_garden_bg.setOrigin(0, 0);
		this.add(mini_garden_bg);

		// miniGardenText
		const miniGardenText = scene.add.text(15, 0, "", {});
		miniGardenText.text = "1 / 1";
		miniGardenText.setStyle({ "align": "right", "color": "#FFFF00", "fixedWidth": 70, "fixedHeight": 20.3, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px", "fontStyle": "bold" });
		miniGardenText.setPadding({ "top": 6 });
		this.add(miniGardenText);

		// mini_garden_tree
		const mini_garden_tree = scene.add.image(0, 0, "mini-garden-tree");
		mini_garden_tree.scaleX = 0.2;
		mini_garden_tree.scaleY = 0.2;
		mini_garden_tree.setOrigin(0, 0);
		this.add(mini_garden_tree);

		this.miniGardenText = miniGardenText;

		/* START-USER-CTR-CODE */
		mini_garden_bg
			.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup());
		this.miniGardenText.postFX!.addGlow(0x000000, 2, 0, false, 0.25, 5);
		this.scene.events.once("scene-awake", () => {
		})
		this.scene.events.on("update", this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	private miniGardenText: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	rounded: Phaser.GameObjects.Graphics;
	checkDelay = 80;
	readyTrees = 0;

	pointerover() {
		_root.actiondescription = "<b><font color=\'#FFFF00\'>Mini Garden</font></b>\nDisplays the number of trees ready for harvest (on the left) and the number of trees planted (on the right). You can click to harvest all ready trees without going to the Garden. It costs you 2 Green Coins though. Don\'t ask why.";
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerup() {
		if (_root.save.greenCoin >= 2) {
			_root.save.greenCoin -= 2;
		}
		harvestAllTree();
		this.checkDelay = 80;
	}
	update() {
		this.checkDelay += 1;
		if (this.checkDelay > 80) {
			if (_root.save.featureMiniGarden == true || _root.save.autoHarvestTime > 0) {
				this.setVisible(true);
				let plantedTrees = 0;
				this.readyTrees = 0;
				let i = 1;
				while (i <= _root.save.gardenCapacity) {
					if (_root.save.gardenTrees[i] > 0 && _root.save.gardenPurchaseTime[i] + _root.save.gardenExpiryTime[i] - _root.systemtimenow > 0) {
						plantedTrees += 1;
						if (_root.save.gardenRecentTime[i] + _root.save.gardenHarvestTime[i] - _root.systemtimenow <= 0) {
							this.readyTrees += 1;
						}
					}
					i++;
				}
				this.miniGardenText.text = this.readyTrees + " / " + plantedTrees;
				if (this.readyTrees > 0) {
					this.miniGardenText.tint = 0xffff00;
					if (_root.save.autoHarvestTime > 0) {
						_root.harvestAllTree();
					}
				}
				else if (plantedTrees == 0) {
					this.miniGardenText.tint = 0xff0000;
				}
				else {
					this.miniGardenText.tint = 0x999999;
				}
			}
			else {
				this.setVisible(false);
			}
			this.checkDelay = 0;
		}
		if (this.readyTrees > 0) {
			this.alpha = 1;
			if (this.checkDelay >= 20 && this.checkDelay < 40 || this.checkDelay >= 60 && this.checkDelay < 80) {
				this.alpha = 0.5;
			}
		}
		else {
			this.alpha = 0.3;
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { MiniGarden };
