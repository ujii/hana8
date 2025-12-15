import { useRef, useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';
import { useCounter } from './hooks/CounterContext';
import type { LoginHandler } from './components/Login';
import { SessionProvider } from './hooks/SessionContext';

function App() {
  // const [count, setCount] = useState(0);
  const { count } = useCounter();

  return (
    <div className='grid place-items-center h-screen mx-1'>
      <h1 className='text-3xl'>count: {count}</h1>
      <SessionProvider>
        <My />
        <Hello>반갑습니다</Hello>
      </SessionProvider>
    </div>
  );
}

export default App;

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
