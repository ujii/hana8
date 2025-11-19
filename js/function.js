// 함수 표현식
const gate1counter = (function () {
  // 재귀처럼 함수를 사용할 게 아니라면 함수 이름 생략 가능
  let count = 0;
  return function () {
    return ++count;
  };
})(); // 즉시호출함수(IIFE). 한번만 실행하면 될 때 작성하는 방식
// (function ~~~)까지가 함수 객체
// () 를 씌우면 value가 됨

// const gate1counter = counter();
console.log('🚀 ~ gate1counter:', gate1counter());
console.log('🚀 ~ gate2counter:', gate1counter());
console.log('🚀 ~ gate2counter:', gate1counter());

let data;
(async function af() {
  data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(
    (res) => res.json()
  );
  //console.log('🚀 ~ data:', data);

  return data;
})().then((data) => console.log('🚀 ~ data:', data));

// const data = await af();
// console.log('🚀 ~ data:', data);

setTimeout(function () {
  console.log('xxxxxxxxxxx');
}, 1000); // 1초 후 실행

for (let i = 0; i < 10; i++) {
  // var i 와 let i일 때 다르게 출력됨
  setTimeout(
    function (n) {
      // n은 memory create phase에서 먼저 생김
      console.log('xxxx', i, n);
    },
    1000,
    i
  );
}

// setInterval(
//   function (n) {
//     console.log('xxxxxxxxxxxxxxxxxxxx', n);
//   },
//   1000,
//   100
// ); // 1초마다 실행

const intl = setInterval(
  function (n) {
    n, console.log('interval', n);
  },
  1000,
  100
);

setTimeout(() => clearInterval(intl), 5000);
