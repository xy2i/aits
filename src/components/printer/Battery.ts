
// You can write more code here

import { _root } from "@/flash/root";

const BAR_COLORS = [
	0xffffff,
	0xff0000,
	0xffff00,
	0x00cc00,
	0x0066ff,
	0xff00ff,
]

/* START OF COMPILED CODE */

class Battery extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// bar1
		const bar1 = scene.add.rectangle(21, 11, 10, 20);
		bar1.setOrigin(0, 0);
		bar1.isFilled = true;
		bar1.fillColor = 0;
		this.add(bar1);

		// bar2
		const bar2 = scene.add.rectangle(40, 11, 10, 20);
		bar2.setOrigin(0, 0);
		bar2.isFilled = true;
		bar2.fillColor = 0;
		this.add(bar2);

		// bar3
		const bar3 = scene.add.rectangle(60, 11, 10, 20);
		bar3.setOrigin(0, 0);
		bar3.isFilled = true;
		bar3.fillColor = 0;
		this.add(bar3);

		// bar4
		const bar4 = scene.add.rectangle(80, 10, 10, 20);
		bar4.setOrigin(0, 0);
		bar4.isFilled = true;
		bar4.fillColor = 0;
		this.add(bar4);

		// battery
		const battery = scene.add.image(0, 0, "battery");
		battery.setOrigin(0, 0);
		this.add(battery);

		this.bar1 = bar1;
		this.bar2 = bar2;
		this.bar3 = bar3;
		this.bar4 = bar4;

		/* START-USER-CTR-CODE */
		this.scene.events.on('update', this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		this.bars = [bar1, bar2, bar3, bar4];
		/* END-USER-CTR-CODE */
	}

	private bar1: Phaser.GameObjects.Rectangle;
	private bar2: Phaser.GameObjects.Rectangle;
	private bar3: Phaser.GameObjects.Rectangle;
	private bar4: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */
	bars: Phaser.GameObjects.Rectangle[];
	update() {
		let ratio = 0;
		this.bars.forEach(bar => {
			let fr = Math.ceil(_root.save.printerCharge / 40 - ratio);
			if (fr > 5) {
				fr = 5;
			}
			bar.fillColor = BAR_COLORS[fr];
			ratio += 0.25;
		})
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { Battery };
