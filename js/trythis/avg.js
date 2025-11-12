// 프론트엔드 기초 36p

const N = 100000000;

avg([
  10.34232323,
  15,
  'xxx',
  5.67899,
  null,
  20.9,
  1.005121,
  0,
  15.234,
  undefined,
  0.5,
]);

function avg(prices) {
  let cnt = 0;
  let sum = 0;

  for (const price of prices) {
    if (price === null || isNaN(price)) continue;

    sum += price * N * 100;
    cnt++;
  }

  const ret = Math.trunc(sum / cnt / N) / 100;
  console.log('🚀 ~ ret:', ret);
}
