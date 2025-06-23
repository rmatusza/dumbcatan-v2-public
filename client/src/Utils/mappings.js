import { THEME_NAMES, MUSIC_SOURCES } from "./constants";

/// - music is organized into themes and tracks
/// -> each theme has one or more tracks and the below object defines the mapping between a theme and its tracks
export const MUSIC_TRACKS = {};
MUSIC_TRACKS[THEME_NAMES.homeTheme] = 
[
  MUSIC_SOURCES.homeTheme1,
  MUSIC_SOURCES.homeTheme2,
  MUSIC_SOURCES.homeTheme3,
  MUSIC_SOURCES.homeTheme4,
  MUSIC_SOURCES.homeTheme5,
]

export const devCardCounts = 
{
  'knight': 14,
  'victoryPoint': 5,
  'roadBuilding': 2,
  'yearOfPlenty': 2,
  'monopoly': 2
};

export const tileCounts =
{
  'hay': 4,
  'wood': 4,
  'sheep': 4,
  'brick': 3,
  'stone': 3
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