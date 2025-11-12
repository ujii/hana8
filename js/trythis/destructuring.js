const hong = { id: 1, name: 'Hong' };
const lee = { id: 2, name: 'Lee' };

f1(hong);
f2(hong);
f1(lee);
f2(lee);

function f1(user) {
  const { id, name } = user;
  console.log(id, name);
}

function f2(id, name) {
  console.log(id, name);
}

console.log('-----------------------------------------');
// 연습문제 56p

const arr = [[{ id: 1 }], [{ id: 2 }], [{ id: 3 }]];
const [[{ id: id1 }], [{ id: id2 }], [{ id: id3 }]] = arr;
console.log(id1, id2, id3);

console.log('-----------------------------------------');
// 연습문제 57p
const user = { name: 'Hong', passwd: 'xyz', addr: 'Seoul' };

function getUserValueExceptInitial(k) {
  const { [k]: val } = user; // user[k] vs user.k
  const [, ...rest] = val;
  return rest.join('');
}

console.log(getUserValueExceptInitial('name')); // 'ong'
console.log(getUserValueExceptInitial('passwd')); // 'yz'
console.log(getUserValueExceptInitial('addr')); // 'eoul'

console.log('-----------------------------------------');
//연습문제 58p
const ar = [1, 2];

[ar[0], ar[1]] = [ar[1], ar[0]];
console.log(ar);
