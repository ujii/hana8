// 연습문제 195p
type FirstArgs<F extends Function> = F extends (...args: infer ARGS) => void
  ? ARGS[0]
  : never; // 함수의 파라미터는 유일하게 반공변성
type SecondArgs<F extends Function> = F extends (...args: infer ARGS) => void
  ? ARGS[1]
  : never;
type Args<F extends Function> = F extends (...args: infer ARGS) => void
  ? ARGS[number]
  : never;

function add(a: number, b: string, c: boolean) {
  return `${a} - ${b} + ${c}`;
}

type A = FirstArgs<typeof add>; // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>;
// number | string | boolean

type AX = Args<typeof String.prototype.endsWith>; // ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>; // ⇒ number

let a: A = 0;
let b: B = 'abc';
let c: C = Math.random() > 0.5 ? 1 : 'abc';
console.log('🚀 abc:', a, b, c);
