const myName: string = 'Kim';
console.log('🚀 Hi~ :', myName);

let x: string | undefined;
x = Math.random() > 0.5 ? 'abc' : undefined;
console.log(x?.length);

type FN = (input: string | number) => number;
const ff: FN = (i: string | number) => {
  return +i * 100;
};
ff(1);

const f2 = (i: string | number | boolean) => +i + 1;
const f3 = (i: string | number) => +i + 1;
type Y = string | number;
let y: Y = 1;
const f4 = (i: string) => +i + 1;
// cb = f4; // dog = animal;
// f4 = cb;
function f(cb: FN) {
  cb(1);
  cb('1');
}
f(f2);
f(f3);
f(f3);
// f(f4);
