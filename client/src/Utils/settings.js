/// FILE INFO
// - file contains values that when tweaked alter the user experience, or allow for debugging during development

// - setting this to true causes a board to be built using the 
//   data in the testData.js file
// - when true, clicking on "your games" from the main menu will send you
//   straight to the game instance page 
export const USE_TEST_DATA = false;
// - when true, ports will not be shuffled and the default port placements
//   printed on the board border will instead be used
export const USE_DEFAULT_PORTS = true;

// DEFAULT SETTINGS LOADED INTO GAME SLICE FOR EACH NEW GAME
export const BOARD_WIDTH = 1000;
export const BOARD_HEIGHT = 869;

export const TILE_WIDTH = 145.6;
export const TILE_HEIGHT = 169.3681;

export const BOARD_ASPECT_RATIO = 1.1513;
export const TILE_ASPECT_RATIO = 0.8640;

export const WIDTH_PROPORTION_TILE_TO_BOARD = 0.1456;
export const HEIGHT_PROPORTION_TILE_TO_BOARD = 0.1949;

export const X_FRACTION_OF_BOARD_WIDTH = 0.35;
export const Y_FRACTION_OF_BOARD_HEIGHT = 0.10;

export const X_PADDING = 3;
export const y_PADDING = 3;

export const FINE_TUNE_Y = 3;
export const FINE_TUNE_X = 0;

export const DICE_ID_WIDTH = 60;
export const DICE_ID_HEIGHT = 60;