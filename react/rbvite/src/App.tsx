import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';

export type ItemType = {
  id: number;
  name: string;
  price: number;
  isSoldOut?: boolean;
};

export type LoginUser = { id: number; name: string; age: number };

export type Session = {
  loginUser: LoginUser | null;
  cart: ItemType[];
};

export type LoginFunction = (name: string, age: number) => void;

const DefaultSession: Session = {
  // loginUser: null, // 로그아웃 테스트
  loginUser: { id: 1, name: 'Hong', age: 33 }, // 로그인 테스트
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session>(DefaultSession);

  const plusCount = () => setCount((prevCount) => prevCount + 1);

  const logout = () => {
    // session.loginUser = null;
    setSession({ ...session, loginUser: null });
  };

  const login: LoginFunction = (name, age) => {
    if (!name || !age) return alert('Input Name and Age');
    setSession({ ...session, loginUser: { id: 1, name, age } });
  };

  const removeItem = (id: number) => {
    if (!confirm('Are you sure?')) return;

    // 새 배열 두번 반환. 좋은 코드 x
    // setSession({
    //   ...session,
    //   cart: [...session.cart.filter((ItemTypes) => ItemTypes.id !== id)],
    // });

    // 좋은 코드
    setSession({
      ...session,
      cart: session.cart.filter((ItemTypes) => ItemTypes.id !== id),
    });
  };

  const saveItem = ({ id, name, price }: ItemType) => {
    // item이 카트에 존재해야지만 수정 가능
    // if(id) {} 코드는 보안 문제로 권장 x
    const item = id && session.cart.find((item) => item.id === id);
    if (item) {
      // item.name = name;
      // item.price = price;
      setSession({
        ...session,
        cart: session.cart.map((item) =>
          item.id === id ? { id, name, price } : item
        ),
      });
    } else {
      const newItem = {
        id: Math.max(...session.cart.map((ItemTypes) => ItemTypes.id), 0) + 1,
        name,
        price,
      };
      // session.cart.push(newItem);
      setSession({ ...session, cart: [...session.cart, newItem] });
    }
    // setSession({ ...session, cart: [...session.cart] });

    // 결과는 아래 코드와 같지만 cart가 re rendering 되는 것이 아니고 session에 의해 렌더링됨. 잘못된 코드.
    // session.cart.push(newItem);
    // setSession([...session]);
    // setSession({ ...session, cart: [...session.cart, newItem] });
  };

  // const modifyItem = (id: number, name: string, price: number) => {
  //   setSession({
  //     ...session,
  //     cart: session.cart.map((ItemType) =>
  //       ItemType.id === id ? { id, name, price } : ItemType
  //     ),
  //   });
  // };

  // if ( x === undefined ) x가 정의되지 않았을 때에만 초기화
  //    x = 0;
  // function setAction(y) {
  //    this.x = typeof y === 'func' ? y(x) : y;
  //    render();
  // }
  // return [x, setAction];

  return (
    <div className='grid place-items-center h-screen mx-1'>
      <h1 className='text-3xl'>count: {count}</h1>
      <My
        session={session}
        logout={logout}
        login={login}
        removeItem={removeItem}
        saveItem={saveItem}
        // modifyItem={modifyItem}
      />

      <Hello
        name={session.loginUser?.name}
        age={session.loginUser?.age}
        plusCount={plusCount}
      >
        반갑습니다
      </Hello>
    </div>
  );
}

export default App;
