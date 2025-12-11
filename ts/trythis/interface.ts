interface User {
  id: number;
  name: string;
}

interface Dept {
  id: number;
  dname: string;
  captain: string;
}

// type Ud2T = (User | Dept) & { addr: string }; // (a + b) * c = ac + bc // union이 있으면 extends 불가
type Ud2T = User & Dept;
type Ud2TU = User | Dept;
type xx = { [k in keyof User | keyof Dept]: string | number };
interface Ud2 {
  id: number;
  name?: string;
  dname?: string;
  captain?: string;
  //  [x: string]: number | string | undefined; 또는 해당줄만 쓰고 name~captain 3줄 안쓰기
  addr: string;
}

// 다음 코드가 오류가 없으면 통과!
const ud2: Ud2 = { id: 1, name: 'HH', addr: 'Seoul' };
const ud3: Ud2 = { id: 1, dname: 'HH', captain: 'HH', addr: 'Seoul' };
