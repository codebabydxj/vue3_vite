const addAccurate = (arg: any) => { // 加法的精确计算
  let decimalX = 0;
  let decimalY = 0;
  let result = arg.shift();
  let waitCalNum = 0;
  let m = 0;
  while (arg.length) {
    waitCalNum = arg.shift();
    try {
      decimalX = result.toString().split('.')[1].length;
    } catch (e) {
      decimalX = 0;
    }
    try {
      decimalY = waitCalNum.toString().split('.')[1].length;
    } catch (e) {
      decimalY = 0;
    }
    m = Math.pow(10, Math.max(decimalX, decimalY));
    result = (multiAccurate(result, m) + multiAccurate(waitCalNum, m)) / m;
  }
  return result;
}
const multiAccurate = (arg1: any, arg2: any) => { // 乘法的精确计算
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    if (s1.indexOf('.') !== -1) {
      m += s1.split('.')[1].length;
    }
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    if (s2.indexOf('.') !== -1) {
      m += s2.split('.')[1].length;
    }
  } catch (e: any) {
    throw new Error(e);
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

export { addAccurate, multiAccurate };