const check = (answers, index, value) => {
  return answers[index - 1] === value;
};

const maleTables = {
  '1': [0, 5, 10, 15, 20, 25, 30, 34, 39, 43, 46, 50, 56, 62, 67, 72, 75, 78, 82, 85, 90, 95, 100],
  '2': [12, 24, 35, 38, 42, 45, 48, 52, 55, 57, 59, 61, 63, 65, 67, 69, 70, 71, 73, 75, 76, 77, 78, 79, 80, 82, 84, 85, 87, 89, 91, 93, 95, 97, 100],
  '3': [0, 0, 0, 0, 0, 0, 0, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58, 63, 66, 67, 69, 70, 71, 71, 73, 74, 76, 78, 81, 83, 86, 88, 91, 96, 101, 106, 108, 109, 111, 116, 121],
  '4': [6, 6, 6, 6, 6, 6, 6, 16, 26, 41, 44, 47, 50, 53, 57, 61, 66, 66, 67, 68, 68, 69, 71, 74, 76, 78, 81, 82, 83, 84, 86, 88, 90, 94, 97, 100, 101, 103, 105, 106, 108, 110, 112, 114, 116, 118, 121],
  '5': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 23, 34, 40, 42, 50, 59, 66, 66, 66, 69, 71, 72, 74, 77, 78, 80, 81, 85, 89, 91, 93, 94, 94, 94, 95, 96, 98, 100, 102, 106, 111, 116, 121],
  '6': [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11, 13, 16, 18, 26, 36, 41, 44, 47, 50, 53, 55, 57, 59, 61, 63, 66, 67, 68, 69, 70, 71, 73, 74, 76, 78, 79, 80, 81, 82, 83, 85, 87, 89, 90, 91, 94, 96, 99, 103, 108, 112, 116, 118, 121],
  '7': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 12, 19, 23, 27, 32, 35, 38, 41, 44, 47, 49, 51, 52, 55, 61, 66, 67, 69, 70, 72, 73, 75, 77, 80, 81, 83, 86, 88, 90, 92, 93, 96, 98, 100, 101, 101, 102, 103, 104, 104, 105, 106, 108, 110, 112, 114, 116, 118, 119, 120, 121],
  '8': [0, 0, 0, 0, 0, 0, 0, 0, 9, 13, 17, 22, 27, 32, 37, 42, 44, 47, 49, 52, 54, 57, 59, 62, 64, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 77, 79, 81, 83, 85, 87, 88, 91, 94, 98, 101, 104, 106, 108, 110, 112, 114, 116, 118, 121],
  '9': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 15, 25, 35, 37, 39, 41, 43, 45, 47, 49, 50, 52, 54, 56, 62, 66, 67, 68, 70, 73, 75, 78, 79, 80, 83, 86, 88, 89, 93, 96, 98, 100, 102, 104, 105, 106, 114, 116, 118, 119, 121],
  '10': [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11, 14, 18, 23, 26, 31, 34, 36, 39, 41, 46, 54, 59, 61, 61, 61, 61, 61, 62, 63, 64, 65, 67, 71, 75, 78, 80, 83, 86, 90, 93, 94, 95, 96, 97, 98, 102, 106, 108, 110, 113, 116, 118, 121],
  '11': [0, 0, 0, 0, 0, 0, 0, 2, 7, 12, 17, 22, 27, 32, 34, 36, 38, 40, 42, 44, 47, 49, 51, 55, 62, 66, 67, 68, 69, 70, 71, 74, 76, 78, 81, 85, 88, 90, 94, 98, 102, 105, 107, 108, 110, 111, 111, 112, 113, 114, 116, 117, 118, 119, 120, 121],
  '12': [0, 0, 0, 10, 20, 30, 35, 38, 41, 44, 47, 50, 55, 60, 61, 66, 67, 68, 69, 70, 71, 72, 73, 74, 74, 74, 75, 76, 76, 77, 78, 79, 81, 83, 89, 93, 98, 104, 111, 116, 119, 120, 120, 121],
  '13': [6, 6, 6, 16, 26, 36, 41, 43, 46, 48, 51, 53, 56, 58, 61, 63, 64, 64, 65, 65, 66, 66, 67, 67, 68, 68, 69, 69, 70, 70, 71, 71, 72, 72, 73, 73, 74, 75, 77, 81, 84, 87, 90, 97, 105, 110, 116, 119, 121],
  '14': [0, 0, 0, 0, 0, 11, 16, 21, 26, 31, 36, 41, 42, 43, 44, 45, 46, 48, 50, 53, 56, 58, 59, 61, 63, 66, 66, 66, 66, 66, 66, 67, 68, 69, 70, 71, 72, 73, 73, 73, 74, 74, 75, 75, 75, 75, 76, 76, 77, 80, 84, 87, 92, 95, 97, 100, 104, 108, 110, 112, 114, 116, 118, 119, 121],
  '15': [0, 0, 0, 0, 0, 0, 12, 15, 17, 19, 27, 37, 42, 45, 49, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 65, 66, 66, 67, 68, 69, 69, 70, 70, 71, 72, 72, 73, 73, 74, 75, 77, 80, 82, 85, 88, 92, 95, 98, 100, 102, 104, 107, 109, 111, 113, 117, 120, 121],
  '16': [0, 0, 0, 20, 30, 40, 50, 60, 62, 64, 66, 70, 72, 75, 77, 79, 81, 83, 85, 86, 87, 88, 89, 90, 90, 90, 91, 93, 95, 96, 98, 100, 102, 105, 109, 113, 115],
  '17': [0, 0, 0, 15, 30, 40, 48, 55, 57, 58, 59, 59, 60, 60, 61, 61, 62, 62, 63, 63, 64, 64, 65, 65, 66, 66, 67, 67, 67, 68, 68, 68, 69, 70, 72, 75, 83, 87, 92, 96, 100, 105, 110, 115],
  '18': [0, 0, 0, 0, 0, 0, 2, 5, 10, 12, 20, 30, 35, 37, 39, 41, 44, 47, 50, 53, 57, 60, 60, 60, 60, 60, 60, 60, 61, 62, 63, 64, 65, 67, 69, 71, 73, 75, 79, 82, 85, 90, 95, 110, 115],
  '19': [0, 0, 0, 0, 10, 15, 18, 21, 25, 27, 30, 32, 35, 42, 49, 55, 58, 59, 61, 63, 71, 73, 74, 76, 80, 85, 87, 88, 89, 90, 90, 90, 91, 91, 92, 92, 93, 93, 93, 94, 94, 95, 96, 96, 97, 98, 98, 99, 99, 100, 100, 104, 107, 110, 112, 114, 115],
  '20': [0, 0, 0, 0, 0, 0, 0, 0, 15, 25, 35, 38, 41, 45, 48, 51, 55, 60, 61, 62, 63, 64, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 86, 88, 89, 90, 92, 93, 94, 95, 97, 98, 99, 100, 101, 103, 105, 108, 111, 113, 115],
  '21': [0, 0, 0, 0, 0, 0, 0, 5, 10, 15, 20, 25, 30, 35, 37, 39, 41, 44, 48, 51, 54, 57, 60, 60, 60, 61, 61, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 75, 77, 79, 81, 83, 85, 86, 87, 89, 90, 91, 92, 94, 95, 97, 98, 99, 100, 103, 106, 109, 112, 115],
  '22': [0, 0, 0, 35, 40, 44, 50, 55, 60, 60, 60, 60, 60, 61, 61, 62, 62, 63, 65, 67, 67, 68, 68, 69, 70, 70, 71, 72, 73, 75, 77, 79, 80, 82, 85, 90, 95, 100, 110, 115],
  '23': [0, 35, 38, 41, 44, 47, 50, 55, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 61, 62, 63, 64, 65, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 75, 76, 77, 78, 79, 80, 83, 85, 90, 95, 100, 110, 115],
  '24': [0, 0, 0, 10, 25, 35, 38, 41, 44, 47, 51, 53, 55, 57, 60, 60, 60, 61, 63, 64, 65, 67, 69, 71, 72, 73, 75, 80, 85, 88, 91, 94, 97, 100, 105, 110, 115]
};

const femaleTables = {
  '1': [0, 0, 0, 10, 20, 24, 28, 34, 35, 41, 45, 50, 57, 63, 67, 71, 75, 80, 85, 91, 95, 100],
  '2': [0, 15, 25, 34, 35, 37, 40, 43, 45, 46, 48, 49, 51, 52, 54, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 78, 82, 85, 87, 88, 90, 92, 94, 97, 100],
  '3': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 35, 47, 50, 53, 56, 60, 62, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 81, 84, 86, 88, 90, 91, 96, 104, 111, 118, 121],
  '4': [0, 0, 0, 0, 0, 15, 21, 31, 41, 44, 48, 51, 53, 60, 64, 66, 67, 69, 70, 71, 72, 73, 74, 75, 76, 76, 77, 78, 79, 80, 81, 83, 85, 87, 88, 89, 90, 91, 94, 97, 100, 102, 104, 105, 106, 108, 110, 111, 116, 118, 120, 121],
  '5': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 15, 20, 30, 37, 45, 55, 66, 68, 69, 70, 71, 72, 75, 78, 81, 84, 87, 89, 91, 93, 95, 97, 99, 101, 102, 103, 103, 104, 105, 108, 112, 116, 118, 121],
  '6': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 15, 18, 21, 24, 31, 36, 41, 49, 56, 58, 59, 61, 62, 63, 64, 66, 69, 70, 74, 78, 79, 80, 81, 81, 82, 83, 84, 86, 89, 91, 92, 93, 93, 94, 94, 96, 97, 99, 101, 106, 121],
  '7': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 13, 23, 33, 35, 38, 40, 43, 45, 48, 52, 58, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 84, 85, 86, 87, 89, 91, 96, 101, 106, 112, 118, 121],
  '8': [0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 17, 22, 27, 32, 42, 45, 47, 50, 52, 57, 58, 59, 61, 62, 63, 64, 65, 66, 66, 66, 67, 69, 70, 72, 73, 75, 76, 78, 79, 80, 81, 85, 87, 89, 90, 90, 91, 95, 98, 100, 102, 103, 105, 106, 111, 116, 121],
  '9': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 35, 37, 40, 43, 46, 49, 52, 56, 60, 62, 63, 64, 65, 66, 67, 68, 69, 71, 74, 76, 79, 81, 82, 84, 85, 88, 91, 94, 97, 100, 103, 106, 109, 112, 115, 118, 121],
  '10': [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 11, 15, 20, 24, 29, 33, 37, 40, 43, 46, 51, 58, 61, 61, 61, 61, 61, 62, 63, 64, 66, 68, 72, 77, 80, 83, 86, 90, 93, 95, 96, 97, 98, 99, 100, 103, 106, 109, 112, 115, 118, 121],
  '11': [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 15, 20, 25, 30, 33, 35, 37, 39, 41, 43, 46, 48, 51, 55, 62, 66, 67, 68, 69, 70, 71, 74, 77, 79, 82, 85, 89, 92, 96, 100, 104, 107, 109, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121],
  '12': [0, 0, 0, 5, 15, 25, 30, 34, 38, 42, 46, 50, 54, 58, 60, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 82, 84, 87, 90, 94, 98, 103, 108, 114, 118, 120, 121],
  '13': [6, 6, 6, 10, 20, 30, 38, 41, 44, 47, 51, 54, 58, 61, 62, 63, 64, 65, 66, 66, 66, 66, 67, 67, 68, 68, 69, 69, 70, 70, 71, 72, 73, 73, 74, 75, 77, 79, 82, 86, 90, 96, 104, 112, 118, 121],
  '14': [0, 0, 0, 0, 0, 5, 11, 17, 23, 29, 35, 41, 43, 45, 48, 51, 54, 57, 60, 61, 62, 63, 64, 65, 66, 66, 66, 66, 67, 67, 68, 69, 70, 71, 72, 73, 74, 74, 75, 76, 77, 79, 81, 84, 88, 92, 97, 103, 110, 116, 121],
  '15': [0, 0, 0, 0, 0, 0, 5, 10, 15, 21, 28, 36, 41, 45, 49, 53, 55, 57, 59, 60, 61, 62, 63, 64, 65, 66, 66, 66, 66, 67, 67, 68, 69, 70, 71, 72, 73, 74, 76, 78, 81, 84, 88, 93, 99, 106, 115, 121],
  '16': [0, 0, 0, 15, 25, 35, 45, 55, 60, 62, 64, 68, 71, 74, 76, 78, 80, 82, 84, 86, 88, 89, 90, 91, 92, 93, 94, 95, 97, 98, 100, 102, 105, 108, 112, 115],
  '17': [0, 0, 0, 10, 25, 35, 45, 55, 58, 59, 60, 61, 62, 63, 64, 65, 66, 66, 66, 66, 67, 67, 68, 69, 70, 71, 73, 76, 80, 85, 92, 100, 110, 115],
  '18': [0, 0, 0, 0, 0, 0, 0, 5, 10, 15, 22, 30, 36, 40, 43, 46, 50, 53, 56, 59, 60, 60, 61, 61, 62, 63, 64, 65, 66, 68, 70, 72, 74, 77, 80, 84, 89, 94, 100, 108, 115],
  '19': [0, 0, 0, 0, 5, 10, 14, 18, 22, 26, 30, 34, 40, 47, 54, 58, 60, 62, 64, 70, 74, 76, 78, 80, 83, 86, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 104, 106, 109, 112, 115],
  '20': [0, 0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 35, 40, 45, 50, 55, 60, 61, 62, 63, 64, 66, 68, 70, 73, 76, 79, 82, 85, 88, 91, 94, 97, 100, 104, 108, 112, 115],
  '21': [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 15, 22, 30, 35, 40, 45, 50, 55, 60, 60, 60, 61, 62, 63, 64, 66, 68, 70, 72, 75, 78, 81, 85, 89, 94, 99, 105, 112, 115],
  '22': [0, 0, 0, 30, 38, 45, 52, 58, 60, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 72, 74, 76, 79, 82, 86, 91, 97, 105, 115],
  '23': [0, 30, 36, 42, 48, 54, 60, 60, 60, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 74, 76, 78, 80, 83, 86, 90, 94, 99, 105, 112, 115],
  '24': [0, 0, 0, 5, 18, 30, 36, 42, 48, 53, 58, 60, 60, 61, 63, 65, 67, 69, 72, 75, 79, 83, 88, 94, 100, 108, 115]
};

const lookupBR = (scaleId, rawScore, gender) => {
  const table = gender === 'male' ? maleTables[scaleId] : femaleTables[scaleId];
  if (!table) return 0;
  if (rawScore >= table.length) {
    return table[table.length - 1];
  }
  return table[rawScore] || 0;
};

export const calculateRawScores = (answers, gender) => {
  const scores = {};

  let v = 0;
  if (check(answers, 62, true)) v += 1;
  if (check(answers, 90, true)) v += 1;
  if (check(answers, 152, true)) v += 1;
  if (check(answers, 169, true)) v += 1;
  scores['25'] = v;

  let y = 0;
  [4,14,34,39,60,61,75,78,86,88,89,93,103,106,122,125,126,137,138,149,153,159,166].forEach(i => {
    if (check(answers, i, true)) y += 1;
  });
  if (gender === 'male' && y > 21) y = 21;
  if (gender === 'female' && y > 22) y = 22;
  scores['1'] = y;

  let z = 0;
  [3,5,8,18,23,24,25,26,27,33,36,43,45,49,50,51,53,54,58,59,63,66,67,68,71,72,76,79,82,96,97,99,100,102,108,110,114,115,117,118,120,128,132,136,158,167].forEach(i => {
    if (check(answers, i, true)) z += 1;
  });
  if (gender === 'male' && z > 35) z = 35;
  if (gender === 'female' && z > 34) z = 34;
  scores['2'] = z;

  let s1 = 0;
  const s1Items = [
    [2,true,3],[10,true,2],[13,true,3],[14,false,1],[16,true,1],[19,true,3],[20,false,2],[22,true,1],
    [25,true,1],[28,false,1],[33,true,2],[34,true,3],[46,true,1],[47,true,2],[48,false,2],[53,true,1],
    [60,false,1],[78,false,1],[81,true,3],[83,true,2],[85,true,1],[95,false,1],[103,false,1],[106,true,2],
    [108,true,1],[111,false,1],[124,true,2],[125,false,1],[159,true,1],[160,true,1],[161,true,3],[141,true,1],
    [142,true,1],[143,true,3],[150,true,2]
  ];
  s1Items.forEach(([i,v,w]) => { if (check(answers, i, v)) s1 += w; });
  if (gender === 'male' && s1 > 44) s1 = 44;
  if (gender === 'female' && s1 > 40) s1 = 40;
  scores['3'] = s1;

  let s2 = 0;
  const s2Items = [
    [2,true,1],[3,true,3],[8,true,3],[14,false,1],[19,true,2],[21,false,1],[23,true,2],[25,true,2],
    [27,true,2],[28,false,1],[32,true,2],[34,true,1],[45,true,1],[47,true,2],[49,true,3],[56,true,2],
    [57,true,2],[63,true,3],[77,true,3],[81,true,1],[83,true,2],[85,true,1],[102,true,2],[106,true,1],
    [109,true,1],[110,true,2],[113,true,1],[115,true,2],[118,true,2],[120,true,3],[125,false,1],[133,true,1],
    [139,true,1],[141,true,3],[147,true,1],[150,true,2],[155,true,2],[158,true,3],[160,true,1],[163,false,1],[171,true,2]
  ];
  s2Items.forEach(([i,v,w]) => { if (check(answers, i, v)) s2 += w; });
  if (gender === 'male' && s2 > 51) s2 = 51;
  if (gender === 'female' && s2 > 46) s2 = 46;
  scores['4'] = s2;

  let s3 = 0;
  const s3Items = [
    [4,false,2],[7,false,1],[10,true,3],[12,false,1],[21,false,1],[28,false,1],[31,true,3],[34,true,2],
    [40,false,1],[41,false,1],[42,true,3],[43,false,1],[49,true,1],[54,true,1],[57,true,2],[60,true,2],
    [74,false,1],[75,true,1],[77,true,2],[78,true,3],[81,true,2],[91,false,1],[92,false,1],[97,true,2],
    [101,false,1],[106,true,3],[110,true,1],[125,true,1],[133,true,3],[145,true,3],[147,false,1],[149,true,1],
    [159,true,3],[162,false,1],[163,false,1],[168,true,1],[173,true,3]
  ];
  s3Items.forEach(([i,v,w]) => { if (check(answers, i, v)) s3 += w; });
  if (gender === 'male' && s3 > 53) s3 = 53;
  if (gender === 'female' && s3 > 51) s3 = 51;
  scores['5'] = s3;

  let s4 = 0;
  const s4Items = [
    [3,false,1],[7,true,1],[9,true,2],[14,true,3],[19,false,1],[20,true,3],[28,true,3],[37,true,1],
    [39,false,1],[40,true,1],[41,true,1],[42,true,2],[43,true,2],[48,true,3],[51,false,1],[56,true,1],
    [60,true,3],[61,false,2],[66,true,2],[77,false,1],[86,true,3],[89,true,1],[91,true,1],[95,true,1],
    [103,true,2],[111,true,3],[125,true,3],[126,false,1],[128,true,1],[130,true,1],[133,true,2],[137,true,3],
    [142,true,1],[158,false,2],[162,true,1],[166,true,2],[170,true,3],[171,true,1],[172,true,1],[173,true,1]
  ];
  s4Items.forEach(([i,v,w]) => { if (check(answers, i, v)) s4 += w; });
  if (gender === 'male' && s4 > 52) s4 = 52;
  if (gender === 'female' && s4 > 58) s4 = 58;
  scores['6'] = s4;

  let s5 = 0;
  const s5Items = [
    [1,true,3],[2,true,1],[4,true,2],[6,true,3],[8,false,1],[12,true,1],[14,true,2],[15,true,3],
    [16,true,2],[22,true,1],[28,true,1],[31,false,1],[32,true,1],[37,true,3],[41,true,2],[42,false,2],
    [43,true,1],[45,false,1],[51,false,1],[55,true,1],[60,true,1],[78,false,1],[80,true,1],[85,true,1],
    [86,true,2],[89,true,3],[91,true,3],[103,true,2],[106,false,1],[111,true,2],[125,true,2],[126,true,1],
    [129,true,3],[130,true,1],[131,true,3],[134,true,1],[135,true,1],[137,true,2],[142,true,3],[143,true,1],
    [146,true,1],[149,false,2],[158,false,2],[163,true,1],[165,true,2],[166,true,3],[170,true,2],[171,true,2],[172,true,2]
  ];
  s5Items.forEach(([i,v,w]) => { if (check(answers, i, v)) s5 += w; });
  if (gender === 'male' && s5 > 57) s5 = 57;
  if (gender === 'female' && s5 > 67) s5 = 67;
  scores['7'] = s5;

  let s6a = 0;
  const s6aItems = [
    [1,true,2],[7,true,3],[12,true,2],[15,true,1],[20,true,2],[22,true,2],[32,true,2],[34,false,1],
    [38,true,2],[40,true,3],[42,false,2],[43,true,2],[44,true,1],[48,true,1],[55,true,2],[64,true,1],
    [73,true,2],[74,true,2],[77,false,1],[78,false,2],[80,true,2],[81,false,2],[85,true,1],[86,true,2],
    [87,true,2],[91,true,2],[92,true,3],[94,true,3],[101,true,1],[103,true,3],[104,true,1],[111,true,1],
    [113,true,1],[116,true,3],[129,true,2],[130,true,3],[140,true,1],[142,true,2],[144,true,2],[147,true,3],
    [157,true,1],[162,true,3],[165,true,2],[171,true,1],[172,true,3]
  ];
  s6aItems.forEach(([i,v,w]) => { if (check(answers, i, v)) s6a += w; });
  if (gender === 'male' && s6a > 56) s6a = 56;
  if (gender === 'female' && s6a > 54) s6a = 54;
  scores['8'] = s6a;

  let s6b = 0;
  const s6bItems = [
    [1,true,2],[4,true,3],[7,true,1],[9,true,3],[12,true,3],[21,true,2],[30,true,3],[31,false,1],
    [32,true,1],[38,true,1],[40,true,1],[41,true,3],[42,false,2],[43,true,1],[44,true,3],[58,true,1],
    [64,true,2],[66,true,1],[71,false,1],[74,true,2],[77,false,2],[78,false,2],[80,true,1],[82,true,2],
    [84,true,2],[86,true,1],[91,true,2],[95,true,1],[101,true,3],[106,false,1],[107,true,2],[115,true,2],
    [121,true,2],[129,true,2],[134,true,3],[135,true,1],[142,true,1],[145,false,1],[146,true,1],[147,true,1],
    [148,true,3],[155,true,2],[163,true,3],[165,true,1],[166,true,2]
  ];
  s6bItems.forEach(([i,v,w]) => { if (check(answers, i, v)) s6b += w; });
  if (gender === 'male' && s6b > 62) s6b = 62;
  if (gender === 'female' && s6b > 53) s6b = 53;
  scores['9'] = s6b;

  let s7 = 0;
  const s7Items = [
    [4,true,1],[7,false,1],[20,false,2],[21,true,3],[32,true,1],[39,true,3],[40,false,1],[43,false,1],
    [46,true,3],[48,false,2],[50,false,1],[60,false,1],[61,true,3],[64,true,2],[66,false,1],[74,true,1],
    [75,true,3],[77,false,1],[78,true,1],[81,true,1],[86,false,2],[88,true,3],[92,false,1],[95,false,1],
    [103,false,1],[111,false,1],[126,true,3],[128,false,1],[134,true,2],[138,true,3],[145,false,2],[148,true,2],
    [149,true,3],[153,true,3],[155,false,1],[159,true,2],[161,true,2],[163,true,2]
  ];
  s7Items.forEach(([i,v,w]) => { if (check(answers, i, v)) s7 += w; });
  if (gender === 'male' && s7 > 60) s7 = 60;
  if (gender === 'female' && s7 > 61) s7 = 61;
  scores['10'] = s7;

  let s8a = 0;
  const s8aItems = [
    [1,true,1],[4,true,1],[9,true,2],[12,true,1],[16,true,2],[21,true,1],[22,true,3],[23,true,1],
    [25,true,1],[28,true,2],[43,true,2],[50,true,3],[51,true,1],[55,true,3],[58,true,1],[61,false,1],
    [64,true,2],[66,true,3],[73,true,2],[74,true,2],[77,true,2],[82,true,2],[86,true,2],[95,true,3],
    [101,true,2],[104,true,3],[107,true,3],[110,true,1],[115,true,2],[120,true,1],[123,true,2],[128,true,2],
    [129,true,1],[135,true,3],[139,true,1],[149,false,2],[155,true,2],[156,true,3],[159,false,2],[165,true,3],[171,true,1]
  ];
  s8aItems.forEach(([i,v,w]) => { if (check(answers, i, v)) s8a += w; });
  if (gender === 'male' && s8a > 53) s8a = 53;
  if (gender === 'female' && s8a > 55) s8a = 55;
  scores['11'] = s8a;

  let s8b = 0;
  const s8bItems = [
    [8,true,1],[10,true,2],[16,true,2],[18,true,1],[23,true,3],[25,true,1],[28,true,2],[31,true,1],
    [42,true,2],[45,true,2],[51,true,2],[54,true,2],[56,true,2],[57,true,3],[63,true,1],[65,true,3],
    [71,true,1],[73,true,1],[74,false,1],[77,true,2],[81,true,1],[82,true,1],[99,true,1],[106,true,2],
    [110,true,3],[115,true,2],[120,true,2],[121,true,3],[128,true,1],[132,true,2],[133,true,1],[139,true,3],
    [141,true,1],[145,true,2],[154,true,3],[155,true,2],[167,true,1]
  ];
  s8bItems.forEach(([i,v,w]) => { if (check(answers, i, v)) s8b += w; });
  if (gender === 'male' && s8b > 51) s8b = 51;
  if (gender === 'female' && s8b > 54) s8b = 54;
  scores['12'] = s8b;

  let sS = 0;
  const sSItems = [
    [2,true,1],[10,true,3],[13,true,2],[16,true,3],[19,true,2],[22,true,2],[25,true,2],[27,true,1],
    [47,true,3],[67,true,3],[68,true,2],[81,true,1],[83,true,3],[85,true,3],[108,true,2],[112,true,3],
    [114,true,3],[117,true,2],[124,true,3],[141,true,2],[143,true,2],[150,true,3],[161,true,3]
  ];
  sSItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sS += w; });
  if (gender === 'male' && sS > 47) sS = 47;
  if (gender === 'female' && sS > 45) sS = 45;
  scores['13'] = sS;

  let sC = 0;
  const sCItems = [
    [3,true,2],[8,true,3],[16,true,2],[25,true,2],[27,true,2],[29,true,3],[47,true,3],[49,true,2],
    [53,true,2],[56,true,2],[57,true,3],[63,true,2],[67,true,2],[77,true,2],[83,true,2],[85,true,1],
    [97,true,2],[99,true,2],[102,true,2],[112,true,1],[113,true,1],[117,true,1],[118,true,2],[120,true,2],
    [141,true,2],[150,true,2],[155,true,3],[158,true,3]
  ];
  sCItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sC += w; });
  if (gender === 'male' && sC > 51) sC = 51;
  if (gender === 'female' && sC > 48) sC = 48;
  scores['14'] = sC;

  let sP = 0;
  const sPItems = [
    [1,true,1],[6,true,1],[15,true,2],[16,true,3],[17,true,3],[22,true,3],[29,true,2],[37,true,2],
    [55,true,3],[67,true,2],[80,true,3],[85,true,2],[87,true,3],[112,true,2],[114,true,2],[123,true,2],
    [127,true,3],[131,true,2],[140,true,3],[143,true,2],[148,true,2],[160,true,3],[165,true,2],[174,true,3]
  ];
  sPItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sP += w; });
  if (gender === 'male' && sP > 52) sP = 52;
  if (gender === 'female' && sP > 47) sP = 47;
  scores['15'] = sP;

  let sA = 0;
  const sAItems = [
    [3,true,3],[23,true,2],[27,true,3],[45,true,2],[49,true,2],[63,true,2],[65,true,2],[77,true,3],
    [96,true,2],[97,true,3],[100,true,3],[102,true,2],[109,true,2],[110,true,2],[115,true,3],[118,true,2],
    [120,true,2],[132,true,3],[136,true,2],[155,true,2],[158,true,2],[167,true,3],[171,true,2]
  ];
  sAItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sA += w; });
  if (gender === 'male' && sA > 45) sA = 45;
  if (gender === 'female' && sA > 44) sA = 44;
  scores['16'] = sA;

  let sH = 0;
  const sHItems = [
    [5,true,3],[11,true,2],[26,true,2],[36,true,3],[52,true,3],[69,true,2],[72,true,3],[76,true,3],
    [79,true,2],[98,true,3],[105,true,3],[119,true,2],[151,true,3],[164,true,3],[175,true,3]
  ];
  sHItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sH += w; });
  if (gender === 'male' && sH > 36) sH = 36;
  if (gender === 'female' && sH > 34) sH = 34;
  scores['17'] = sH;

  let sN = 0;
  const sNItems = [
    [18,true,2],[24,true,3],[33,true,2],[35,true,3],[36,true,2],[43,true,1],[50,true,2],[51,true,2],
    [53,true,3],[54,true,2],[58,true,2],[59,true,3],[66,true,2],[71,true,2],[72,true,2],[82,true,2],
    [96,true,1],[99,true,2],[108,true,1],[110,true,2],[128,true,3],[132,true,2],[136,true,3]
  ];
  sNItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sN += w; });
  if (gender === 'male' && sN > 42) sN = 42;
  if (gender === 'female' && sN > 43) sN = 43;
  scores['18'] = sN;

  let sD = 0;
  const sDItems = [
    [8,true,2],[18,true,2],[23,true,2],[24,true,2],[25,true,2],[45,true,2],[50,true,2],[51,true,3],
    [54,true,3],[56,true,2],[58,true,2],[71,true,2],[77,true,2],[97,true,2],[99,true,1],[100,true,2],
    [110,true,2],[114,true,2],[115,true,2],[117,true,2],[118,true,2],[120,true,2],[128,true,2],[136,true,3],[158,true,2]
  ];
  sDItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sD += w; });
  if (gender === 'male' && sD > 47) sD = 47;
  if (gender === 'female' && sD > 46) sD = 46;
  scores['19'] = sD;

  let sB = 0;
  const sBItems = [
    [7,true,2],[11,true,1],[20,true,2],[38,true,3],[40,true,2],[44,true,2],[48,true,2],[55,true,2],
    [64,true,3],[70,true,3],[73,true,2],[74,true,2],[80,true,2],[84,true,2],[87,true,3],[92,true,2],
    [94,true,3],[104,true,2],[116,true,2],[130,true,2],[144,true,3],[162,true,2],[172,true,2]
  ];
  sBItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sB += w; });
  if (gender === 'male' && sB > 49) sB = 49;
  if (gender === 'female' && sB > 44) sB = 44;
  scores['20'] = sB;

  let sT = 0;
  const sTItems = [
    [5,true,2],[11,true,3],[24,true,2],[26,true,3],[36,true,2],[52,true,2],[69,true,3],[72,true,2],
    [76,true,3],[79,true,3],[98,true,3],[105,true,3],[119,true,3],[151,true,2],[164,true,3],[175,true,2]
  ];
  sTItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sT += w; });
  if (gender === 'male' && sT > 40) sT = 40;
  if (gender === 'female' && sT > 38) sT = 38;
  scores['21'] = sT;

  let sSS = 0;
  const sSSItems = [
    [17,true,2],[29,true,2],[67,true,3],[68,true,3],[80,true,2],[87,true,2],[112,true,3],[114,true,3],
    [123,true,3],[127,true,3],[140,true,3],[148,true,2],[151,true,2],[160,true,2],[174,true,3]
  ];
  sSSItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sSS += w; });
  if (gender === 'male' && sSS > 36) sSS = 36;
  if (gender === 'female' && sSS > 31) sSS = 31;
  scores['22'] = sSS;

  let sCC = 0;
  const sCCItems = [
    [18,true,2],[24,true,3],[25,true,3],[33,true,2],[45,true,2],[51,true,2],[54,true,3],[56,true,2],
    [59,true,3],[63,true,2],[65,true,2],[67,true,1],[96,true,3],[100,true,3],[108,true,2],[118,true,2],
    [132,true,2],[136,true,2],[139,true,2],[154,true,3],[167,true,2]
  ];
  sCCItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sCC += w; });
  if (gender === 'male' && sCC > 46) sCC = 46;
  if (gender === 'female' && sCC > 45) sCC = 45;
  scores['23'] = sCC;

  let sPP = 0;
  const sPPItems = [
    [6,true,2],[16,true,2],[17,true,3],[22,true,2],[29,true,3],[37,true,3],[55,true,2],[67,true,2],
    [68,true,2],[87,true,2],[114,true,2],[127,true,3],[140,true,2],[143,true,2],[148,true,3],[160,true,3],[174,true,3]
  ];
  sPPItems.forEach(([i,v,w]) => { if (check(answers, i, v)) sPP += w; });
  if (gender === 'male' && sPP > 41) sPP = 41;
  if (gender === 'female' && sPP > 36) sPP = 36;
  scores['24'] = sPP;

  return scores;
};

export const scaleNames = {
  '1': { code: 'Y', name: 'Desirability' },
  '2': { code: 'Z', name: 'Debasement' },
  '3': { code: '1', name: 'Schizoid' },
  '4': { code: '2', name: 'Avoidant' },
  '5': { code: '3', name: 'Dependent' },
  '6': { code: '4', name: 'Histrionic' },
  '7': { code: '5', name: 'Narcissistic' },
  '8': { code: '6A', name: 'Antisocial' },
  '9': { code: '6B', name: 'Aggressive/Sadistic' },
  '10': { code: '7', name: 'Compulsive' },
  '11': { code: '8A', name: 'Passive-Aggressive' },
  '12': { code: '8B', name: 'Self-defeating' },
  '13': { code: 'S', name: 'Schizotypal' },
  '14': { code: 'C', name: 'Borderline' },
  '15': { code: 'P', name: 'Paranoid' },
  '16': { code: 'A', name: 'Anxiety' },
  '17': { code: 'H', name: 'Somatoform' },
  '18': { code: 'N', name: 'Bipolar:Manic' },
  '19': { code: 'D', name: 'Dysthymia' },
  '20': { code: 'B', name: 'Alcohol dependence' },
  '21': { code: 'T', name: 'Drug dependence' },
  '22': { code: 'SS', name: 'Thought Disorder' },
  '23': { code: 'CC', name: 'Major Depression' },
  '24': { code: 'PP', name: 'Delusional disorder' },
  '25': { code: 'X', name: 'Disclosure' }
};

export const calculateScores = (answers, userInfo) => {
  const gender = userInfo.gender;
  const rawScores = calculateRawScores(answers, gender);
  
  console.log('=== MCMI-II DEBUG (Backend) ===');
  console.log('Gender:', gender);
  console.log('Raw Scores:', JSON.stringify(rawScores));
  
  const baseRates = {};
  const adjustedScores = {};
  
  Object.keys(rawScores).forEach(scaleId => {
    if (scaleId === '25') return;
    baseRates[scaleId] = lookupBR(scaleId, rawScores[scaleId], gender);
  });

  console.log('BR Scores (from tables):', JSON.stringify(baseRates));

  const w4 = rawScores['4'] || 0;
  const w12 = rawScores['12'] || 0;
  const w3 = rawScores['3'] || 0;
  const w5 = rawScores['5'] || 0;
  const w6 = rawScores['6'] || 0;
  const w7 = rawScores['7'] || 0;
  const w8 = rawScores['8'] || 0;
  const w9 = rawScores['9'] || 0;
  const w10 = rawScores['10'] || 0;
  const w11 = rawScores['11'] || 0;

  let rawx = (w6 + w11) * 1.5 + (w3 + w4 + w5 + w12) * 1.6 + w7 + w8 + w9 + w10;
  
  const rx = rawx - Math.trunc(rawx);
  if (rx === 0.5) {
    rawx = rawx + 0.1;
  }
  const rrawx = Math.round(rawx);

  let xcor = 0;
  let hxcor = 0;

  if (rrawx >= 145 && rrawx <= 149) { xcor = 11; hxcor = 5; }
  else if (rrawx >= 150 && rrawx <= 159) { xcor = 10; hxcor = 5; }
  else if (rrawx >= 160 && rrawx <= 169) { xcor = 9; hxcor = 4; }
  else if (rrawx >= 170 && rrawx <= 179) { xcor = 8; hxcor = 4; }
  else if (rrawx >= 180 && rrawx <= 189) { xcor = 7; hxcor = 3; }
  else if (rrawx >= 190 && rrawx <= 199) { xcor = 6; hxcor = 3; }
  else if (rrawx >= 200 && rrawx <= 209) { xcor = 5; hxcor = 2; }
  else if (rrawx >= 210 && rrawx <= 219) { xcor = 4; hxcor = 2; }
  else if (rrawx >= 220 && rrawx <= 229) { xcor = 3; hxcor = 1; }
  else if (rrawx >= 230 && rrawx <= 239) { xcor = 2; hxcor = 1; }
  else if (rrawx >= 240 && rrawx <= 249) { xcor = 1; hxcor = 0; }
  else if (rrawx >= 401 && rrawx <= 416) { xcor = -1; hxcor = 0; }
  else if (rrawx >= 417 && rrawx <= 432) { xcor = -2; hxcor = -1; }
  else if (rrawx >= 433 && rrawx <= 448) { xcor = -3; hxcor = -1; }
  else if (rrawx >= 449 && rrawx <= 464) { xcor = -4; hxcor = -2; }
  else if (rrawx >= 465 && rrawx <= 480) { xcor = -5; hxcor = -2; }
  else if (rrawx >= 481 && rrawx <= 496) { xcor = -6; hxcor = -3; }
  else if (rrawx >= 497 && rrawx <= 512) { xcor = -7; hxcor = -3; }
  else if (rrawx >= 513 && rrawx <= 528) { xcor = -8; hxcor = -4; }
  else if (rrawx >= 529 && rrawx <= 544) { xcor = -9; hxcor = -4; }
  else if (rrawx >= 545 && rrawx <= 560) { xcor = -10; hxcor = -5; }
  else if (rrawx >= 561 && rrawx <= 576) { xcor = -11; hxcor = -5; }
  else if (rrawx >= 577 && rrawx <= 590) { xcor = -12; hxcor = -6; }

  let xValue = 0;
  if (rrawx < 180) xValue = 0;
  else if (rrawx < 195) xValue = 5;
  else if (rrawx < 207) xValue = 10;
  else if (rrawx < 220) xValue = 15;
  else if (rrawx < 232) xValue = 20;
  else if (rrawx < 245) xValue = 25;
  else if (rrawx < 257) xValue = 30;
  else if (rrawx < 270) xValue = gender === 'male' ? 34 : 35;
  else if (rrawx < 282) xValue = 40;
  else if (rrawx < 295) xValue = 45;
  else if (rrawx < 307) xValue = 50;
  else if (rrawx < 320) xValue = gender === 'male' ? 54 : 55;
  else if (rrawx < 345) xValue = gender === 'male' ? 55 : 60;
  else if (rrawx < 357) xValue = gender === 'male' ? 56 : 63;
  else if (rrawx < 370) xValue = gender === 'male' ? 58 : 66;
  else if (rrawx < 382) xValue = gender === 'male' ? 60 : 69;
  else if (rrawx < 395) xValue = gender === 'male' ? 63 : 72;
  else if (rrawx < 420) xValue = gender === 'male' ? 65 : 74;
  else if (rrawx < 432) xValue = gender === 'male' ? 67 : 77;
  else if (rrawx < 445) xValue = gender === 'male' ? 70 : 79;
  else if (rrawx < 457) xValue = gender === 'male' ? 72 : 81;
  else if (rrawx < 470) xValue = gender === 'male' ? 75 : 83;
  else if (rrawx < 483) xValue = gender === 'male' ? 79 : 85;
  else if (rrawx < 495) xValue = gender === 'male' ? 84 : 87;
  else if (rrawx < 508) xValue = 89;
  else if (rrawx < 520) xValue = 91;
  else if (rrawx < 533) xValue = 93;
  else if (rrawx < 545) xValue = 95;
  else if (rrawx < 558) xValue = 97;
  else xValue = 100;

  console.log('X Calculation: rrawx=', rrawx, 'xcor=', xcor, 'hxcor=', hxcor, 'xValue=', xValue);

  const afterCor = {};
  const afterHCor = {};

  Object.keys(baseRates).forEach(k => {
    const legacyIndex = parseInt(k);
    if (![1, 2, 13, 14, 15, 22, 23, 24].includes(legacyIndex)) {
      afterCor[k] = baseRates[k] + xcor;
    } else {
      afterCor[k] = baseRates[k];
    }

    if ([13, 14, 15, 22, 23, 24].includes(legacyIndex)) {
      afterHCor[k] = baseRates[k] + hxcor;
    } else {
      afterHCor[k] = baseRates[k];
    }
  });

  const dCorrect = baseRates['19'] || 0;
  const aCorrect = baseRates['16'] || 0;
  
  let daAdjValue = 0;
  if (dCorrect >= 85) {
    if (aCorrect < 85) {
      daAdjValue = dCorrect - 85;
    } else {
      daAdjValue = aCorrect + dCorrect - 170;
    }
  }

  let da = 0; 
  let dac = 0;
  const inpVal = userInfo.inpatientStatus || '5';

  switch (inpVal) {
    case '1':
    case '4':
      da = Math.trunc(0.25 * daAdjValue);
      if (da > 15) da = 15;
      dac = Math.trunc(0.5 * daAdjValue);
      if (dac > 10) dac = 10;
      break;
    case '2':
      da = daAdjValue;
      if (da > 25) da = 25;
      dac = daAdjValue;
      if (dac > 20) dac = 20;
      break;
    case '3':
      da = Math.floor(0.5 * daAdjValue);
      if (da > 15) da = 15;
      dac = Math.floor(0.75 * daAdjValue);
      if (dac > 15) dac = 15;
      break;
    case '5':
    default:
      da = Math.floor(0.5 * daAdjValue);
      if (da > 15) da = 15;
      dac = Math.floor(0.75 * daAdjValue);
      if (dac > 15) dac = 15;
      break;
  }

  const daBr = {};
  daBr['4'] = afterCor['4'] - da;
  daBr['12'] = afterCor['12'] - da;
  daBr['14'] = afterHCor['14'] - dac;

  let dd = (baseRates['1'] - baseRates['2']) / 10;
  if (Math.abs(dd - Math.round(dd)) === 0.5) {
    if (dd === Math.abs(dd)) dd += 0.1;
    else dd -= 0.1;
  }
  let rdd = Math.round(dd);
  if (rdd > 10) rdd = 10;
  if (rdd < -10) rdd = -10;

  const ddBr = {};
  ddBr['13'] = afterHCor['13'] + rdd;
  ddBr['14'] = daBr['14'] + rdd;
  ddBr['16'] = afterCor['16'] + rdd;
  ddBr['17'] = afterCor['17'] + rdd;
  ddBr['19'] = afterCor['19'] + rdd;

  const forDC = {};
  for(let i=3; i<=12; i++) {
    const k = i.toString();
    if (i === 4 || i === 12) {
      forDC[k] = daBr[k];
    } else {
      forDC[k] = afterCor[k];
    }
  }

  let biggest = -999;
  let g = 0;
  for (let i = 3; i <= 12; i++) {
    if (biggest < forDC[i.toString()]) {
      biggest = forDC[i.toString()];
      g = i;
    }
  }

  let bigger = -999;
  let gp = 0;
  for (let i = 3; i <= 12; i++) {
    if (i === g) continue;
    if (bigger < forDC[i.toString()]) {
      bigger = forDC[i.toString()];
      gp = i;
    }
  }

  const dcBr = {};
  dcBr['13'] = ddBr['13'];
  dcBr['14'] = ddBr['14'];
  dcBr['15'] = afterHCor['15'];
  dcBr['16'] = ddBr['16'];
  dcBr['17'] = ddBr['17'];
  dcBr['19'] = ddBr['19'];

  if ([6, 7, 10].includes(g) || gp === 10) {
    dcBr['13'] += 4;
    dcBr['14'] += 4;
    dcBr['15'] += 2;
    dcBr['16'] += 15;
    dcBr['19'] += 15;
    dcBr['17'] += 13;
  }

  if ([12, 4].includes(g) || gp === 4) {
    dcBr['13'] -= 2;
    dcBr['14'] -= 6;
    dcBr['15'] -= 6;
    dcBr['16'] -= 7;
    dcBr['17'] -= 5;
    dcBr['19'] -= 5;
  }

  const finalInp = {};
  let ssAdj = 0, ccAdj = 0, ppAdj = 0;
  if (inpVal === '2') { 
    ssAdj = 8; ccAdj = 10; ppAdj = 4;
  } else if (inpVal === '3') { 
    ssAdj = 5; ccAdj = 7; ppAdj = 2;
  }

  finalInp['22'] = afterHCor['22'] + ssAdj;
  finalInp['23'] = afterHCor['23'] + ccAdj;
  finalInp['24'] = afterHCor['24'] + ppAdj;

  const finalBR = {};
  finalBR['1'] = baseRates['1'];
  finalBR['2'] = baseRates['2'];
  ['3', '5', '6', '7', '8', '9', '10', '11', '18', '20', '21'].forEach(k => finalBR[k] = afterCor[k]);
  finalBR['4'] = daBr['4'];
  finalBR['12'] = daBr['12'];
  ['13', '14', '15', '16', '17', '19'].forEach(k => finalBR[k] = dcBr[k]);
  ['22', '23', '24'].forEach(k => finalBR[k] = finalInp[k]);

  Object.keys(finalBR).forEach(k => finalBR[k] = Math.round(finalBR[k]));

  console.log('Final BR Scores:', JSON.stringify(finalBR));

  Object.keys(baseRates).forEach(k => {
    adjustedScores[k] = {
      raw: rawScores[k],
      br: baseRates[k],
      xCor: afterCor[k] || 0,
      hxCor: afterHCor[k] || 0,
      daAdj: daBr[k] || null,
      ddAdj: ddBr[k] || null,
      dcAdj: dcBr[k] || null,
      inpAdj: finalInp[k] || null,
      final: finalBR[k] || 0
    };
  });

  adjustedScores['25'] = {
    raw: rrawx,
    br: xValue,
    xCor: 0,
    hxCor: 0,
    daAdj: null,
    ddAdj: null,
    dcAdj: null,
    inpAdj: null,
    final: xValue
  };

  return {
    rawScores,
    baseRates,
    adjustedScores,
    xScore: xValue
  };
};
