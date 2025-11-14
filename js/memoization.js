const assert = require('assert');
const { Console } = require('console');

const memoizedTable = {};
// {2: 2 * 1}
// {3: 3 * f(2)} => {3: 3 * 2}
// => {3: 6, 2: 2, 4: 4 * 6, 5: 5 * 4 * 6}

let runCnt = 0; // 실행횟수 세는 변수
function factorial(n) {
  runCnt++;
  if (n === 1) return 1;
  // return n * factorial(n - 1);
  return memoizedTable[n] ?? (memoizedTable[n] = n * factorial(n - 1));
}

console.log(factorial(3), runCnt);
runCnt = 0;
console.log(factorial(5), runCnt);
runCnt = 0;
console.log(factorial(10), runCnt);

function memoized(fn) {
  const cache = {};
  return function (k) {
    return cache[k] ?? (cache[k] = fn(k));
  };
}

function facto(k) {
  return k;
}
const memoizedFactorial = memoized(function factorial(k) {
  runCnt++;
  if (k === 1) return 1;
  return k * memoizedFactorial(k - 1);
});

console.log('------------ memorized ------------------');
runCnt = 0;
console.log(memoizedFactorial(3), runCnt);
runCnt = 0;
console.log(memoizedFactorial(5), runCnt);
runCnt = 0;
console.log(memoizedFactorial(10), runCnt);

assert.strictEqual(memoizedFactorial(10), 3628800, 'xx'); // assert method
