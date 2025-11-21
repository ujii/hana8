var X = 999;
export default X;
Array.prototype.mapBy = function (prop) {
  return this.map((a) => a[prop]);
};

export const isEndJaum = (str) => {
  // export, import를 작성하면 함수를 모듈로 인정
  const lastChar = str.at(-1);
  if (/[lmnr136780]/i.test(lastChar)) return true;

  const lastCharCode = lastChar.charCodeAt();
  const 가 = '가'.charCodeAt();
  const 힣 = '힣'.charCodeAt();
  if (
    lastCharCode >= 가 &&
    lastCharCode <= 힣 &&
    (lastCharCode - 가) % 28 !== 0
  )
    return true;

  const ㄱ = 'ㄱ'.charCodeAt();
  const ㅎ = 'ㅎ'.charCodeAt();
  if (lastCharCode >= ㄱ && lastCharCode <= ㅎ) return true;

  return false;
};

const josa = (str, ja_mo) => {
  const [ja, mo] = ja_mo.split('/');
  return isEndJaum(str) ? ja : mo;
};
export const iga = (str) => josa(str, '이/가');
export const eunun = (str) => josa(str, '은/는');
export const eulul = (str) => josa(str, '을/를');
export const eyuya = (str) => josa(str, '이어야/여야');

export const searchByKoreanInitialSound = (data, first) => {
  // ㄱ => [ㄱ가-깋], ㄴ => [ㄴ나-닣]
  // ㄱㄴ => [ㄱ가-깋][ㄴ나-닣]
  const ㄱㄴㄷ = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
  const 가나다 = '가까나다따라마바빠사싸아자짜차카타파하';
  const 힣nextCode = '힣'.charCodeAt(0) + 1;
  const regStr = [...first].reduce((reg, c) => {
    const idx = ㄱㄴㄷ.indexOf(c);
    const S = 가나다[idx];
    const eCode = (가나다[idx + 1]?.charCodeAt() ?? 힣nextCode) - 1;

    return `${reg}[${c}${S}-${String.fromCharCode(eCode)}]`;
  }, '');
  //console.log('🚀 ~ searchByKoreanInitialSound ~ regStr:', regStr);
  const regExp = new RegExp(regStr);

  return data.filter((d) => regExp.test(d));
};

const s = [
  '강원도 고성군',
  '고성군 토성면',
  '토성면 북면',
  '북면',
  '김1수',
  '홍길동',
];
