// 프론트엔드 기초 연습문제 110p
const assert = require('assert');

assert.equal(loopFibonacci(5), 5);
assert.equal(loopFibonacci(7), 13);
assert.equal(loopFibonacci(30), 832040);
const memoizedTable = {};

function loopFibonacci(n) {
  const seqs = [0, 1];

  for (let i = 2; i <= n; i++) {
    seqs.push(seqs[i - 2] + seqs[i - 1]);
  }
  return seqs[n];
}
console.log('🚀 ~ loopFibonacci:', loopFibonacci(5));

assert.equal(recurFibonacci(5), 5);
assert.equal(recurFibonacci(7), 13);
assert.equal(recurFibonacci(30), 832040);
function recurFibonacci(n) {
  if (n <= 1) return n;
  return recurFibonacci(n - 2) + recurFibonacci(n - 1);
}
console.log('🚀 ~ recurFibonacci:', recurFibonacci(7));

function memoized(fn) {
  const cache = {};

  return function (k) {
    return cache[k] ?? (cache[k] = fn(k));
  };
}

const memoFibonacci = memoized(function (n) {
  if (n <= 1) return n;
  return memoFibonacci(n - 1) + memoFibonacci(n - 2);
});

assert.equal(memoFibonacci(5), 5);
assert.equal(memoFibonacci(7), 13);
assert.equal(memoFibonacci(30), 832040);

console.log('🚀 ~ memoFibonacci:', memoFibonacci(5));
console.log('🚀 ~ memoFivonacci:', memoFibonacci(7));
console.log('🚀 ~ memoFivonacci:', memoFibonacci(30));

function runFn(fn) {
  // 속도 측정
  console.time(fn.name || 'memoFibo');
  for (let i = 10; i < 100; i += 10) {
    fn(i);
  }
  console.timeEnd(fn.name || 'memoFibo');
}
runFn(loopFibonacci);
runFn(memoFibonacci);
