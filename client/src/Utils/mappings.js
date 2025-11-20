import { THEME_NAMES, MUSIC_SOURCES } from "./constants";

/// FILE INFO
// - this file contains all data mappings used in the app
// - these mappings are used by various functions to determine the relationship between one piece of data and another - for example the road id that is between node 1 
//   and node 2, or the node ids that are associated with a particular resource tile, etc.

/// MUSIC TRACKS
// - music is organized into themes and tracks - where each theme can have one or more tracks
// - every single track is stored within the MUSIC_SOURCES object and named according to the theme it belongs to
// - this object maps a theme name to its associated tracks
export const MUSIC_TRACKS = {};
MUSIC_TRACKS[THEME_NAMES.homeTheme] = 
[
  MUSIC_SOURCES.homeTheme1,
  MUSIC_SOURCES.homeTheme2,
  MUSIC_SOURCES.homeTheme3,
  MUSIC_SOURCES.homeTheme4,
  MUSIC_SOURCES.homeTheme5,
]

// indicates the amount of each kind of development card
export const devCardCounts = 
{
  'knight': 14,
  'victoryPoint': 5,
  'roadBuilding': 2,
  'yearOfPlenty': 2,
  'monopoly': 2
};

// indicates the amount of each kind of resource tile
export const tileCounts =
{
  'hay': 4,
  'wood': 4,
  'sheep': 4,
  'brick': 3,
  'stone': 3
};

// indicates how many resource tiles each row contains
export const rowTileCount = 
{
  1: 3,
  2: 4,
  3: 5,
  4: 4,
  5: 3
};

/// removing because using scanned dice ids which already contain a frequency marking
// export const diceIdToFrequencyMap = 
// {
//   2: 1,
//   3: 2,
//   4: 3,
//   5: 4,
//   6: 5,
//   8: 5,
//   9: 4,
//   10: 3,
//   11: 2,
//   12: 1
// };

// indicates the number of each dice id
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

/// removing for now because not randomizing ports
// export const portCount =
// {
//   'all': 4,
//   'stone': 1,
//   'hay': 1,
//   'sheep': 1,
//   'brick': 1,
//   'wood': 1
// };

// - indicates the amount of cards that have to be supplied by the user during a trade
//   with a port
// - all represents the wildcard port, while other represents any port that is not a 
//   wildcard port
export const portRestrictions =
{
  'all': 3,
  'other': 2
};

/// - used in conjunction with generated port placements called "ports"
/// - ports is an array in which the port at index 0 maps to the nodes in the array
///   found at portToNodeMap[0], and so on
export const portToNodeMap = 
{
  0: [1, 2],
  1: [4, 5],
  2: [8, 18],
  3: [15, 16],
  4: [29, 39],
  5: [27, 38],
  6: [48, 49],
  7: [51, 52],
  8: [46, 47]
};

// - indicates which nodes are associated with each resource tile
// - tiles are ordered from left to right, top to bottom with the number of tiles per 
//   row being 3, 4, 5, 4, 3
// - used in conjunction with the tile data object which maps a resource tile 
//   to an index in this array in addtion to the dice id that is on it - that 
//   object together with this array say when X number is rolled, 
//   nodes at index Y get resource Z
export const nodeToTileMap = 
[
  [2,3,11,10,9,1],
  [4,5,13,12,11,3],
  [6,7,15,14,13,5],
  [9,10,20,19,18,8],
  [11,12,22,21,20,10],
  [13,14,24,23,22,12],
  [15,16,26,25,24,14],
  [18,19,30,29,28,17],
  [20,21,32,31,30,19],
  [22,23,34,33,32,21],
  [24,25,36,35,34,23],
  [26,27,38,37,36,25],
  [30,31,41,40,39,29],
  [32,33,43,42,41,31],
  [34,35,45,44,43,33],
  [36,37,47,46,45,35],
  [41,42,50,49,48,40],
  [43,44,52,51,50,42],
  [45,46,54,53,52,44],
];

// indicates which road is in between two given nodes
// ex. road 7 connects node 1 and node 9
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

// maps a given node to the nodes that are adjacent to it
export const nodeToNeighborsMap = {
  1: [2, 9],
  2: [1, 3],
  3: [2, 11, 4],
  4: [3, 5],
  5: [4, 6, 13],
  6: [5, 7],
  7: [6, 15],
  8: [9, 18],
  9: [1, 8, 10],
  10: [9, 11, 20],
  11: [3, 10, 12],
  12: [11, 13, 22],
  13: [5, 12, 14],
  14: [13, 15, 24],
  15: [7, 14, 16],
  16: [15, 26],
  17: [18, 28],
  18: [8, 17, 19],
  19: [18, 20, 30],
  20: [10, 19, 21],
  21: [20, 22, 32],
  22: [12, 21, 23],
  23: [22, 24, 34],
  24: [14, 23, 25],
  25: [24, 26, 36],
  26: [16, 25, 27],
  27: [26, 38],
  28: [17, 29],
  29: [28, 30, 39],
  30: [19, 29, 31],
  31: [30, 32, 41],
  32: [21, 31, 33],
  33: [32, 34, 43],
  34: [23, 33, 35],
  35: [34, 36, 45],
  36: [25, 35, 37],
  37: [36, 38, 47],
  38: [27, 37],
  39: [28, 40],
  40: [39, 41, 48],
  41: [31, 40, 42],
  42: [41, 43, 50],
  43: [33, 42, 44],
  44: [43, 45, 52],
  45: [35, 44, 46],
  46: [45, 47, 54],
  47: [37, 47],
  48: [39, 49],
  49: [48, 50],
  50: [42, 49, 51],
  51: [50, 52],
  52: [44, 51, 53],
  53: [52, 54],
  54: [46, 53],
};