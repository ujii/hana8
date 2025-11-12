// 프론트엔드 기초 35p

// 함수는 호이스팅되기 때문에 함수 선언 전에 사용 가능
addPoints(0.21354, 0.1); // 0.31354
addPoints(0.14, 0.28); // 0.42
addPoints(0.34, 0.226); // 0.566
addPoints(10.34, 200.226); // 210.566
addPoints(0.143, -10.28); // -10.137
addPoints(0.143, -10); // -9.857

function addPoints(a, b) {
  const alen = pointLength(a);
  const blen = pointLength(b);

  //const ret = alen > blen ? (a + b).toFixed(alen) : (a + b).toFixed(blen);
  //const ret = (a + b).toFixed(alen > blen ? alen : blen);
  const ret = (a + b).toFixed(Math.max(alen, blen));

  console.log(a, b, '->', +ret);
}

function pointLength(num) {
  //if (num === undefined || num === null) return 0;
  if (!num) return 0; // falsy 이용. 0이나 undefined면 false

  // 전체 길이 - 정수 길이 - 점(.) 계산하면 소수점 몇자리까지인지 구할 수 있음
  return num.toString().length - Math.trunc(num).toString().length - 1; // trunc는 소수점 아래를 절삭하는 함수
}
