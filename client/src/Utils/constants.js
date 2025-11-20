/// FILE INFO
// - this file contains all of the constant values that are used throughout the app
// - while technically many of these "constants" are actually maps or arrays, the map or array is only used as a means of grouping related constants together
// - the purpose is to avoid hard coding these values in every single spot where they are used in the app - this helps to avoid typos, allows for autocomplete
//   during development, and makes updating values easier since they would only need to be changed once in this file

/// BACKGROUND IMAGE PATHS
const staticBackgroundBasePath = '/Media/Images/Backgrounds/'
const videoBackgroundBasePath = '/Media/Video/Backgrounds/'
export const BACKGROUND_PATHS =
{
  authentication: videoBackgroundBasePath + 'catan.mp4',
  home: staticBackgroundBasePath + 'homeBackground.png',
  stone: staticBackgroundBasePath + 'fuzzyStone.png',
  table: staticBackgroundBasePath + 'tableBackground.png',
  medTable: staticBackgroundBasePath + 'medievalTableBackground.png',
  none: '',
};

/// AVATAR IMAGE PATHS
const avatarBasePath = '/Media/Images/Avatars/';
export const AVATAR_PATHS = 
{
  av1: avatarBasePath + 'av_1.png',
  av2: avatarBasePath + 'av_2.png',
  av3: avatarBasePath + 'av_3.png',
  av4: avatarBasePath + 'av_4.png',
  av5: avatarBasePath + 'av_5.png',
};

/// RESOURCE TILE IMAGE PATHS
const tilesBasePath = '/Media/Images/BoardAssets/Tiles/';
export const TILE_PATHS = 
{
  brick: tilesBasePath + 'brick.png',
  desert: tilesBasePath + 'desert.png',
  hay: tilesBasePath + 'hay.png',
  sheep: tilesBasePath + 'sheep.png',
  stone: tilesBasePath + 'stone.png',
  wood: tilesBasePath + 'wood.png',
};

const diceIdBasePath = '/Media/Images/BoardAssets/DiceIds/';
export const DICE_ID_PATHS = 
{
  2: diceIdBasePath + '2.png',
  3: diceIdBasePath + '3.png',
  4: diceIdBasePath + '4.png',
  5: diceIdBasePath + '5.png',
  6: diceIdBasePath + '6.png',
  8: diceIdBasePath + '8.png',
  9: diceIdBasePath + '9.png',
  10: diceIdBasePath + '10.png',
  11: diceIdBasePath + '11.png',
  12: diceIdBasePath + '12.png',
}

/// GAME BOARD BORDER IMAGE PATH
export const BOARD_BORDER_PATH = '/Media/Images/BoardAssets/Border/border.png'

/// ELEMENT / MISC IMAGE PATHS
const elementBasePath = '/Media/Images/Elements/'
export const ELEMENT_PATHS =
{
  bannerLogo: elementBasePath + 'catanBannerLogo.png',
  axeSpinner: elementBasePath + 'axe_spinner.png',
};

/// MUSIC THEME NAMES
// - object containing theme name constants
// - is the single source of truth for theme names which allows for easier maintainability and avoids code repetition and potential typos 
export const THEME_NAMES = 
{
  homeTheme: 'homeTheme',
};

/// MUSIC PATHS
// list of sources / URLs for all music
const musicAndsoundBasePath = '/Media/Audio/'
export const MUSIC_SOURCES = 
{
  homeTheme1: musicAndsoundBasePath+'MT1.mp3',
  homeTheme2: musicAndsoundBasePath+'MT2.mp3',
  homeTheme3: musicAndsoundBasePath+'MT3.mp3',
  homeTheme4: musicAndsoundBasePath+'MT4.mp3',
  homeTheme5: musicAndsoundBasePath+'MT5.mp3',
};

/// AMBIENCE AND SOUND EFFECT PATHS
export const SOUND_EFFECT_SOURCES = 
{
  menu: null,
};

/// CUSTOM TAILWIND CLASS NAMES
export const CUSTOM_STYLES = 
{
  button: {
    classicCatanButtonSingle: 'classicCatanButtonSingle',
    redAndYellowButtonSingle: 'redAndYellowButtonSingle',
    classicCatanButtonAll: 'classicCatanButtonAll',
    redAndYellowButtonAll: 'redAndYellowButtonAll',
  },
  border: {
    lightRedBorder: 'lightRedBorder',
    goldYellowBorder: 'goldYellowBorder',
  },
  text: {
    modalTextYellow: 'modalTextYellow',
    headingTextYellow: 'headingTextYellow',
    largeErrorMessage: 'largeErrorMessage',
    smallErrorMessageShadowed: 'smallErrorMessageShadowed',
    largeErrorMessageShadowed: 'largeErrorMessageShadowed',
    largeSuccessMessage: 'largeSuccessMessage'
  },
};

export const REQUEST_TYPES = {
  get: 'GET',
  put: 'PUT',
  patch: 'PATCH',
  post: 'POST',
  delete: 'DELETE'
};

/// STRUCTURE TYPE NAMES
export const STRUCTURE_TYPES = 
{
  settlement: 'settlement',
  city: 'city'
}

/// PLAYABLE COLOR NAMES
export const PLAYER_COLORS =
[
  'orange', 
  'white', 
  'blue', 
  'red'
];

/// ALERT TYPES
export const APP_ALERT_TYPE = {
  success: 'success',
  failure: 'failure'
};

/// HTTP REQUEST FIELD VALUES
export const REQUEST_FIELDS = 
{
  none: 'NONE'
};

/// CLIENT PAGE ENDPOINTS 
export const ENDPOINTS = 
{
  authentication: '/authentication',
  home: '/home',
  yourGames: '/your-games',
  gameInstance: '/game',
  yourInvites: '/your-invites',
  about: '/about',
};

/// CONTEXT NAMES
// - indicates where something has ocurred or where something is ocurring
// - for example if there is an app alert type of failure
//   the context is used to indicate where in the app that failure happened 
// - used by components to determine if an alert is relevant and needs
//   to be displayed or not 
export const APP_CONTEXT = 
{
  authenticateJwt: 'authenticateJwt',
  signin: 'signin',
  signup: 'signup',
  home: 'home',
  editAvatar: 'editAvatar',
  credentials: 'credentials',
  createGame: 'createGame',
  games: 'games',
  sendInvite: 'sendInvite'
};

/// RESOURCE TILE NAMES
export const TILE_IDENTITIES = 
[
  'hay', 
  'wood', 
  'sheep', 
  'brick', 
  'stone'
];

/// DEVELOPMENT CARD NAMES
export const devCardIdentities = 
[
  'knight', 
  'victoryPoint', 
  'roadBuilding', 
  'yearOfPlenty', 
  'monopoly'
];

/// PORT NAMES
export const ports =
[
  'all',
  'stone',
  'hay',
  'sheep',
  'brick',
  'wood'
];

export const GAME_INSTANCE_PAGE_POPUP_LINES = [
  "At the moment create game only generates a randomized game board with hover effects over the nodes and the roads that will in the future be clickable during the game.",
  "Currently however, the game is not yet playable... but please check back soon as I am regularly adding new features!"
];