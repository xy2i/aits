import { _root } from "@/flash/root";

// You can write more code here
function getDisp() {
	switch (_root.save.breakNewsMode) {
		case 1: {
			_root.actiondescription = "Breaking News Mode:\n<b>Normal</b>\n\nAll Breaking News messages are loaded, including ones that are not displayed in the currently selected tab. You can read those messages when switching to corresponding tabs. Recommended if you switch Breaking News tabs often and don\'t want to miss any Breaking News messages, but may cause lag on slower computers.\n\nClick here to switch mode";
			break;
		}
		case 2: {
			_root.actiondescription = "Breaking News Mode:\n<b>Current Tab Only</b>\n\nOnly messages that appear in the currently selected tab are loaded. All other tabs are frozen. Recommended for slower computers, but may cause you to miss important messages.\n\nClick here to switch mode";
			break;
		}
		case 3: {
			_root.actiondescription = "Breaking News Mode:\n<b>Frozen</b>\n\nNo Breaking News messages are loaded. Recommended for slow computers, but it may be difficult to tell what is going on.\n\nClick here to switch mode";
			break;
		}
	}
}
/* START OF COMPILED CODE */

class NewsMode extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// top
		const top = scene.add.polygon(0, 0, "5 0 15 0 20 5 15 10 5 10 0 5");
		top.setOrigin(0, 0);
		top.isFilled = true;
		top.fillColor = 4618310;
		top.strokeColor = 0;
		this.add(top);

		// bottom
		const bottom = scene.add.polygon(0, 5, "0 0 0 15 20 15 20 0 15 5 5 5");
		bottom.setOrigin(0, 0);
		bottom.isFilled = true;
		bottom.fillColor = 3960380;
		bottom.strokeColor = 0;
		this.add(bottom);

		// play
		const play = scene.add.triangle(0, 0, 7, 2.5, 7, 17.5, 15, 10);
		play.setOrigin(0, 0);
		play.isFilled = true;
		play.fillColor = 9894450;
		this.add(play);

		// pause
		const pause = scene.add.ellipse(10, 10, 13, 13);
		pause.fillColor = 13158440;
		pause.isStroked = true;
		pause.strokeColor = 13158440;
		pause.lineWidth = 2;
		this.add(pause);

		// outline
		const outline = scene.add.polygon(0, 0, "5 0 15 0 20 5 20 20 0 20 0 5");
		outline.setOrigin(0, 0);
		outline.fillColor = 3960380;
		outline.isStroked = true;
		outline.strokeColor = 0;
		outline.lineWidth = 2;
		this.add(outline);

		// stop
		const stop = scene.add.container(5, 5);
		this.add(stop);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(0, 0, 4, 10);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 16396850;
		stop.add(rectangle_1);

		// rectangle
		const rectangle = scene.add.rectangle(6, 0, 4, 10);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.fillColor = 16396850;
		stop.add(rectangle);

		this.top = top;
		this.bottom = bottom;
		this.play = play;
		this.pause = pause;
		this.stop = stop;

		/* START-USER-CTR-CODE */
		this.scene.events.once("scene-awake", () => {
			outline.setInteractive({ useHandCursor: true })
				.on("pointerover", () => this.pointerover())
				.on("pointerout", () => this.pointerout())
				.on("pointerup", () => this.pointerup());
			this.updateStyle();
		})
		this.scene.events.on('update', this.update, this);
		/* END-USER-CTR-CODE */
	}

	private top: Phaser.GameObjects.Polygon;
	private bottom: Phaser.GameObjects.Polygon;
	private play: Phaser.GameObjects.Triangle;
	private pause: Phaser.GameObjects.Ellipse;
	private stop: Phaser.GameObjects.Container;

	/* START-USER-CODE */
	stylePlay() {
		this.pause.setVisible(false);
		this.stop.setVisible(false);
		this.play.setVisible(true);
		this.top.fillColor = 0x467846;
		this.bottom.fillColor = 0x3c6e3c;
	}
	stylePause() {
		this.play.setVisible(false);
		this.stop.setVisible(false);
		this.pause.setVisible(true);
		this.top.fillColor = 0x787846;
		this.bottom.fillColor = 0x6e6e3c;
	}
	styleStop() {
		this.play.setVisible(false);
		this.pause.setVisible(false);
		this.stop.setVisible(true);
		this.top.fillColor = 0x784646;
		this.bottom.fillColor = 0x6e3c3c;
	}
	updateStyle() {
		switch (_root.save.breakNewsMode) {
			case 1: {
				this.stylePlay();
				break;
			}
			case 2: {
				this.stylePause();
				break;
			}
			case 3: {
				this.styleStop();
				break;
			}
		}
	}

	pointerup() {
		_root.save.breakNewsMode += 1;
		if (_root.save.breakNewsMode > 3) {
			_root.save.breakNewsMode = 1;
		}
		getDisp();
		this.updateStyle()
	}
	pointerover() {
		getDisp();
	}
	pointerout() {
		_root.actiondescription = "";
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { NewsMode };
