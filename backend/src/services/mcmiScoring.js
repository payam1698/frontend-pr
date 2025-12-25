const check = (answers, index, value) => {
  return answers[index - 1] === value;
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
  '25': { code: 'V', name: 'Validity' },
  '1': { code: 'Y', name: 'Desirability' },
  '2': { code: 'Z', name: 'Debasement' },
  '3': { code: '1', name: 'Schizoid' },
  '4': { code: '2A', name: 'Avoidant' },
  '5': { code: '3', name: 'Dependent' },
  '6': { code: '4', name: 'Histrionic' },
  '7': { code: '5', name: 'Narcissistic' },
  '8': { code: '6A', name: 'Antisocial' },
  '9': { code: '6B', name: 'Aggressive/Sadistic' },
  '10': { code: '7', name: 'Compulsive' },
  '11': { code: '8A', name: 'Passive-Aggressive' },
  '12': { code: '8B', name: 'Self-Defeating' },
  '13': { code: 'S', name: 'Schizotypal' },
  '14': { code: 'C', name: 'Borderline' },
  '15': { code: 'P', name: 'Paranoid' },
  '16': { code: 'A', name: 'Anxiety' },
  '17': { code: 'H', name: 'Somatoform' },
  '18': { code: 'N', name: 'Bipolar: Manic' },
  '19': { code: 'D', name: 'Dysthymia' },
  '20': { code: 'B', name: 'Alcohol Dependence' },
  '21': { code: 'T', name: 'Drug Dependence' },
  '22': { code: 'SS', name: 'Thought Disorder' },
  '23': { code: 'CC', name: 'Major Depression' },
  '24': { code: 'PP', name: 'Delusional Disorder' }
};

export const calculateScores = (answers, userInfo) => {
  const gender = userInfo.gender;
  const rawScores = calculateRawScores(answers, gender);
  
  const baseRates = {};
  const adjustedScores = {};
  
  Object.keys(rawScores).forEach(scaleId => {
    const raw = rawScores[scaleId];
    const br = Math.min(115, Math.max(0, Math.round(raw * 2.5 + 20)));
    baseRates[scaleId] = br;
    
    adjustedScores[scaleId] = {
      raw,
      br,
      xCor: 0,
      hxCor: 0,
      daAdj: null,
      ddAdj: null,
      dcAdj: null,
      inpAdj: null,
      final: br
    };
  });
  
  const xScore = rawScores['1'] - rawScores['2'];
  
  return {
    rawScores,
    baseRates,
    adjustedScores,
    xScore
  };
};
