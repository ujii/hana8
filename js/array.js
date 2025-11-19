const hong = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
const users = [hong, kim, lee, park];

const arr = Array.from({ length: 5 }, (_, i) => i + 1);

const isEven = (n) => n % 2 === 0;
const ev1 = arr.map((_, i) => isEven(i));
console.log('🚀 ~ ev1:', ev1);

// const ev2 = arr.map(a => isEven(a));
const ev2 = arr.map(isEven);
console.log('🚀 ~ ev2:', ev2);

// const onlyEvens = arr.filter((a) => a % 2 === 0);
const onlyEvens = arr.filter(isEven);
console.log('🚀 ~ onlyEvens:', onlyEvens);
arr.forEach((a) => console.log(a, isEven(a)));
for (let i = 0; i < arr.length; i++) console.log(arr[i], isEven(arr[i]));
for (const a of arr) console.log(a, isEven(a)); // forEach와 달리 중간에 중지할 수 있다

const arr2 = [...arr];
const arr3 = arr2.concat(arr);
console.log('🚀 ~ arr3:', arr3);
const arr4 = [...arr2, ...arr];
console.log('🚀 ~ arr4:', arr4);

const a3 = arr.find((a) => a === 3); // 뒤에서부터 찾음
console.log('🚀 ~ a3:', a3);
const evenOdds = Object.groupBy(arr, (a) => (isEven(a) ? 'even' : 'odd'));
console.log('🚀 ~ evenOdds:', evenOdds);

//const jarr = arr.join(', ');
const jarr = arr.join('');
console.log('🚀 ~ jarr:', jarr);

//         0  1  2  3  4  5  6
const a = [1, 2, 3, 4, 5, 6, 7];
//               3, 4, 5, 6, 7
//        [1, 2, 3, 4, 3, 4, 5]
// a.copyWithin(4, 2);
//        [1, 2, 3, 4, 3, 4, 7]
a.copyWithin(4, 2, 4);
console.log('🚀 ~ a:', a);

let b = a;
b.push('02', '01', '03', 'a', 'c', '나', 'b', 'ba', '다');
const s1 = b.sort();
console.log('🚀 ~ s1:', s1);
b = a;
const s2 = b.sort((a, b) => a - b);
console.log('🚀 ~ s2:', s2);
const s3 = b.sort((a, b) => (a < b ? 1 : -1));
console.log('🚀 ~ s3:', s3);
b = a;
const s4 = b.sort((a, b) => (a < b ? 1 : -1));
console.log('🚀 ~ s4:', s4);

[users[1], users[2]] = [users[2], users[1]];
console.log(users);
const us1 = users.sort(({ id }, { id: id2 }) => id - id2);
console.log('🚀 ~ us1:', us1);
console.log('--------------------', arr2);

const shallow = arr2.slice();
console.log('🚀 ~ shallow:', shallow);
const shallow2 = [...arr2];
console.log('🚀 ~ shallow2:', shallow2);
console.log('--------------------', arr2);
//
// [ 1, 2, 3, 4, 5]
const sp1 = arr2.splice(1, 3);
console.log('🚀 ~ sp1:', sp1, arr2);
// [1, 5]
arr2.splice(1, 0, ...sp1);
console.log('🚀 ~ arr2:', arr2);

const sp2 = arr2.splice(2);
console.log('🚀 ~ arr2:', arr2);
arr2.splice(2, 0, ...sp2);
console.log('🚀 ~ arr2:', arr2);
