const maleBrTables = {
  Y: [0,5,10,15,20,25,30,34,39,43,46,50,56,62,67,72,75,78,82,85,90,95,100],
  Z: [12,24,35,38,42,45,48,52,55,57,59,61,63,65,67,69,70,71,73,75,76,77,78,79,80,82,84,85,87,89,91,93,95,97,100],
  '1': [6,6,6,6,6,6,6,18,30,38,43,48,53,58,63,66,67,69,70,71,71,73,74,76,78,81,83,86,88,91,96,101,106,108,109,111,116,121],
  '2': [6,6,6,6,6,6,6,16,26,41,44,47,50,53,57,61,66,66,67,68,68,69,71,74,76,78,81,82,83,84,86,88,90,94,97,100,101,103,105,106,108,110,112,114,116,118,121],
  '3': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,10,23,34,40,42,50,59,66,66,66,69,71,72,74,77,78,80,81,85,89,91,93,94,94,94,95,96,98,100,102,106,111,116,121],
  '4': [6,6,6,6,6,6,6,6,6,6,6,6,6,6,11,13,16,18,26,36,41,44,47,50,53,55,57,59,61,63,66,67,68,69,70,71,73,74,76,78,79,80,81,82,83,85,87,89,90,91,94,96,99,103,108,112,116,118,121],
  '5': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,12,19,23,27,32,35,38,41,44,47,49,51,52,55,61,66,67,69,70,72,73,75,77,80,81,83,86,88,90,92,93,96,98,100,101,101,102,103,104,104,105,106,108,110,112,114,116,118,119,120,121],
  '6A': [0,0,0,0,0,0,0,0,9,13,17,22,27,32,37,42,44,47,49,52,54,57,59,62,64,66,67,68,69,70,71,72,73,74,75,77,79,81,83,85,87,88,91,94,98,101,104,106,108,110,112,114,116,118,121],
  '6B': [0,0,0,0,0,0,0,0,0,0,0,0,8,15,25,35,37,39,41,43,45,47,49,50,52,54,56,62,66,67,68,70,73,75,78,79,80,83,86,88,89,93,96,98,100,102,104,105,106,114,116,118,119,121],
  '7': [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,11,14,18,23,26,31,34,36,39,41,46,54,59,61,61,61,61,61,62,63,64,65,67,71,75,78,80,83,86,90,93,94,95,96,97,98,102,106,108,110,113,116,118,121],
  '8A': [0,0,0,0,0,0,0,2,7,12,17,22,27,32,34,36,38,40,42,44,47,49,51,55,62,66,67,68,69,70,71,74,76,78,81,85,88,90,94,98,102,105,107,108,110,111,111,112,113,114,116,117,118,119,120,121],
  '8B': [0,0,0,10,20,30,35,38,41,44,47,50,55,60,61,66,67,68,69,70,71,72,73,74,74,74,75,76,76,77,78,79,81,83,89,93,98,104,111,116,119,120,120,121],
  S: [6,6,6,16,26,36,41,43,46,48,51,53,56,58,61,63,64,64,65,65,66,66,67,67,68,68,69,69,70,70,71,71,72,72,73,73,74,75,77,81,84,87,90,97,105,110,116,119,121],
  C: [0,0,0,0,0,11,16,21,26,31,36,41,42,43,44,45,46,48,50,53,56,58,59,61,63,66,66,66,66,66,66,67,68,69,70,71,72,73,73,73,74,74,75,75,75,75,76,76,77,80,84,87,92,95,97,100,104,108,110,112,114,116,118,119,121],
  P: [0,0,0,0,0,0,12,15,17,19,27,37,42,45,49,52,53,54,55,56,57,58,59,60,61,62,63,64,65,65,66,66,67,68,69,69,70,70,71,72,72,73,73,74,75,77,80,82,85,88,92,95,98,100,102,104,107,109,111,113,117,120,121],
  A: [0,0,0,20,30,40,50,60,62,64,66,70,72,75,77,79,81,83,85,86,87,88,89,90,90,90,91,93,95,96,98,100,102,105,109,113,115],
  H: [0,0,0,15,30,40,48,55,57,58,59,59,60,60,61,61,62,62,63,63,64,64,65,65,66,66,67,67,67,68,68,68,69,70,72,75,83,87,92,96,100,105,110,115],
  N: [0,0,0,0,0,0,2,5,10,12,20,30,35,37,39,41,44,47,50,53,57,60,60,60,60,60,60,60,61,62,63,64,65,67,69,71,73,75,79,82,85,90,95,110,115],
  D: [0,0,0,0,10,15,18,21,25,27,30,32,35,42,49,55,58,59,61,63,71,73,74,76,80,85,87,88,89,90,90,90,91,91,92,92,93,93,93,94,94,95,96,96,97,98,98,99,99,100,100,104,107,110,112,114,115],
  B: [0,0,0,0,0,0,0,0,15,25,35,38,41,45,48,51,55,60,61,62,63,64,65,67,69,71,73,75,77,79,81,83,85,86,88,89,90,92,93,94,95,97,98,99,100,101,103,105,108,111,113,115],
  T: [0,0,0,0,0,0,0,5,10,15,20,25,30,35,37,39,41,44,48,51,54,57,60,60,60,61,61,62,63,64,65,66,68,69,70,71,72,73,75,77,79,81,83,85,86,87,89,90,91,92,94,95,97,98,99,100,103,106,109,112,115],
  SS: [0,0,0,35,40,44,50,55,60,60,60,60,60,61,61,62,62,63,65,67,67,68,68,69,70,70,71,72,73,75,77,79,80,82,85,90,95,100,110,115],
  CC: [0,35,38,41,44,47,50,55,60,60,60,60,60,60,60,60,60,60,61,62,63,64,65,65,66,67,68,69,70,71,72,73,74,75,75,76,77,78,79,80,83,85,90,95,100,110,115],
  PP: [0,0,0,10,25,35,38,41,44,47,51,53,55,57,60,60,60,61,63,64,65,67,69,71,72,73,75,80,85,88,91,94,97,100,105,110,115]
};

const femaleBrTables = {
  Y: [0,0,0,10,20,24,28,34,35,41,45,50,57,63,67,71,75,80,85,91,95,100],
  Z: [0,15,25,34,35,37,40,43,45,46,48,49,51,52,54,55,57,59,61,63,65,67,69,71,73,75,78,82,85,87,88,90,92,94,97,100],
  '1': [0,0,0,0,0,0,0,0,0,0,15,35,47,50,53,56,60,62,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,81,84,86,88,90,91,96,104,111,118,121],
  '2': [0,0,0,0,0,15,21,31,41,44,48,51,53,60,64,66,67,69,70,71,72,73,74,75,76,76,77,78,79,80,81,83,85,87,88,89,90,91,94,97,100,102,104,105,106,108,110,111,116,118,120,121],
  '3': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,10,15,20,30,37,45,55,66,68,69,70,71,72,75,78,81,84,87,89,91,93,95,97,99,101,102,103,103,104,105,108,112,116,118,121],
  '4': [0,0,0,0,0,0,0,0,0,0,0,11,15,18,21,24,31,36,41,49,56,58,59,61,62,63,64,66,69,70,74,78,79,80,81,81,82,83,84,86,89,91,92,93,93,94,94,96,97,99,101,106,121],
  '5': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,13,23,33,35,38,40,43,45,48,52,58,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,84,85,86,87,89,91,96,101,106,112,118,121],
  '6A': [0,0,0,0,0,0,0,0,0,12,17,22,27,32,42,45,47,50,52,57,58,59,61,62,63,64,65,66,66,66,67,69,70,72,73,75,76,78,79,80,81,85,87,89,90,90,91,95,98,100,102,103,105,106,111,116,121],
  '6B': [0,0,0,0,0,0,0,0,0,0,5,10,12,16,20,24,30,35,37,39,42,44,49,55,60,66,67,68,69,70,71,72,73,74,75,76,76,77,78,79,80,81,83,84,85,86,87,88,89,90,91,93,95,97,99,101,103,106,111,115,117,119,121],
  '7': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,14,16,21,26,31,36,41,44,47,50,54,58,61,61,62,63,64,68,71,74,78,82,84,86,89,91,92,93,94,94,95,95,96,98,100,103,106,111,116,121],
  '8A': [0,0,0,0,0,0,0,0,0,5,7,12,17,24,28,32,34,35,40,45,48,50,51,52,53,57,63,66,67,68,69,72,73,74,77,78,79,79,80,81,85,88,89,90,93,96,100,104,109,111,113,115,118,121],
  '8B': [0,0,0,10,15,20,25,30,34,37,40,42,45,52,58,66,67,68,69,70,71,72,74,75,75,76,76,77,78,79,80,81,83,86,87,90,92,95,99,102,104,106,106,107,108,111,116,118,121],
  S: [0,0,0,16,26,41,42,43,43,44,44,44,45,46,47,48,51,53,54,60,61,62,64,65,66,66,66,66,66,66,67,67,68,68,69,70,71,72,73,74,76,79,81,89,96,102,108,116,121],
  C: [0,0,0,0,5,10,20,26,31,33,34,36,37,38,39,40,41,43,46,51,52,53,54,55,56,57,58,59,60,60,61,62,62,63,64,64,65,66,66,67,68,68,69,70,70,71,72,72,73,73,74,75,78,81,83,85,88,92,96,100,103,106,109,112,115,121],
  P: [7,7,7,12,17,22,27,32,37,40,42,43,45,47,49,52,53,57,62,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,67,69,71,73,75,77,80,82,84,86,88,90,92,96,100,104,107,109,111,114,117,119,121],
  A: [0,0,0,5,10,15,20,30,32,35,37,40,42,48,52,57,60,64,68,72,75,77,80,82,85,87,88,89,91,93,95,97,99,101,103,105,107,109,112,115],
  H: [10,10,10,25,30,35,40,43,45,50,52,55,57,57,58,59,59,59,60,61,62,63,64,65,65,66,66,67,68,69,70,70,71,73,74,75,80,85,89,94,97,100,105,110,115],
  N: [0,0,0,0,5,7,9,12,15,18,25,30,35,37,40,42,45,47,50,52,55,57,60,60,60,60,60,60,60,61,62,64,65,67,68,70,73,74,76,79,81,84,90,97,110,115],
  D: [0,0,0,0,0,0,0,0,0,5,10,15,19,22,25,27,29,31,33,35,37,39,41,44,46,53,58,61,65,70,74,76,77,79,82,86,88,89,90,91,91,91,91,92,92,92,93,93,93,94,95,96,97,98,100,105,110,115],
  B: [0,0,0,0,0,0,0,0,10,15,20,25,35,37,39,42,45,47,49,52,55,57,59,60,60,60,60,60,60,61,63,65,67,69,71,73,75,78,82,85,89,91,94,96,98,100,103,106,109,112,115],
  T: [0,0,0,0,0,0,0,4,8,12,16,20,25,30,35,37,39,41,43,45,48,51,55,58,60,60,60,60,60,61,62,63,64,66,67,68,69,70,71,72,72,73,74,75,77,78,79,80,81,83,85,87,88,89,90,92,95,97,100,102,104,107,110,115],
  SS: [0,0,0,35,38,40,42,45,47,55,60,60,60,60,60,60,60,60,60,60,60,62,62,64,65,67,69,70,72,73,75,80,81,83,85,87,89,90,95,97,98,99,100,102,104,105,110,115],
  CC: [0,0,0,10,25,35,45,47,50,52,53,54,55,56,57,58,59,60,60,60,60,60,60,60,60,60,61,61,62,64,66,67,69,71,72,73,76,77,78,79,80,81,82,83,88,95,100,110,115],
  PP: [0,0,0,15,35,37,40,45,55,60,60,60,60,60,60,60,61,62,64,65,67,70,71,73,74,76,82,86,87,88,91,94,97,100,105,110,115]
};

const scaleItemsPositive = {
  Y: { items: [4,14,34,39,60,61,75,78,86,88,89,93,103,106,122,125,126,137,138,149,153,159,166], weights: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  Z: { items: [3,5,8,18,23,24,25,26,27,33,36,43,45,49,50,51,53,54,58,59,63,66,67,68,71,72,76,79,82,96,97,99,100,102,108,110,114,115,117,118,120,128,132,136,158,167], weights: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  '1': { items: [2,10,13,16,19,22,25,33,34,43,48,57,77,83,102,113,118,120,124,143,150,161], weights: [3,2,3,1,3,1,1,2,3,1,2,1,1,3,3,2,3,2,2,1,3,1] },
  '2': { items: [2,3,8,10,19,23,24,25,27,31,33,36,49,53,54,57,59,71,72,83,99,108,109,112,123,130,132,139,141,147,150,158,161,162,165,166], weights: [2,2,2,3,2,2,3,3,2,1,2,2,1,2,3,1,2,2,2,2,1,2,3,3,2,2,2,2,2,3,3,2,1,1,2,2] },
  '3': { items: [10,23,29,31,42,45,51,53,57,65,71,72,79,81,83,108,109,110,119,121,127,133,145,149,159,163,168,173], weights: [3,1,3,1,2,2,3,2,2,3,2,2,2,1,2,3,2,3,2,2,1,3,3,1,3,1,1,3] },
  '4': { items: [7,9,14,20,28,37,40,41,42,43,48,56,60,66,86,89,91,95,103,111,125,128,130,133,137,142,158,162,166,170,171,172,173], weights: [1,2,3,3,3,1,1,1,2,2,3,1,3,2,3,1,1,1,2,3,3,1,1,2,3,1,2,1,2,3,1,1,1] },
  '5': { items: [1,2,4,6,12,14,15,16,22,28,32,37,41,43,55,60,80,85,86,89,91,103,111,125,126,129,130,131,134,135,137,142,143,146,149,158,163,165,166,170,171,172], weights: [3,1,2,3,1,2,3,2,1,1,1,3,2,1,1,1,1,1,2,3,3,2,2,2,1,3,1,3,1,1,2,3,1,1,2,2,1,2,3,2,2,2] },
  '6A': { items: [1,7,12,15,20,22,32,38,40,43,44,48,55,64,73,74,80,85,86,87,91,92,94,101,103,104,111,113,116,129,130,140,142,144,147,157,162,165,171,172], weights: [2,3,2,1,2,2,2,2,3,2,1,1,2,1,2,2,2,1,2,2,2,3,3,1,3,1,1,1,3,2,3,1,2,2,3,1,3,2,1,3] },
  '6B': { items: [1,4,7,9,12,21,30,32,38,40,41,43,44,58,64,66,74,80,82,84,86,91,95,101,107,115,121,129,134,135,142,145,146,147,148,155,163,165,166], weights: [2,3,1,3,3,2,3,1,1,1,3,1,3,1,2,1,2,1,2,2,1,2,1,3,2,2,2,2,3,1,1,1,1,1,3,2,3,1,2] },
  '7': { items: [4,21,32,39,46,61,64,74,75,78,81,88,126,134,138,148,149,153,159,161,163], weights: [1,3,1,3,3,3,2,1,3,1,1,3,3,2,3,2,3,3,2,2,2] },
  '8A': { items: [1,4,9,12,16,21,22,23,25,28,43,50,51,55,58,64,66,73,74,77,82,86,95,101,104,107,110,115,120,123,128,129,135,139,155,156,165,171], weights: [1,1,2,1,2,1,3,1,1,2,2,3,1,3,1,2,3,2,2,2,2,2,3,2,3,3,1,2,1,2,2,1,3,1,2,3,3,1] },
  '8B': { items: [8,10,16,18,23,25,28,31,42,45,51,54,56,57,63,65,71,73,77,81,82,99,106,110,115,120,121,128,132,133,139,141,145,154,155,167,168,171,173], weights: [1,2,2,1,3,1,2,1,2,2,2,2,2,3,1,3,1,1,2,1,1,1,2,3,2,2,3,1,2,1,3,1,2,3,2,1,3,1,1] },
  S: { items: [2,3,8,10,13,19,23,24,25,31,38,47,49,53,63,69,77,83,85,100,102,108,112,113,118,120,123,124,130,133,136,141,147,150,158,160,161,162,164,165,166], weights: [2,2,2,1,1,1,1,3,1,2,2,3,2,1,2,3,2,3,2,2,3,1,3,2,1,2,2,2,1,2,1,2,1,3,2,1,1,1,2,1,2] },
  C: { items: [5,7,22,23,25,26,27,35,36,40,43,44,50,51,53,54,56,57,58,59,65,66,67,72,73,74,77,78,79,82,91,94,95,97,99,101,103,104,108,110,113,115,128,129,130,132,135,136,139,140,142,144,147,154,155,156,162,165,167,168,171,173], weights: [2,1,2,2,3,2,2,2,1,1,3,1,2,1,1,1,3,1,3,2,1,2,1,1,3,1,1,1,2,3,2,1,2,2,1,2,1,1,1,1,3,3,3,2,1,1,1,2,1,2,2,1,1,1,3,2,1,1,1,1,3,1] },
  P: { items: [6,12,15,16,21,22,24,30,32,37,38,39,41,43,44,46,55,61,63,64,68,74,75,80,84,85,89,98,100,103,123,126,127,129,131,135,138,143,146,163,164,165,171,172], weights: [1,1,2,3,1,1,2,1,3,2,3,1,1,1,1,2,1,1,1,3,1,3,1,2,3,3,2,1,2,2,2,2,1,2,2,1,1,1,3,1,3,1,1,1] },
  A: { items: [8,16,18,26,29,33,36,51,53,54,67,71,78,96,97,99,108,109,114,117,132,145,153,166,167], weights: [1,1,3,1,2,2,1,3,2,1,3,2,1,2,2,1,1,2,3,3,1,1,1,1,2] },
  H: { items: [5,18,26,29,31,33,36,42,50,51,53,56,60,66,67,68,71,72,78,96,98,102,109,114,117,118,137,145,170,173], weights: [1,2,1,3,1,3,1,1,1,2,2,1,1,1,2,3,3,3,1,3,2,1,1,2,1,1,1,1,1,1] },
  N: { items: [11,14,17,20,28,37,40,50,58,60,66,67,73,86,89,93,95,98,101,103,111,121,125,127,128,131,134,137,151,166,170,172,174], weights: [3,2,1,2,2,1,1,2,1,2,1,1,1,2,1,3,1,1,1,2,1,1,2,1,2,1,2,2,3,1,2,1,3] },
  D: { items: [5,8,25,26,27,36,45,46,51,53,54,56,59,65,71,72,76,79,83,96,97,99,107,108,109,110,132,136,139,154,155,166,167,168], weights: [2,2,1,2,3,2,3,1,2,2,3,1,2,2,2,2,2,3,2,2,3,3,1,3,2,1,3,2,1,2,1,2,1,1] },
  B: { items: [17,18,22,23,25,27,35,40,46,54,65,70,73,80,87,93,95,96,97,103,104,105,108,109,111,114,117,119,125,128,130,135,137,140,144,149,155,157,159,162,165,171,175], weights: [3,2,1,1,1,1,1,1,1,2,1,1,2,1,3,1,2,1,2,1,1,2,1,2,1,1,1,3,1,1,1,1,1,1,2,1,1,3,1,1,1,1,2] },
  T: { items: [1,6,7,9,12,14,20,22,30,32,35,40,43,44,50,55,58,60,66,70,73,80,82,86,89,91,92,93,94,95,101,103,104,105,111,113,114,115,116,117,120,123,125,128,129,130,137,140,144,146,155,162,165,166,171,172,175], weights: [2,1,2,2,1,1,2,2,1,1,3,2,2,1,1,1,2,1,1,3,2,2,2,2,1,2,2,1,1,2,1,2,1,3,1,1,1,2,1,2,1,1,1,1,2,1,1,3,3,1,1,2,1,1,1,1,3] },
  SS: { items: [3,8,13,19,23,24,29,31,38,68,69,74,77,80,82,83,85,98,102,109,112,115,120,124,127,141,146,147,156,160,161,164,167], weights: [1,1,1,1,1,1,1,1,2,2,2,1,2,2,1,2,2,3,2,3,2,2,2,3,3,1,2,1,1,3,1,2,3] },
  CC: { items: [5,19,26,33,36,45,47,50,51,53,54,56,57,58,59,65,67,72,76,79,81,82,95,96,99,108,109,110,117,136,154], weights: [3,1,3,2,3,2,2,2,1,3,1,2,1,1,3,1,1,2,3,2,1,1,1,2,1,2,2,1,1,3,1] },
  PP: { items: [15,16,24,32,38,39,69,74,80,84,85,89,98,100,112,123,126,131,138,143,146,164], weights: [1,2,2,1,2,1,2,1,3,2,2,1,2,3,1,3,1,2,1,1,2,2] },
  V: { items: [62,90,152,169], weights: [1,1,1,1] }
};

const scaleItemsNegative = {
  '1': { items: [14,20,28], weights: [1,2,1] },
  '2': { items: [14], weights: [1] },
  '3': { items: [41,147,162,163], weights: [1,1,1,1] },
  '4': { items: [3,19,39,51,61,77,126,158], weights: [1,1,1,1,2,1,1,2] },
  '5': { items: [8,31,42,45,51,78,106,149,158], weights: [1,1,2,1,1,1,1,2,2] },
  '6A': { items: [34,42,77,78,81], weights: [1,2,1,2,2] },
  '6B': { items: [31,42,71,77,78,106,145], weights: [1,2,1,2,2,1,1] },
  '7': { items: [7,20,40,43,48,50,60,66,77,86,92,95,103,111,128,145,155], weights: [1,2,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1] },
  '8A': { items: [61,149,159], weights: [1,2,2] },
  '8B': { items: [74], weights: [1] },
  S: { items: [14,48,60], weights: [1,1,1] },
  N: { items: [19,42,158,161], weights: [1,1,1,1] },
  D: { items: [41,86,166], weights: [1,1,2] },
  B: { items: [8,52,122], weights: [1,2,2] },
  T: { items: [61], weights: [1] }
};

function calculateRawScore(answers, scaleName) {
  let sum = 0;
  const positiveItems = scaleItemsPositive[scaleName];
  const negativeItems = scaleItemsNegative[scaleName];

  if (positiveItems) {
    for (let i = 0; i < positiveItems.items.length; i++) {
      const itemNum = positiveItems.items[i];
      const weight = positiveItems.weights[i];
      if (answers[itemNum] === true) {
        sum += weight;
      }
    }
  }

  if (negativeItems) {
    for (let i = 0; i < negativeItems.items.length; i++) {
      const itemNum = negativeItems.items[i];
      const weight = negativeItems.weights[i];
      if (answers[itemNum] === false) {
        sum += weight;
      }
    }
  }

  return sum;
}

function lookupBR(rawScore, brTable) {
  if (rawScore < 0) return brTable[0] || 0;
  if (rawScore >= brTable.length) return brTable[brTable.length - 1];
  return brTable[rawScore];
}

function calculateXCorrection(rrawx) {
  if (rrawx >= 145 && rrawx <= 149) return { xcor: 11, hxcor: 5 };
  if (rrawx >= 150 && rrawx <= 159) return { xcor: 10, hxcor: 5 };
  if (rrawx >= 160 && rrawx <= 169) return { xcor: 9, hxcor: 4 };
  if (rrawx >= 170 && rrawx <= 179) return { xcor: 8, hxcor: 4 };
  if (rrawx >= 180 && rrawx <= 189) return { xcor: 7, hxcor: 3 };
  if (rrawx >= 190 && rrawx <= 199) return { xcor: 6, hxcor: 3 };
  if (rrawx >= 200 && rrawx <= 209) return { xcor: 5, hxcor: 2 };
  if (rrawx >= 210 && rrawx <= 219) return { xcor: 4, hxcor: 2 };
  if (rrawx >= 220 && rrawx <= 229) return { xcor: 3, hxcor: 1 };
  if (rrawx >= 230 && rrawx <= 239) return { xcor: 2, hxcor: 1 };
  if (rrawx >= 240 && rrawx <= 249) return { xcor: 1, hxcor: 0 };
  if (rrawx >= 250 && rrawx <= 400) return { xcor: 0, hxcor: 0 };
  if (rrawx >= 401 && rrawx <= 416) return { xcor: -1, hxcor: 0 };
  if (rrawx >= 417 && rrawx <= 432) return { xcor: -2, hxcor: -1 };
  if (rrawx >= 433 && rrawx <= 448) return { xcor: -3, hxcor: -1 };
  if (rrawx >= 449 && rrawx <= 464) return { xcor: -4, hxcor: -2 };
  if (rrawx >= 465 && rrawx <= 480) return { xcor: -5, hxcor: -2 };
  if (rrawx >= 481 && rrawx <= 496) return { xcor: -6, hxcor: -3 };
  if (rrawx >= 497 && rrawx <= 512) return { xcor: -7, hxcor: -3 };
  if (rrawx >= 513 && rrawx <= 528) return { xcor: -8, hxcor: -4 };
  if (rrawx >= 529 && rrawx <= 544) return { xcor: -9, hxcor: -4 };
  if (rrawx >= 545 && rrawx <= 560) return { xcor: -10, hxcor: -5 };
  if (rrawx >= 561 && rrawx <= 576) return { xcor: -11, hxcor: -5 };
  if (rrawx >= 577 && rrawx <= 590) return { xcor: -12, hxcor: -6 };
  return { xcor: 0, hxcor: 0 };
}

function calculateXScore(rrawx, isMale) {
  if (rrawx < 180) return 0;
  if (rrawx > 180 && rrawx < 195) return 5;
  if (rrawx > 194 && rrawx < 207) return 10;
  if (rrawx > 206 && rrawx < 220) return 15;
  if (rrawx > 219 && rrawx < 232) return 20;
  if (rrawx > 231 && rrawx < 245) return 25;
  if (rrawx > 244 && rrawx < 257) return 30;
  if (rrawx > 256 && rrawx < 270) return isMale ? 35 : 34;
  if (rrawx > 269 && rrawx < 282) return 40;
  if (rrawx > 281 && rrawx < 295) return 45;
  if (rrawx > 294 && rrawx < 307) return 50;
  if (rrawx > 306 && rrawx < 320) return isMale ? 55 : 54;
  if (rrawx > 319 && rrawx < 345) return isMale ? 60 : 55;
  if (rrawx > 344 && rrawx < 357) return isMale ? 63 : 56;
  if (rrawx > 356 && rrawx < 370) return isMale ? 66 : 58;
  if (rrawx > 369 && rrawx < 382) return isMale ? 69 : 60;
  if (rrawx > 381 && rrawx < 395) return isMale ? 72 : 63;
  if (rrawx > 394 && rrawx < 420) return isMale ? 74 : 65;
  if (rrawx > 419 && rrawx < 432) return isMale ? 77 : 67;
  if (rrawx > 431 && rrawx < 445) return isMale ? 79 : 70;
  if (rrawx > 444 && rrawx < 457) return isMale ? 81 : 72;
  if (rrawx > 456 && rrawx < 470) return isMale ? 83 : 75;
  if (rrawx > 469 && rrawx < 483) return isMale ? 85 : 79;
  if (rrawx > 482 && rrawx < 495) return isMale ? 87 : 84;
  if (rrawx > 494 && rrawx < 508) return 89;
  if (rrawx > 507 && rrawx < 520) return 91;
  if (rrawx > 519 && rrawx < 533) return 93;
  if (rrawx > 532 && rrawx < 545) return 95;
  if (rrawx > 544 && rrawx < 558) return 97;
  if (rrawx > 557) return 100;
  return 0;
}

function calculateDAadjust(rawbrD, rawbrA) {
  const dcorrect = rawbrD;
  const acorrect = rawbrA;
  if (dcorrect >= 85) {
    if (acorrect < 85) {
      return dcorrect - 85;
    } else {
      return acorrect + dcorrect - 170;
    }
  }
  return 0;
}

function calculateDDadjust(rawbrY, rawbrZ) {
  let dd = (rawbrY - rawbrZ) / 10;
  if (Math.abs(dd - Math.round(dd)) === 0.5) {
    if (dd === Math.abs(dd)) {
      dd = dd + 0.1;
    } else {
      dd = dd - 0.1;
    }
  }
  let rdd = Math.round(dd);
  if (rdd > 10) rdd = 10;
  if (rdd < -10) rdd = -10;
  return rdd;
}

function findTopTwoPersonalityPatterns(fordc) {
  let biggest = 0;
  let bigger = 0;
  let g = 0;
  let gp = 0;

  for (let j = 3; j <= 12; j++) {
    if (biggest < fordc[j]) {
      biggest = fordc[j];
      g = j;
    }
  }

  for (let j = 3; j <= 12; j++) {
    if (j === g) continue;
    if (bigger < fordc[j]) {
      bigger = fordc[j];
      gp = j;
    }
  }

  return { g, gp };
}

export function calculateMcmiScores(answers, gender, inpatientStatus = 1) {
  const isMale = gender === 'male';
  const brTables = isMale ? maleBrTables : femaleBrTables;
  const scaleOrder = ['Y', 'Z', '1', '2', '3', '4', '5', '6A', '6B', '7', '8A', '8B', 'S', 'C', 'P', 'A', 'H', 'N', 'D', 'B', 'T', 'SS', 'CC', 'PP'];
  const scaleNames = [
    'Desirability', 'Debasement', 'Schizoid', 'Avoidant', 'Dependent',
    'Histrionic', 'Narcissistic', 'Antisocial', 'Aggressive/Sadistic', 'Compulsive',
    'Passive-Aggressive', 'Self-defeating', 'Schizotypal', 'Borderline', 'Paranoid',
    'Anxiety', 'Somatoform', 'Bipolar:Manic', 'Dysthymia', 'Alcohol dependence',
    'Drug dependence', 'Thought Disorder', 'Major Depression', 'Delusional disorder'
  ];

  const maxRawScores = {
    male: { Y: 22, Z: 34, '1': 37, '2': 46, '3': 51, '4': 58, '5': 67, '6A': 54, '6B': 53, '7': 61, '8A': 55, '8B': 43, S: 48, C: 64, P: 62, A: 36, H: 43, N: 44, D: 56, B: 51, T: 60, SS: 39, CC: 46, PP: 36 },
    female: { Y: 21, Z: 35, '1': 44, '2': 51, '3': 53, '4': 52, '5': 57, '6A': 56, '6B': 62, '7': 60, '8A': 53, '8B': 48, S: 48, C: 65, P: 59, A: 39, H: 44, N: 45, D: 57, B: 50, T: 63, SS: 47, CC: 48, PP: 36 }
  };
  const maxScores = isMale ? maxRawScores.male : maxRawScores.female;

  const rawScores = {};
  const rawBR = {};

  for (const scale of scaleOrder) {
    let rawScore = calculateRawScore(answers, scale);
    const maxScore = maxScores[scale];
    if (maxScore && rawScore > maxScore) {
      rawScore = maxScore;
    }
    rawScores[scale] = rawScore;
    rawBR[scale] = lookupBR(rawScore, brTables[scale]);
  }

  const validityScore = calculateRawScore(answers, 'V');
  rawScores['V'] = validityScore;

  const rawx = (rawScores['4'] + rawScores['8A']) * 1.5 +
               (rawScores['1'] + rawScores['2'] + rawScores['3'] + rawScores['8B']) * 1.6 +
               rawScores['5'] + rawScores['6A'] + rawScores['6B'] + rawScores['7'];

  let rx = rawx - Math.trunc(rawx);
  let adjustedRawx = rawx;
  if (rx === 0.5) {
    adjustedRawx = rawx + 0.1;
  }
  const rrawx = Math.round(adjustedRawx);

  const { xcor, hxcor } = calculateXCorrection(rrawx);
  const xScore = calculateXScore(rrawx, isMale);

  const aftercor = {};
  const afterhcor = {};
  const dabr = {};
  const afterddcor = {};
  const afterdccor = {};
  const afterinp = {};
  const afterall = {};
  const fordc = {};

  const dacontain = calculateDAadjust(rawBR['D'], rawBR['A']);
  const ddcontain = calculateDDadjust(rawBR['Y'], rawBR['Z']);

  let da = 0;
  let dac = 0;
  const inpAdjustments = { SS: 0, CC: 0, PP: 0 };

  switch (inpatientStatus) {
    case 1:
    case 4:
      da = Math.trunc(0.25 * dacontain);
      if (da > 15) da = 15;
      dac = Math.trunc(0.5 * dacontain);
      if (dac > 10) dac = 10;
      break;
    case 2:
      da = dacontain;
      if (da > 25) da = 25;
      dac = dacontain;
      if (dac > 20) dac = 20;
      inpAdjustments.SS = 8;
      inpAdjustments.CC = 10;
      inpAdjustments.PP = 4;
      break;
    case 3:
      da = Math.floor(0.5 * dacontain);
      if (da > 15) da = 15;
      dac = Math.floor(0.75 * dacontain);
      if (dac > 15) dac = 15;
      inpAdjustments.SS = 5;
      inpAdjustments.CC = 7;
      inpAdjustments.PP = 2;
      break;
    case 5:
      da = Math.floor(0.5 * dacontain);
      if (da > 15) da = 15;
      dac = Math.floor(0.75 * dacontain);
      if (dac > 15) dac = 15;
      break;
  }

  for (let i = 0; i < scaleOrder.length; i++) {
    const scale = scaleOrder[i];
    const idx = i + 1;

    if (![1, 2, 13, 14, 15, 22, 23, 24].includes(idx)) {
      aftercor[scale] = rawBR[scale] + xcor;
    } else {
      aftercor[scale] = null;
    }

    if ([13, 14, 15, 22, 23, 24].includes(idx)) {
      afterhcor[scale] = rawBR[scale] + hxcor;
    } else {
      afterhcor[scale] = null;
    }

    if (idx === 4) {
      dabr[scale] = aftercor[scale] - da;
    } else if (idx === 12) {
      dabr[scale] = aftercor[scale] - da;
    } else if (idx === 14) {
      dabr[scale] = afterhcor[scale] - dac;
    } else {
      dabr[scale] = null;
    }

    if (idx === 13) {
      afterddcor[scale] = afterhcor[scale] + ddcontain;
    } else if (idx === 14) {
      afterddcor[scale] = dabr[scale] + ddcontain;
    } else if ([16, 17, 19].includes(idx)) {
      afterddcor[scale] = aftercor[scale] + ddcontain;
    } else {
      afterddcor[scale] = null;
    }

    if ([4, 12].includes(idx)) {
      fordc[idx] = dabr[scale];
    } else {
      fordc[idx] = aftercor[scale];
    }
  }

  const { g, gp } = findTopTwoPersonalityPatterns(fordc);

  for (let i = 0; i < scaleOrder.length; i++) {
    const scale = scaleOrder[i];
    const idx = i + 1;

    if (idx > 12) {
      switch (idx) {
        case 13:
        case 14:
        case 16:
        case 17:
        case 19:
          afterdccor[scale] = afterddcor[scale];
          break;
        case 15:
          afterdccor[scale] = afterhcor[scale];
          break;
        default:
          afterdccor[scale] = null;
          break;
      }

      if ([6, 7, 10].includes(g) || gp === 10) {
        switch (idx) {
          case 13:
          case 14:
            if (afterdccor[scale] !== null) afterdccor[scale] += 4;
            break;
          case 15:
            if (afterdccor[scale] !== null) afterdccor[scale] += 2;
            break;
          case 16:
          case 19:
            if (afterdccor[scale] !== null) afterdccor[scale] += 15;
            break;
          case 17:
            if (afterdccor[scale] !== null) afterdccor[scale] += 13;
            break;
        }
      }

      if ([12, 4].includes(g) || gp === 4) {
        switch (idx) {
          case 13:
            if (afterdccor[scale] !== null) afterdccor[scale] -= 2;
            break;
          case 14:
          case 15:
            if (afterdccor[scale] !== null) afterdccor[scale] -= 6;
            break;
          case 16:
            if (afterdccor[scale] !== null) afterdccor[scale] -= 7;
            break;
          case 17:
          case 19:
            if (afterdccor[scale] !== null) afterdccor[scale] -= 5;
            break;
        }
      }
    }

    if (idx === 22) {
      afterinp[scale] = afterhcor[scale] + inpAdjustments.SS;
    } else if (idx === 23) {
      afterinp[scale] = afterhcor[scale] + inpAdjustments.CC;
    } else if (idx === 24) {
      afterinp[scale] = afterhcor[scale] + inpAdjustments.PP;
    } else {
      afterinp[scale] = null;
    }

    switch (idx) {
      case 1:
      case 2:
        afterall[scale] = rawBR[scale];
        break;
      case 3:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 18:
      case 20:
      case 21:
        afterall[scale] = aftercor[scale];
        break;
      case 4:
      case 12:
        afterall[scale] = dabr[scale];
        break;
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 19:
        afterall[scale] = afterdccor[scale];
        break;
      case 22:
      case 23:
      case 24:
        afterall[scale] = afterinp[scale];
        break;
    }

    if (rawScores[scale] === 0 && afterall[scale] > 0) {
      afterall[scale] = 0;
    }
  }

  const results = [];
  for (let i = 0; i < scaleOrder.length; i++) {
    const scale = scaleOrder[i];
    results.push({
      scale: scale,
      name: scaleNames[i],
      rawScore: rawScores[scale],
      brFromTable: rawBR[scale],
      brXCor: aftercor[scale],
      brHalfXCor: afterhcor[scale],
      brDAAdj: dabr[scale],
      brDDAdj: afterddcor[scale],
      brDCAdj: afterdccor[scale],
      brInpAdj: afterinp[scale],
      finalBR: afterall[scale]
    });
  }

  results.push({
    scale: 'X',
    name: 'Disclosure',
    rawScore: rrawx,
    brFromTable: xScore,
    brXCor: null,
    brHalfXCor: null,
    brDAAdj: null,
    brDDAdj: null,
    brDCAdj: null,
    brInpAdj: null,
    finalBR: xScore
  });

  results.push({
    scale: 'V',
    name: 'Validity',
    rawScore: validityScore,
    brFromTable: null,
    brXCor: null,
    brHalfXCor: null,
    brDAAdj: null,
    brDDAdj: null,
    brDCAdj: null,
    brInpAdj: null,
    finalBR: validityScore
  });

  return {
    scales: results,
    validity: {
      validityScore: validityScore,
      isValid: validityScore <= 1,
      disclosureScore: xScore,
      rawX: rrawx
    },
    adjustments: {
      xcor,
      hxcor,
      da,
      dac,
      ddcontain,
      dacontain,
      g,
      gp,
      inpatientStatus
    }
  };
}

export default { calculateMcmiScores };
