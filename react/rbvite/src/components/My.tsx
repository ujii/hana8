import {
  useSession,
  type ItemType,
  type LoginFunction,
  type Session,
} from '../hooks/SessionContext';
import Login, { type LoginHandler } from './Login';
import Profile, { type ProfileHandler } from './Profile';
import Item from './Item';
import Button from './ui/Button';
import { PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState, type RefObject, useReducer } from 'react';

export default function My() {
  const { session } = useSession();
  // const [isAdding, setAdding] = useState(false);
  // const toggleAdding = () => () => setAdding((pre) => !pre);
  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false);

  const profileHandlerRef = useRef<ProfileHandler>(null);

  const item101 = session.cart.find((item) => item.id === 101);
  useEffect(() => {
    // console.log('🚀 ~ item101:', item101);
  }, [item101]);

  return (
    <>
      {session?.loginUser ? <Profile ref={profileHandlerRef} /> : <Login />}
      <hr />
      <a
        href='#!'
        onClick={(e) => {
          e.preventDefault();
          profileHandlerRef.current?.showLoginUser();
          console.log('xxx>>', profileHandlerRef.current?.xxx);
        }}
      >
        {item101?.name}
      </a>
      <ul>
        {session.cart.map((item) => (
          <li key={item.id}>
            <Item item={item} />
          </li>
        ))}
        <li className='text-center'>
          {isAdding ? (
            <Item
              item={{ id: 0, name: 'New Item', price: 3000 }}
              toggleAdding={toggleAdding}
            />
          ) : (
            <Button onClick={toggleAdding} className=''>
              <PlusIcon />
            </Button>
          )}
        </li>
      </ul>
    </>
  );
}

// const [newId, setId] = useState(0);
// const [newName, setName] = useState('');
// const [newPrice, setPrice] = useState(0);

// const modifyInfo = (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   modifyItem(newId, newName, newPrice);
//   setId(0);
// };

// {
//   newId === id ? (
//     <form onSubmit={modifyInfo} className='flex gap-1'>
//       <LabelInput
//         placeholder={`${name}`}
//         onChange={(e) => setName(e.target.value)}
//       ></LabelInput>
//       <LabelInput
//         type='number'
//         placeholder={`${price}`}
//         onChange={(e) => setPrice(+e.target.value)}
//       ></LabelInput>
//       <Button
//         type='submit'
//         className='text-blue-600 flex items-center justify-center'
//       >
//         <CheckIcon></CheckIcon>
//       </Button>
//     </form>
//   ) : (
//     <>
//       <Small>{id}.</Small> {name}
//       <Small>{price.toLocaleString()}원</Small>
//       <Button
//         onClick={() => removeItem(id)}
//         className='ml-2 px-1 py-0 text-sm bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-2xl
//             active:scale-150 transition duration-300'
//       >
//         x
//       </Button>
//       <Button
//         onClick={() => {
//           {
//             setId(id);
//           }
//         }}
//         className='border-transparent flex items-center justify-center px-0 py-0 w-5 h-5'
//       >
//         <PencilIcon></PencilIcon>
//       </Button>
//     </>
//   );
// }
