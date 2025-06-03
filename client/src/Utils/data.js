// contains STATIC DATA - data that never changes and is referenced by other functions

// contains PLACEHOLDER DATA - data that is partially constructed but that needs to be initialized by another function ( example: nodeToPortMap - after ports have been shuffled 
// this object gets filled out)
// -> chose to partially hard code because the nodes that are touching a port spot are always the same, but the port type associated with those nodes changes with each game

// contains STARTER DATA - hard coded data that represents the initial state ( example: roadData - gets filled out as game unfolds )
// -> chose to hard code this data just for visibility - i want to know that roadData is a construct that exists and is essential for the game to function rather than
// generating it on the fly which might lead to me forgetting about its existence or having a hard time tracking it down

const backgroundBaseURL = '/Media/Images/Backgrounds/'
export const BACKGROUNDS =
{
  authentication: '',
  home: backgroundBaseURL+'homeBackground.png',
  stone: backgroundBaseURL+'fuzzyStone.png'
}

const avatarBaseURL = '/Media/Images/Avatars/'
export const AVATARS = 
{
  av1: avatarBaseURL + 'av_1.png',
  av2: avatarBaseURL + 'av_2.png',
  av3: avatarBaseURL + 'av_3.png',
  av4: avatarBaseURL + 'av_4.png',
  av5: avatarBaseURL + 'av_5.png',
}

const elementBaseURL = '/Media/Images/Elements/'
export const ELEMENTS =
{
  bannerLogo: elementBaseURL + 'CatanBannerLogo.png',
}

export const CUSTOM_STYLES = 
{
  classicCatanButtonSingle: 'classicCatanButtonSingle',
  redAndYellowButtonSingle: 'redAndYellowButtonSingle',
  classicCatanButtonAll: 'classicCatanButtonAll',
  redAndYellowButtonAll: 'redAndYellowButtonAll',
  lightRedBorder: 'lightRedBorder',
  goldYellowBorder: 'goldYellowBorder',
  modalTextYellow: 'modalTextYellow',
  headingTextYellow: 'headingTextYellow',
  largeErrorMessage: 'largeErrorMessage',
  smallErrorMessageShadowed: 'smallErrorMessageShadowed',
  largeErrorMessageShadowed: 'largeErrorMessageShadowed',
}

export const REQUEST_FIELDS = 
{
  none: 'NONE'
}

export const INITIAL_PROFILE_DATA = 
{
  userID: null,
  username: REQUEST_FIELDS.none,
  avatarURL: REQUEST_FIELDS.none,
  password: REQUEST_FIELDS.none
}

export const ENDPOINTS = 
{
  authentication: '/authentication',
  home: '/home',
  yourGames: '/your-games',
  yourInvites: '/your-invites',
  about: '/about',
}

export const ERROR_CONTEXTS = 
{
  authenticateJwt: 'authenticateJwt',
  signin: 'signin',
  signup: 'signup',
  profile: 'profile',
}

export const tileIdentities = 
[
  'hay', 
  'wood', 
  'sheep', 
  'brick', 
  'stone'
];

export const tileCounts =
{
  'hay': 4,
  'wood': 4,
  'sheep': 4,
  'brick': 3,
  'stone': 3
};

export const devCardIdentities = 
[
  'knight', 
  'victoryPoint', 
  'roadBuilding', 
  'yearOfPlenty', 
  'monopoly'
];

export const devCardCounts = 
{
  'knight': 14,
  'victoryPoint': 5,
  'roadBuilding': 2,
  'yearOfPlenty': 2,
  'monopoly': 2
};

export const rowTileCount = 
{
  1: 3,
  2: 4,
  3: 5,
  4: 4,
  5: 3
};

export const diceIdToFrequencyMap = 
{
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  8: 5,
  9: 4,
  10: 3,
  11: 2,
  12: 1
};

export const diceIdCount = 
{
  2: 1,
  3: 2,
  4: 2,
  5: 2,
  6: 2,
  8: 2,
  9: 2,
  10: 2,
  11: 2,
  12: 1
};

export const portToNodeMap = 
{
  1: [1, 2],
  2: [4, 5],
  3: [8, 18],
  4: [15, 16],
  5: [29, 39],
  6: [27, 38],
  7: [48, 49],
  8: [51, 52],
  9: [46, 47]
};

export const ports =
[
  'all',
  'stone',
  'hay',
  'sheep',
  'brick',
  'wood'
];

export const portCount =
{
  'all': 4,
  'stone': 1,
  'hay': 1,
  'sheep': 1,
  'brick': 1,
  'wood': 1
};

export const portRestrictions =
{
  'all': 3,
  'other': 2
};

export const nodeToTileMap = [
  [1, 2, 3, 9, 10, 11],
  [3, 4, 5, 11, 12, 13],
  [5, 6, 7, 13, 14, 15],
  [8, 9, 10, 18, 19, 20],
  [10, 11, 12, 20, 21, 22],
  [12, 13, 14, 22, 23, 24],
  [14, 15, 16, 24, 25, 26],
  [17, 18, 19, 28, 29, 30],
  [19, 20, 21, 30, 31, 32],
  [21, 22, 23, 32, 33, 34],
  [23, 24, 25, 34, 35, 36],
  [25, 26, 27, 36, 37, 38],
  [29, 30, 31, 39, 40, 41],
  [31, 32, 33, 41, 42, 43],
  [33, 34, 35, 43, 44, 45],
  [35, 36, 37, 45, 46, 47],
  [40, 41, 42, 48, 49, 50],
  [42, 43, 44, 50, 51, 52],
  [44, 45, 46, 52, 53, 54],
];

export const nodeToRoadMap = {
  1: {
    2: 1,
    9: 7
  },
  2: {
    3: 2
  },
  3: {
    4: 3,
    11: 8
  },
  4: {
    5: 4
  },
  5: {
    6: 5,
    13: 9
  },
  6: {
    7: 6
  },
  7: {
    15: 10
  },
  8: {
    9: 11,
    18: 19
  },
  9: {
    10: 12
  },
  10: {
    11: 13,
    20: 20
  },
  11: {
    12: 14
  },
  12: {
    13: 15,
    22: 21
  },
  13: {
    14: 16
  },
  14: {
    15: 17,
    24: 22
  },
  15: {
    16: 18
  },
  16: {
    26: 23
  },
  17: {
    18: 24,
    28: 34
  },
  18: {
    19: 25
  },
  19: {
    20: 26,
    30: 35
  },
  20: {
    21: 27
  },
  21: {
    22: 28,
    32: 36
  },
  22: {
    23: 29,
  },
  23: {
    24: 30,
    34: 37
  },
  24: {
    25: 31
  },
  25: {
    26: 32,
    36: 38
  },
  26: {
    27: 33
  },
  27: {
    38: 39
  },
  28: {
    29: 40
  },
  29: {
    30: 41,
    39: 50
  },
  30: {
    31: 42
  },
  31: {
    32: 43,
    41: 51
  },
  32: {
    33: 44
  },
  33: {
    34: 45,
    43: 52
  },
  34: {
    35: 46
  },
  35: {
    36: 47,
    45: 53
  },
  36: {
    37: 48
  },
  37: {
    38: 49,
    47: 54
  },
  // NOTE: node 38 doesn't connect to any higher numbered node so it is skipped
  39: {
    40: 55
  },
  40: {
    41: 56,
    48: 63
  },
  41: {
    42: 57
  },
  42: {
    43: 58,
    50: 64
  },
  43: {
    44: 59
  },
  44: {
    45: 60,
    52: 65
  },
  45: {
    46: 61
  },
  46: {
    47: 62,
    54: 66
  },
  // NOTE: node 47 doesn't connect to any higher numbered node so it is skipped
  48: {
    49: 67,
  },
  49: {
    50: 68
  },
  50: {
    51: 69
  },
  51: {
    52: 70
  },
  52: {
    53: 71
  },
  53: {
    54: 72
  },
  // NOTE: node 54 doesn't connect to any higher numbered node so it is skipped
};

export const nodeData = {
  1: {
    'structure': null,
    'color': null,
    'neighbors': [2, 9]
  },
  2: {
    'structure': null,
    'color': null,
    'neighbors': [1, 3]
  },
  3: {
    'structure': null,
    'color': null,
    'neighbors': [2, 11, 4]
  },
  4: {
    'structure': null,
    'color': null,
    'neighbors': [3, 5]
  },
  5: {
    'structure': null,
    'color': null,
    'neighbors': [4, 6, 13]
  },
  6: {
    'structure': null,
    'color': null,
    'neighbors': [5, 7]
  },
  7: {
    'structure': null,
    'color': null,
    'neighbors': [6, 15]
  },
  8: {
    'structure': null,
    'color': null,
    'neighbors': [9, 18]
  },
  9: {
    'structure': null,
    'color': null,
    'neighbors': [1, 8, 10]
  },
  10: {
    'structure': null,
    'color': null,
    'neighbors': [9, 11, 20]
  },
  11: {
    'structure': null,
    'color': null,
    'neighbors': [3, 10, 12]
  },
  12: {
    'structure': null,
    'color': null,
    'neighbors': [11, 13, 22]
  },
  13: {
    'structure': null,
    'color': null,
    'neighbors': [5, 12, 14]
  },
  14: {
    'structure': null,
    'color': null,
    'neighbors': [13, 15, 24]
  },
  15: {
    'structure': null,
    'color': null,
    'neighbors': [7, 14, 16]
  },
  16: {
    'structure': null,
    'color': null,
    'neighbors': [15, 26]
  },
  17: {
    'structure': null,
    'color': null,
    'neighbors': [18, 28]
  },
  18: {
    'structure': null,
    'color': null,
    'neighbors': [8, 17, 19]
  },
  19: {
    'structure': null,
    'color': null,
    'neighbors': [18, 20, 30]
  },
  20: {
    'structure': null,
    'color': null,
    'neighbors': [10, 19, 21]
  },
  21: {
    'structure': null,
    'color': null,
    'neighbors': [20, 22, 32]
  },
  22: {
    'structure': null,
    'color': null,
    'neighbors': [12, 21, 23]
  },
  23: {
    'structure': null,
    'color': null,
    'neighbors': [22, 24, 34]
  },
  24: {
    'structure': null,
    'color': null,
    'neighbors': [14, 23, 25]
  },
  25: {
    'structure': null,
    'color': null,
    'neighbors': [24, 26, 36]
  },
  26: {
    'structure': null,
    'color': null,
    'neighbors': [16, 25, 27]
  },
  27: {
    'structure': null,
    'color': null,
    'neighbors': [26, 38]
  },
  28: {
    'structure': null,
    'color': null,
    'neighbors': [17, 29]
  },
  29: {
    'structure': null,
    'color': null,
    'neighbors': [28, 30, 39]
  },
  30: {
    'structure': null,
    'color': null,
    'neighbors': [19, 29, 31]
  },
  31: {
    'structure': null,
    'color': null,
    'neighbors': [30, 32, 41]
  },
  32: {
    'structure': null,
    'color': null,
    'neighbors': [21, 31, 33]
  },
  33: {
    'structure': null,
    'color': null,
    'neighbors': [32, 34, 43]
  },
  34: {
    'structure': null,
    'color': null,
    'neighbors': [23, 33, 35]
  },
  35: {
    'structure': null,
    'color': null,
    'neighbors': [34, 36, 45]
  },
  36: {
    'structure': null,
    'color': null,
    'neighbors': [25, 35, 37]
  },
  37: {
    'structure': null,
    'color': null,
    'neighbors': [36, 38, 47]
  },
  38: {
    'structure': null,
    'color': null,
    'neighbors': [27, 37]
  },
  39: {
    'structure': null,
    'color': null,
    'neighbors': [28, 40]
  },
  40: {
    'structure': null,
    'color': null,
    'neighbors': [39, 41, 48]
  },
  41: {
    'structure': null,
    'color': null,
    'neighbors': [31, 40, 42]
  },
  42: {
    'structure': null,
    'color': null,
    'neighbors': [41, 43, 50]
  },
  43: {
    'structure': null,
    'color': null,
    'neighbors': [33, 42, 44]
  },
  44: {
    'structure': null,
    'color': null,
    'neighbors': [43, 45, 52]
  },
  45: {
    'structure': null,
    'color': null,
    'neighbors': [35, 44, 46]
  },
  46: {
    'structure': null,
    'color': null,
    'neighbors': [45, 47, 54]
  },
  47: {
    'structure': null,
    'color': null,
    'neighbors': [37, 47]
  },
  48: {
    'structure': null,
    'color': null,
    'neighbors': [39, 49]
  },
  49: {
    'structure': null,
    'color': null,
    'neighbors': [48, 50]
  },
  50: {
    'structure': null,
    'color': null,
    'neighbors': [42, 49, 51]
  },
  51: {
    'structure': null,
    'color': null,
    'neighbors': [50, 52]
  },
  52: {
    'structure': null,
    'color': null,
    'neighbors': [44, 51, 53]
  },
  53: {
    'structure': null,
    'color': null,
    'neighbors': [52, 54]
  }
};

export const roadData = {
  '1': null,
  '2': null,
  '3': null,
  '4': null,
  '5': null,
  '6': null,
  '7': null,
  '8': null,
  '9': null,
  '10': null,
  '11': null,
  '12': null,
  '13': null,
  '14': null,
  '15': null,
  '16': null,
  '17': null,
  '18': null,
  '19': null,
  '20': null,
  '21': null,
  '22': null,
  '23': null,
  '24': null,
  '25': null,
  '26': null,
  '27': null,
  '28': null,
  '29': null,
  '30': null,
  '31': null,
  '32': null,
  '33': null,
  '34': null,
  '35': null,
  '36': null,
  '37': null,
  '39': null,
  '40': null,
  '41': null,
  '42': null,
  '43': null,
  '44': null,
  '45': null,
  '46': null,
  '48': null,
  '49': null,
  '50': null,
  '51': null,
  '52': null,
  '53': null
};

export const nodeToPortMap = {
  1: null,
  2: null,
  4: null,
  5: null,
  8: null,
  18: null,
  15: null,
  16: null,
  29: null,
  39: null,
  27: null,
  38: null,
  48: null,
  49: null,
  51: null,
  52: null,
  46: null,
  47: null
};
