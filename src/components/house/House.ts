import { Feature } from "@/lib/feature";
import { BattleArena } from "@/scenes/battle-arena/BattleArena";

const FEATURE_TO_SCENE = {
	[Feature.Dragon]: null,
}

const ABS_H = 10;
const ABS_W = 80;
const WIDTH = 500;
const HEIGHT = 350;

// You can write more code here
export
	/* START OF COMPILED CODE */

	class House extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// blackOutline
		const blackOutline = scene.add.rectangle(0, 0, 500, 350);
		blackOutline.setOrigin(0, 0);
		blackOutline.isFilled = true;
		blackOutline.fillColor = 0;
		this.add(blackOutline);

		// rectangle
		const rectangle = scene.add.rectangle(0, 0, 500, 350);
		rectangle.setOrigin(0, 0);
		rectangle.isFilled = true;
		rectangle.isStroked = true;
		rectangle.strokeColor = 0;
		this.add(rectangle);

		/* START-USER-CTR-CODE */
		this.scene.events.once('scene-awake', () => {
			// HACK: just go to ba for now
			const sceneManager = this.scene.game.scene;
			sceneManager.add('BattleArena', BattleArena, true, { x: x, y: y, w: WIDTH, h: HEIGHT });
			//sceneManager.start('BattleArena');
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
