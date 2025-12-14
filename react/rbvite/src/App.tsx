import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';

type Item = {
  id: number;
  name: string;
  price: number;
  isSoldOut?: boolean;
};

export type LoginUser = { id: number; name: string; age: number };

export type Session = {
  loginUser: LoginUser | null;
  cart: Item[];
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

    // 사용 권장
    // setSession({
    //   ...session,
    //   cart: [...session.cart.filter((item) => item.id !== id)],
    // });

    // 좋은 코드 x
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== id),
    });
  };

  const addItem = (name: string, price: number) => {
    const newItem = {
      id: Math.max(...session.cart.map((item) => item.id), 0) + 1,
      name,
      price,
    };
    setSession({ ...session, cart: [...session.cart, newItem] });
  };

  // if ( x === undefined ) x가 정의되지 않았을 때에만 초기화
  //    x = 0;
  // function setAction(y) {
  //    this.x = typeof y === 'func' ? y(x) : y;
  //    render();
  // }
  // return [x, setAction];

  return (
    <div className='grid place-items-center h-screen'>
      <h1 className='text-3xl'>count: {count}</h1>
      <My
        session={session}
        logout={logout}
        login={login}
        removeItem={removeItem}
        addItem={addItem}
      />

      <div className='card'>
        <Hello
          name={session.loginUser?.name}
          age={session.loginUser?.age}
          plusCount={plusCount}
        >
          반갑습니다
        </Hello>
      </div>
    </div>
  );
}

export default App;
