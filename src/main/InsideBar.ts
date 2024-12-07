export enum InsideBarKind {
	Gray = "inside-bar-1",
	Red = "inside-bar-2",
	Yellow = "inside-bar-3",
	Green = "inside-bar-4",
	Cyan = "inside-bar-5",
	Blue = "inside-bar-6",
	Purple = "inside-bar-7",
	Rainbow = "inside-bar-8",
	Shiny = "inside-bar-9",
	LightBlue = "inside-bar-10",
	LightestBlue = "inside-bar-11",
	LightGreen = "inside-bar-12",
}

export
/* START OF COMPILED CODE */

class InsideBar extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "inside-bar-1", frame);

		this.setOrigin(0, 0);

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	show(kind: InsideBarKind) {
		this.setTexture(kind);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
