
// You can write more code here

import { _root } from "@/flash/root";

function tabMessage(tabNumber: number) {
	if (tabNumber === 5) {
		return "<font color=\'#FFFF00\'><b>Current Feature</b></font>\nThis tab contains Breaking News messages related to the feature you are currently using.";
	}
	return `<font color=\'#FFFF00\'><b>Tab ${tabNumber}</b></font>\nEach tab contains different kinds of messages. It is possible to configure which messages appear in which tabs.`;
}
/* START OF COMPILED CODE */

class NewsTabButton extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? -0.36934818263879177, y ?? -2.2757816623874842);

		// top
		const top = scene.add.polygon(0, 0, "5 0 55 0 60 5 55 10 5 10 0 5");
		top.setOrigin(0, 0);
		top.isFilled = true;
		top.fillColor = 8870445;
		top.strokeColor = 0;
		top.lineWidth = 2;
		this.add(top);

		// bottom
		const bottom = scene.add.polygon(0, 0, "0 5 0 20 60 20 60 5 55 10 5 10");
		bottom.setOrigin(0, 0);
		bottom.isFilled = true;
		bottom.fillColor = 8540190;
		bottom.strokeColor = 0;
		bottom.lineWidth = 2;
		this.add(bottom);

		// text_1
		const text_1 = scene.add.text(0, 0.5, "", {});
		text_1.alpha = 0.7;
		text_1.alphaTopLeft = 0.7;
		text_1.alphaTopRight = 0.7;
		text_1.alphaBottomLeft = 0.7;
		text_1.alphaBottomRight = 0.7;
		text_1.text = "1";
		text_1.setStyle({ "align": "center", "color": "#f0cd64", "fixedWidth": 60, "fixedHeight": 20, "fontFamily": "Tempesta Seven Extended", "fontSize": "10px", "maxLines": 2 });
		text_1.setPadding({"top":4});
		this.add(text_1);

		// outline
		const outline = scene.add.polygon(0, 0, "5 0 55 0 60 5 60 20 0 20 0 5");
		outline.setOrigin(0, 0);
		outline.fillColor = 7885137;
		outline.isStroked = true;
		outline.strokeColor = 0;
		outline.lineWidth = 2;
		this.add(outline);

		// current
		const current = scene.add.text(0.35647737979888916, -2.6926069259643555, "", {});
		current.alpha = 0.7;
		current.alphaTopLeft = 0.7;
		current.alphaTopRight = 0.7;
		current.alphaBottomLeft = 0.7;
		current.alphaBottomRight = 0.7;
		current.text = "CURRENT";
		current.setStyle({ "align": "center", "color": "#f0cd64", "fixedWidth": 60, "fixedHeight": 20, "fontFamily": "Tempesta Seven Extended", "fontSize": "8px", "maxLines": 2 });
		current.setPadding({ "top": 4 });
		this.add(current);

		// feature
		const feature = scene.add.text(0.7258239984512329, 5.583174705505371, "", {});
		feature.alpha = 0.7;
		feature.alphaTopLeft = 0.7;
		feature.alphaTopRight = 0.7;
		feature.alphaBottomLeft = 0.7;
		feature.alphaBottomRight = 0.7;
		feature.text = "FEATURE";
		feature.setStyle({ "align": "center", "color": "#f0cd64", "fixedWidth": 60, "fixedHeight": 20, "fontFamily": "Tempesta Seven Extended", "fontSize": "8px", "maxLines": 2 });
		feature.setPadding({ "top": 4 });
		this.add(feature);

		this.top = top;
		this.bottom = bottom;

		/* START-USER-CTR-CODE */
		outline
			.setInteractive({ useHandCursor: true })
			.on("pointerover", () => this.pointerover())
			.on("pointerout", () => this.pointerout())
			.on("pointerup", () => this.pointerup());

		this.scene.events.once("scene-awake", () => {
			current.setVisible(false);
			feature.setVisible(false);

			text_1.text = this.tabNumber;
			if (this.tabNumber === 5) {
				text_1.setVisible(false);
				current.setVisible(true);
				feature.setVisible(true);
			}
		});
		this.scene.events.on("update", this.update, this);
		/* END-USER-CTR-CODE */
	}

	private top: Phaser.GameObjects.Polygon;
	private bottom: Phaser.GameObjects.Polygon;
	public tabNumber: number = 1;

	/* START-USER-CODE */
	update() {
		if (_root.curTab == this.tabNumber) {
			this.top.fillColor = 0x875a2d;
			this.top.alpha = 1;
			this.bottom.fillColor = 0x82501e;
			this.bottom.alpha = 1;
		} else {
			this.top.fillColor = 0x2d2d2d;
			this.top.alpha = .7;
			this.bottom.fillColor = 0x1e1e1e;
			this.bottom.alpha = .7;
		}
	}

	pointerover() {
		_root.actiondescription = tabMessage(this.tabNumber);
	}
	pointerout() {
		_root.actiondescription = "";
	}
	pointerup() {
		_root.curTab = this.tabNumber;
		_root.saveGlobal.defTab = this.tabNumber;
		_root.updateBreakNews = 1;
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { NewsTabButton };
