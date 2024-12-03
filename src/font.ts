/***
 * Ensures that fonts are loaded before Phaser renders.
 * https://hacks.mozilla.org/2016/06/webfont-preloading-for-html5-games/
 */

/** Fonts required for preload screen */
const PRELOAD_FONTS = [
    new FontFace("Tempesta Seven", "url('/assets/fonts/tempesta-seven.ttf')"),
    new FontFace("Tempesta Seven", "url('/assets/fonts/tempesta-seven-bold.ttf')", {
        weight: 'bold',
    }),
]

/** Fonts that will be loaded before game starts */
const FONTS = [
    new FontFace("McLaren", "url('/assets/fonts/mclaren.ttf')"),
    new FontFace("Noto Sans JP", "url('/assets/fonts/noto-sans-jp.ttf')"),
    new FontFace("Tempesta Seven Extended", "url('/assets/fonts/tempesta-seven-extended.ttf')"),
    new FontFace("Tempesta Seven Extended", "url('/assets/fonts/tempesta-seven-extended-bold.ttf')", {
        weight: 'bold',
    }),
    new FontFace("Tempesta Seven Condensed", "url('/assets/fonts/tempesta-seven-condensed.ttf')"),
    new FontFace("Ronda Seven", "url('/assets/fonts/ronda-seven.ttf')"),
    new FontFace("Ronda Seven", "url('/assets/fonts/ronda-seven-bold.ttf')", {
        weight: 'bold',
    }),
];

export async function preloadFonts() {
    await Promise.all(
        PRELOAD_FONTS.map(font => font.load()
            .then(() => ({ success: true, font, error: null }))
            .catch(error => ({ success: false, font, error }))
        )
    )
        .then(results => {
            // Add all successfully loaded fonts
            results.forEach(result => {
                if (result.success) {
                    document.fonts.add(result.font);
                } else {
                    console.error(`Could not load font ${result.font}: ${result.error}`);
                }
            });

            document.body.classList.add('fonts-loaded');
        });
}

export async function loadFonts() {
    await Promise.all(
        FONTS.map(font => font.load()
            .then(() => ({ success: true, font, error: null }))
            .catch(error => ({ success: false, font, error }))
        )
    )
        .then(results => {
            // Add all successfully loaded fonts
            results.forEach(result => {
                if (result.success) {
                    document.fonts.add(result.font);
                } else {
                    console.error(`Could not load font ${result.font}: ${result.error}`);
                }
            });

            document.body.classList.add('fonts-loaded');
        });
}