import { _root } from "@/flash/root";
import { BoostGenerator } from "./BoostGenerator";

enum BoostKind {
	Blue,
	Yellow,
	Purple
}

/**
 * Returns the min and max boost for a given boost level.
 */
function getMinMaxBoost(boostKind: BoostKind) {
	switch (boostKind) {
		case BoostKind.Blue:
			return [_root.boostMin, _root.boostMax];
		case BoostKind.Yellow:
			return [_root.boostMax, _root.boostMax * 1.5];
		case BoostKind.Purple:
			return [_root.boostMax * 1.5, _root.boostMax * 2.5];
	}
}

// You can write more code here
export
	/* START OF COMPILED CODE */

	class Boost extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? -1, y ?? 0);

		// background
		const background = scene.add.ellipse(0, 0, 100, 100);
		background.setOrigin(0, 0);
		background.isFilled = true;
		background.fillColor = 5170;
		this.add(background);

		// blueBoost
		const blueBoost = scene.add.image(50, 50, "blue-boost");
		blueBoost.setOrigin(0.5, 0);
		this.add(blueBoost);

		// yellowBoost
		const yellowBoost = scene.add.image(50, 50, "yellow-boost");
		yellowBoost.setOrigin(0.5, 0);
		this.add(yellowBoost);

		// purpleBoost
		const purpleBoost = scene.add.image(50, 50, "purple-boost");
		purpleBoost.setOrigin(0.5, 0);
		this.add(purpleBoost);

		// boost_bg
		const boost_bg = scene.add.image(50, 50, "boost-bg");
		boost_bg.scaleX = 0.25;
		boost_bg.scaleY = 0.25;
		this.add(boost_bg);

		// boostLabel
		const boostLabel = scene.add.text(0, 22.5, "", {});
		boostLabel.text = "Boost";
		boostLabel.setStyle({ "align": "center", "color": "#0099FF", "fixedWidth": 100, "fontFamily": "IDLE PLANET", "fontSize": "8px" });
		this.add(boostLabel);

		// boostText
		const boostText = scene.add.text(0, 35, "", {});
		boostText.text = "100%";
		boostText.setStyle({ "align": "center", "color": "#ff0", "fixedWidth": 100, "fontFamily": "IDLE PLANET", "fontSize": "8px", "stroke": "#ffffff66", "shadow.color": "#ffffffff", "shadow.blur": 3, "shadow.stroke": true });
		this.add(boostText);

		// ant_logo
		const ant_logo = scene.add.image(30, 59, "ant-logo");
		ant_logo.scaleX = 0.25;
		ant_logo.scaleY = 0.25;
		this.add(ant_logo);

		// antText
		const antText = scene.add.text(44, 55, "", {});
		antText.text = "x0005";
		antText.setStyle({ "align": "right", "color": "#ccc", "fontFamily": "IDLE PLANET", "fontSize": "8px", "stroke": "#ffffff66", "shadow.color": "#ffffffff", "shadow.blur": 3, "shadow.stroke": true });
		this.add(antText);

		// antTextGray
		const antTextGray = scene.add.text(44, 55, "", {});
		antTextGray.text = "x000";
		antTextGray.setStyle({ "color": "#444444", "fontFamily": "IDLE PLANET", "fontSize": "8px", "stroke": "#ffffff66", "shadow.color": "#ffffffff", "shadow.blur": 3, "shadow.stroke": true });
		this.add(antTextGray);

		// boostGenerator
		const boostGenerator = new BoostGenerator(scene, 50, 25);
		this.add(boostGenerator);

		this.boostText = boostText;
		this.antText = antText;
		this.antTextGray = antTextGray;

		/* START-USER-CTR-CODE */

		this.boosts = {
			[BoostKind.Blue]: blueBoost,
			[BoostKind.Yellow]: yellowBoost,
			[BoostKind.Purple]: purpleBoost,
		};
		this.scene.events.once('scene-awake', () => {
			_root.checkBoostRot = 0;
		});
		this.scene.events.on("update", this.update, this);
		this.scene.events.once('shutdown', () => {
			scene.events.removeAllListeners();
		});
		/* END-USER-CTR-CODE */
	}

	private boostText: Phaser.GameObjects.Text;
	private antText: Phaser.GameObjects.Text;
	private antTextGray: Phaser.GameObjects.Text;

	/* START-USER-CODE */
	boosts: { [key in BoostKind]: Phaser.GameObjects.Image };
	targetRotations = {
		[BoostKind.Blue]: 0,
		[BoostKind.Yellow]: 0,
		[BoostKind.Purple]: 0,
	}
	tempBoost = 0;

	update() {
		[BoostKind.Blue, BoostKind.Yellow, BoostKind.Purple].forEach((boostKind) => {
			const [tempMin, tempMax] = getMinMaxBoost(boostKind);
			if (_root.save.boost < tempMin) {
				this.targetRotations[boostKind] = 0;
			}
			else if (_root.save.boost > tempMax) {
				this.targetRotations[boostKind] = 180;
			}
			else {
				this.targetRotations[boostKind] = (_root.save.boost - tempMin) / (tempMax - tempMin) * 180;
			}
			let rotation = this.boosts[boostKind].angle;
			let targetRotation = this.targetRotations[boostKind];
			// Phaser does not allow a 180 degree rotation, it sets it
			// as -180. However this code relies on the degrees being equal.
			// So if we end up setting a -180, pretend it's a 180 degree rotation.
			if (rotation == -180) {
				rotation = 180;
			}
			if (rotation !== targetRotation) {
				this.boosts[boostKind].angle = rotation + (targetRotation - rotation) / 2;
			}
		})

		if (_root.checkBoostRot > 0) {
			_root.checkBoostRot -= 1;
		}
		if (this.tempBoost != Math.round(_root.save.boost)) {
			this.tempBoost = Math.round(_root.save.boost);
			this.boostText.text = Math.round(_root.save.boost) + "%";
			_root.checkBoostRot = 20;
		}
		const antCount = _root.save.ants;
		if (antCount < 0) {
			this.antTextGray.text = "-----"
			this.antText.text = "-----"
		}
		else if (antCount >= 0 && antCount < 10) {
			this.antTextGray.text = "x000"
			this.antText.text = "x000" + _root.save.ants;
		}
		else if (antCount >= 10 && antCount < 100) {
			this.antTextGray.text = "x00"
			this.antText.text = "x00" + _root.save.ants;
		}
		else if (antCount >= 100 && antCount < 1000) {
			this.antTextGray.text = "x0"
			this.antText.text = "x0" + _root.save.ants;
		} else if (antCount <= 9999) {
			this.antTextGray.text = ""
			this.antText.text = "x" + _root.save.ants;
		} else {
			this.antTextGray.text = ""
			this.antText.text = _root.save.ants;
		}
		// UNIMPLEMENTED ant spraycooldown
		// if (_root.sprayCooldown1 > 0 && _root.sprayCooldown2 > 0) {
		// 	antDisp = "<font color=\'#888888\'>" + antDisp + "</font>";
		// }
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
