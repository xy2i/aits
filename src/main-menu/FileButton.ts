
// You can write more code here
import { _root } from "@/flash/root";
import { selectSavefile } from "./selectSavefile";


/* START OF COMPILED CODE */

class FileButton extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// base
		const base = scene.add.rectangle(0, 0, 120, 80);
		base.setOrigin(0, 0);
		base.isFilled = true;
		base.fillColor = 15480;
		this.add(base);

		// fileName
		const fileName = scene.add.text(19, 0, "", {});
		fileName.name = "fileName";
		fileName.text = "< File 0 >";
		fileName.setStyle({ "color": "#007dfa", "fixedHeight": 24.05, "fontFamily": "McLaren", "fontSize": "18px" });
		fileName.setPadding({ "top": 6 });
		this.add(fileName);

		// text
		const text = scene.add.text(6, 25, "", {});
		text.text = "Time:";
		text.setStyle({ "color": "#007dfa", "fontFamily": "McLaren", "fontSize": "12px" });
		text.setPadding({ "top": 6 });
		this.add(text);

		// text_2
		const text_2 = scene.add.text(6, 41, "", {});
		text_2.text = "Level:";
		text_2.setStyle({ "color": "#007dfa", "fontFamily": "McLaren", "fontSize": "12px" });
		text_2.setPadding({ "top": 6 });
		this.add(text_2);

		// text_3
		const text_3 = scene.add.text(6, 56, "", {});
		text_3.text = "Ascensions:";
		text_3.setStyle({ "color": "#007dfa", "fontFamily": "McLaren", "fontSize": "12px" });
		text_3.setPadding({ "top": 6 });
		this.add(text_3);

		// playTime
		const playTime = scene.add.text(37, 25, "", {});
		playTime.name = "playTime";
		playTime.text = "0 min";
		playTime.setStyle({ "align": "right", "color": "#007dfa", "fixedWidth": 80, "fontFamily": "McLaren", "fontSize": "12px" });
		playTime.setPadding({ "top": 6 });
		this.add(playTime);

		// ascCount
		const ascCount = scene.add.text(37, 56, "", {});
		ascCount.text = "0";
		ascCount.setStyle({ "align": "right", "color": "#007dfa", "fixedWidth": 80, "fontFamily": "McLaren", "fontSize": "12px" });
		ascCount.setPadding({ "top": 6 });
		this.add(ascCount);

		// curLevel
		const curLevel = scene.add.text(37, 41, "", {});
		curLevel.name = "curLevel";
		curLevel.text = "1";
		curLevel.setStyle({ "align": "right", "color": "#007dfa", "fixedWidth": 80, "fontFamily": "McLaren", "fontSize": "12px" });
		curLevel.setPadding({ "top": 6 });
		this.add(curLevel);

		// overlay
		const overlay = scene.add.rectangle(0, 0, 120, 80);
		overlay.setOrigin(0, 0);
		overlay.isFilled = true;
		overlay.fillColor = 0;
		overlay.fillAlpha = 0;
		this.add(overlay);

		this.base = base;
		this.fileName = fileName;
		this.playTime = playTime;
		this.ascCount = ascCount;
		this.curLevel = curLevel;
		this.overlay = overlay;

		/* START-USER-CTR-CODE */
		this.scene.events.once("scene-awake", () => {
			const n = this.fileNumber;
			this.fileName.text = `< File ${n} >`;
			this.playTime.text = _root.saveGlobal.playTime[n];
			this.curLevel.text = _root.saveGlobal.curLevel[n];
			this.ascCount.text = _root.saveGlobal.ascCount[n];

			this.unactiveStyle();
		});

		this.ssfTween = this.scene.tweens.add({
			targets: this.overlay,
			alpha: 0,
			duration: 667,
			yoyo: true,
			repeat: -1,
			ease: 'Linear'
		});
		this.overlay.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.hover())
			.on('pointerout', () => this.hoverout())
			.on('pointerdown', () => this.gotClicked())

		this.scene.events.on('preupdate', this.update, this);
		this.ctrl = this.scene.input.keyboard?.addKeys("CTRL");
		/* END-USER-CTR-CODE */
	}

	private base: Phaser.GameObjects.Rectangle;
	public fileName: Phaser.GameObjects.Text;
	public playTime: Phaser.GameObjects.Text;
	public ascCount: Phaser.GameObjects.Text;
	public curLevel: Phaser.GameObjects.Text;
	private overlay: Phaser.GameObjects.Rectangle;
	public fileNumber!: any;

	/* START-USER-CODE */
	// Write your code here.
	ssfTween: Phaser.Tweens.Tween;
	private isHovered: boolean = false;
	hover() {
		this.isHovered = true;
	}
	hoverout() {
		this.isHovered = false;
	}

	unactiveStyle() {
		this.ssfTween.pause();
		this.overlay.setFillStyle(0x1d1d2c, .5);
	}
	hoveredStyle() {
		this.ssfTween.pause();
		this.overlay.setFillStyle(0xffffff, .1);
	}
	ssfStyle() {
		this.ssfTween.resume();
		this.overlay.setFillStyle(0xff2222, .25);
	}
	selectedStyle() {
		this.ssfTween.pause();
		this.overlay.setFillStyle(0xffffff, .252);
	}

	gotClicked() {
		if (this.scene.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.CTRL].isDown && this.fileNumber == 2) {
			if (_root.saveGlobal.selectedSave != 4) {
				_root.saveGlobal.selectedSave = 4;
			} else {
				selectSavefile(this.scene.scene, _root.saveGlobal.selectedSave);
			}
		} else if (_root.saveGlobal.selectedSave != this.fileNumber) {
			_root.saveGlobal.selectedSave = this.fileNumber;
		} else {
			selectSavefile(this.scene.scene, _root.saveGlobal.selectedSave);
		}
	}

	update() {
		if (_root.saveGlobal.selectedSave == this.fileNumber) {
			this.selectedStyle();
		} else if (this.isHovered) {
			this.hoveredStyle();
		} else if (this.fileNumber == 2 && _root.saveGlobal.selectedSave == 4) {
			this.ssfStyle();
		} else {
			this.unactiveStyle();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { FileButton };

