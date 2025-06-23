const backgroundBasePath = '/Media/Images/Backgrounds/'
export const BACKGROUND_PATHS =
{
  authentication: '',
  none: null,
  home: backgroundBasePath + 'homeBackground.png',
  stone: backgroundBasePath + 'fuzzyStone.png',
  table: backgroundBasePath + 'tableBackground.png',
  medTable: backgroundBasePath + 'medievalTableBackground.png'
};

const avatarBasePath = '/Media/Images/Avatars/'
export const AVATAR_PATHS = 
{
  av1: avatarBasePath + 'av_1.png',
  av2: avatarBasePath + 'av_2.png',
  av3: avatarBasePath + 'av_3.png',
  av4: avatarBasePath + 'av_4.png',
  av5: avatarBasePath + 'av_5.png',
};

const tilesBasePath = '/Media/Images/BoardAssets/Tiles/'
export const TILE_PATHS = 
{
  brick: tilesBasePath + 'brick.png',
  desert: tilesBasePath + 'desert.png',
  hay: tilesBasePath + 'hay.png',
  sheep: tilesBasePath + 'sheep.png',
  stone: tilesBasePath + 'stone.png',
  wood: tilesBasePath + 'wood.png',
};

export const BOARD_BORDER_PATH = '/Media/Images/BoardAssets/Border/border.png'

const elementBasePath = '/Media/Images/Elements/'
export const ELEMENT_PATHS =
{
  bannerLogo: elementBasePath + 'CatanBannerLogo.png',
};

/// - object containing theme name constants
/// - is the single source of truth for theme names which allows for easier maintainability and avoids code repetition and potential typos 
export const THEME_NAMES = 
{
  homeTheme: 'homeTheme',
};

/// list of sources / URLs for all music, ambient sounds, and sound effects
const musicAndsoundBasePath = '/Media/Audio/'
export const MUSIC_SOURCES = 
{
  homeTheme1: musicAndsoundBasePath+'MT1.mp3',
  homeTheme2: musicAndsoundBasePath+'MT2.mp3',
  homeTheme3: musicAndsoundBasePath+'MT3.mp3',
  homeTheme4: musicAndsoundBasePath+'MT4.mp3',
  homeTheme5: musicAndsoundBasePath+'MT5.mp3',
};

export const SOUND_EFFECT_SOURCES = 
{
  menu: null,
};

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

export const STRUCTURE_TYPES = 
{
  settlement: 'settlement',
  city: 'city'
}

export const PLAYER_COLORS =
[
  'orange', 
  'white', 
  'blue', 
  'red'
];

export const APP_ALERT_TYPE = {
  success: 'success',
  failure: 'failure'
};

export const REQUEST_FIELDS = 
{
  none: 'NONE'
};

export const ENDPOINTS = 
{
  authentication: '/authentication',
  home: '/home',
  yourGames: '/your-games',
  gameInstance: '/game',
  yourInvites: '/your-invites',
  about: '/about',
};

export const APP_CONTEXT = 
{
  authenticateJwt: 'authenticateJwt',
  signin: 'signin',
  signup: 'signup',
  avatar: 'avatar',
  credentials: 'credentials',
  home: 'home'
};

export const tileIdentities = 
[
  'hay', 
  'wood', 
  'sheep', 
  'brick', 
  'stone'
];

export const devCardIdentities = 
[
  'knight', 
  'victoryPoint', 
  'roadBuilding', 
  'yearOfPlenty', 
  'monopoly'
];

export const ports =
[
  'all',
  'stone',
  'hay',
  'sheep',
  'brick',
  'wood'
];