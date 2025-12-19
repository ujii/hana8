import { useRef } from 'react';
import Hello from './components/Hello';
import My from './components/My';
import { SessionProvider } from './hooks/SessionContext';
import type { ProfileHandler } from './components/Profile';
import Nav from './Nav';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'lucide-react';
import Posts from './components/Posts';
import Profile from './components/Profile';
import NotFound from './NotFound';
import ItemRoute from './components/ItemRoute';
import Items from './components/Items';

function App() {
  const profileHandlerRef = useRef<ProfileHandler>(null);

  return (
    <SessionProvider>
      <Nav />

      <div className='grid place-items-center h-screen mx-2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my' element={<My />} />
          <Route
            path='/profile'
            element={<Profile ref={profileHandlerRef} />}
          />
          <Route path='/items' element={<Items />} />
          <Route path='/items/:id' element={<ItemRoute />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/hello' element={<Hello />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

      <a
        href='#!'
        onClick={(e) => {
          e.preventDefault();
          profileHandlerRef.current?.showLoginUser();
          console.log('xxx>>', profileHandlerRef.current?.xxx);
        }}
      >
        Show LoginUser
      </a>
    </SessionProvider>
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

/*
  return (
    <div className='grid place-items-center h-screen mx-2'>
      <h1 className={cn('text-3xl mt-3 m-5')}>count: {count}</h1>
      <SessionProvider>
        <My />
        {count < 5 && <Hello>반갑습니다</Hello>}
      </SessionProvider>
    </div>
  );
*/
