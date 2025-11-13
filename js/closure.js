function discount() {
  const dcRate = 0.1;

  return function (price) {
    // orgPrice로 전달해주는 인자는 여기로!!
    return price * dcRate;
  };
}

const items = [
  { item: '상품A', price: 32000 },
  { item: '상품B', price: 45000 },
];

const discounter = discount();

for (const { item, price: orgPrice } of items) {
  // 이름 중복이기 때문에 혼동을 피하기 위해 변수명(orgPrice) 새로 설정
  const salePrice = orgPrice - discounter(orgPrice); // closure로 인자 전달
  console.log(`🚀 ${item} salePrice:`, salePrice.toLocaleString()); // 현재 언어에 맞춰 숫자 표기 ex: 10,000(한국)
}

console.log('---------------------');

const actions = ['입장', '입장', '입장', '퇴장', '입장', '퇴장']; // Status Queue

//const { connect, disconnect, getCount } = currentCount(); // 변수명을 다르게 받고 싶으면 connect: conn 이런 식으로 받아야한다
const [conn, disconn, get] = currentCount(); // {}안의 값을 마음대로 해도 된다

for (const status of actions) {
  if (status === '입장') conn();
  else disconn();
}

function currentCount() {
  let cnt = 0; // private variable

  function connect() {
    cnt++;
  }

  function disconnect() {
    cnt--;
  }

  // return {
  //   connect: connect,
  //   disconnect: disconnect,
  //   getCount: function getCount() {
  //     return cnt;
  //   },
  // };

  return [
    connect,
    disconnect,
    function () {
      return cnt;
    },
  ];
}
console.log('🚀 ~ cnt:', get());
