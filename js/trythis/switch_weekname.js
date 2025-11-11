// function getWeekName(date) {
//   console.log('🚀 ~ getWeekName ~ date:', date);
// }

// getWeekName(new Date());

// function getWeekName() {
//   const date = arguments[0];
//   console.log('🚀 ~ getWeekName ~ date:', date);
// }

// getWeekName();

// function getWeekNameBad(date) {
//   //if (date === undefined) date = new Date(); // 명령형
//   date = date ?? new Date(); // 선언형

//   console.log('🚀 ~ getWeekName ~ date:', date);
//   let weekName;

//   switch (date.getDay()) {
//     case 0:
//       weekName = '일';
//       break;
//     case 1:
//       weekName = '월';
//       break;
//     case 2:
//       weekName = '화';
//       break;
//     case 3:
//       weekName = '수';
//       break;
//     case 4:
//       weekName = '목';
//       break;
//     case 5:
//       weekName = '금';
//       break;
//     case 6:
//       weekName = '토';
//       break;
//   }

//   console.log(`오늘은 ${weekName}요일입니다.`);
// }

// getWeekName();

// 선언형
const WEEKNAMES = '일월화수목금토';

function getWeekName(date) {
  const weekName = WEEKNAMES[(date ?? new Date()).getDay()];
  console.log(`오늘은 ${weekName}요일입니다.`);
}

const getWN = (date) => WEEKNAMES[(date ?? new Date()).getDay()];

console.log(`오늘은 ${getWN()}요일입니다.`);
