// 프론트엔드 기초 연습문제 104p
const ma10 = makeArray(10);

function makeArrayLoop(n) {
  const arr = [];

  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }
  return arr;
}

function makeArray(n) {
  if (n === 1) return [1];
  return [...makeArray(n - 1), n];
}
console.log('🚀 ~ makeArray:', ma10);

const mra5 = makeReverseArray(5);

function makeReverseArray(n) {
  if (n === 1) return [1];
  return [n, ...makeReverseArray(n - 1)];
}
console.log('🚀 ~ makeReverseArray:', mra5);

const maTCO = makeArrayTCO(10);
function makeArrayTCO(n, acc = []) {
  if (n === 1) return [1, ...acc];
  return makeArrayTCO(n - 1, [n, ...acc]);
}
console.log('🚀 ~ makeArrayTCO:', maTCO);
