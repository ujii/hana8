// Utility Type 연습문제 177p

type User = {
  id: number;
  name: string;
  12: number;
};

// 1) 다음에서 key가 number 타입이면 key앞에 user_를 붙이세요.

type UserNumKeyPrefix = {
  [k in keyof User as k extends number ? `user_${k}` : k]: User[k];
};

// 2) 다음에서 key가 string 타입인 것만 남기세요.

type UserOnlyStrKey = {
  [k in keyof User as k extends string ? k : never]: User[k];
};

// 3) User에서 key가 string 타입인 것만 남기고 prefix(user_)를 붙이세요 (2가지)

type UserOnlyStrKeyPrefix = {
  // [k in keyof User as k extends string? `user_${k}` : never ]: User[k];
  [k in keyof User as `user_${k & string}`]: User[k];
};

// ---
// 연습문제 178p
interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}

type Change<T, K extends keyof T, U> = {
  [k in keyof T]: k extends K ? U : T[k];
};

type DeptCaptain = Change<IDept, 'captain', IUser>;
type Err = Change<IDept, 'xxx', IUser>; // 존재하지 않는 키는 Error!!!

const dc: DeptCaptain = {
  id: 2,
  age: '1년',
  dname: 'Sales',
  captain: { id: 1, name: 'Hong', age: 33 },
};

// ---
// 연습문제 179p
type Com = IUser & IDept;
type Combine<T, U> = {
  [k in keyof T & U]: k extends keyof T & keyof U ? T[k] | U[k] : (T & U)[k];
};
type ICombined = Combine<IUser, IDept>;

let combineX: ICombined = {
  id: 0,
  age: 33,
  name: 'aaa',
  dname: 'bbb',
  captain: 'ccc',
};
let combineY: ICombined = {
  id: 0,
  age: '33세',
  name: 'aaa',
  dname: 'bbb',
  captain: 'ccc',
};

// ---
// 연습문제 180p
type Item = { item: string; price: number };
type ItemPrice<T, U> = {
  [k in keyof T]: k extends 'item' ? keyof U : T[k];
};
const stock = { X: 1, Y: 2, Z: 30 };

type StockItem = ItemPrice<Item, typeof stock>;
const itemPrices: StockItem[] = [
  { item: 'X', price: 1000 },
  { item: 'Y', price: 2000 },
  { item: 'Z', price: 3000 },
  { item: 'P', price: 4000 }, // stock에 존재하지 않는 키는 Error!!!
];

const total = itemPrices.reduce(
  (curr, itemPrice) => curr + stock[itemPrice.item] * itemPrice.price,
  0
);
