import type { ItemType, LoginFunction, Session } from '../App';
import Login from './Login';
import Profile, { type ProfileHandler } from './Profile';
import Item from './Item';
import Button from './ui/Button';
import { PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Prop = {
  session: Session;
  logout: () => void;
  login: LoginFunction;
  removeItem: (id: number) => void;
  saveItem: ({ id, name, price }: ItemType) => void;
  // modifyItem: (id: number, name: string, price: number) => void;
};

export default function My({
  session,
  logout,
  login,
  removeItem,
  saveItem,
  //modifyItem,
}: Prop) {
  // const idRef = useRef<HTMLInputElement>(null);

  const [isAdding, setAdding] = useState(false);
  const profileHandlerRef = useRef<ProfileHandler>(null);

  const item101 = session.cart.find((item) => item.id === 101);
  useEffect(() => {
    console.log('🚀 ~ item101:', item101);
  }, [item101]);

  return (
    <>
      {session?.loginUser ? (
        <Profile
          loginUser={session.loginUser}
          logout={logout}
          ref={profileHandlerRef}
        />
      ) : (
        <Login login={login} />
      )}
      <hr />
      {item101?.name}
      <ul>
        {session.cart.map((item) => (
          <li key={item.id}>
            <Item item={item} removeItem={removeItem} saveItem={saveItem} />
          </li>
        ))}
        <li className='text-center'>
          {isAdding ? (
            <Item
              item={{ id: 0, name: 'New Item', price: 3000 }}
              removeItem={removeItem}
              saveItem={saveItem}
              toggleAdding={() => setAdding(false)}
            />
          ) : (
            <Button onClick={() => setAdding(true)} className=''>
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
