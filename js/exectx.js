var x = 1;

function f1() {
  console.log(x, this.y, z); // static에서 1 출력, dynamic에서 2 출력
  // [[OuterEnv]]

  function f1_inner() {
    // [[OuterEnv]] : f1 // 변수가 나한테 없으면 내 상위 스코프(f1)로 간다
  }
}

function f2() {
  // Function Object로 등록
  var x = 2;
  console.log('🚀 ~ f2:', f2, new.target);
  this.y = 999; // this는 전역 관련한 어떠한 것. 따라서 f1과 공유 가능
  // f1.bind({ y: 100 })(); // 바인딩하면 y는 999가 아니라 100 출력

  f1 = f1.bind({ y: 100 })();
  f1(); // 항상 y는 100
  // [[ThisBindingStatus]]
}

global.z = 555; // globalThis.z 가 맞음
let cnt = 0;
const f3 = function () {
  // 실행될 때 등록됨. Memory Creation Phase에서 생성 X
  cnt++;
};

f2();
console.log('--------------------');
new f2(); // [[NewTarget]]
f3(); // 아니면 f3이 호출될 때 등록됨
console.log('--------------------');
f1();
