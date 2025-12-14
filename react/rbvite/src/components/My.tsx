import { useRef, type FormEvent, type RefObject, useState } from 'react';
import type { LoginFunction, Session } from '../App';
import Login from './Login';
import Profile from './Profile';
import Small from './ui/Small';
import Button from './ui/Button';
import LabelInput from './ui/LabelInput';
import { CheckIcon, FilePlus2Icon, PencilIcon } from 'lucide-react';

type Prop = {
  session: Session;
  logout: () => void;
  login: LoginFunction;
  removeItem: (id: number) => void;
  addItem: (name: string, price: number) => void;
  modifyItem: (id: number, name: string, price: number) => void;
};

export default function My({
  session,
  logout,
  login,
  removeItem,
  addItem,
  modifyItem,
}: Prop) {
  // const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [newId, setId] = useState(0);
  const [newName, setName] = useState('');
  const [newPrice, setPrice] = useState(0);

  const editItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const price = priceRef.current?.value;

    let msg;
    let ref: RefObject<HTMLInputElement | null> | null = null;

    if (!name) {
      // alert('Input the item name!')
      // nameRef.current?.focus();
      msg = 'Input the item name!';
      ref = nameRef;
    }
    if (!price) {
      // alert('Input the item price!')
      // nameRef.current?.focus();
      msg = 'Input the item price!';
      ref = priceRef;
    }

    if (msg) {
      alert(msg);
      if (ref && ref.current) ref.current.focus();
    }

    addItem(name ?? '', Number(price));
    if (nameRef.current && priceRef.current) {
      nameRef.current.value = '';
      priceRef.current.value = '';
      nameRef.current.focus();
    }
  };

  const modifyInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    modifyItem(newId, newName, newPrice);
    console.log(newId, newName, newPrice);
    setId(0);
  };

  return (
    <>
      {session?.loginUser ? (
        <Profile loginUser={session.loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <hr />
      <ul>
        {session.cart.map(({ id, name, price }) => (
          <li key={id} className='flex items-center gap-1'>
            {newId === id ? (
              <form onSubmit={modifyInfo} className='flex gap-1'>
                <LabelInput
                  placeholder={`${name}`}
                  onChange={(e) => setName(e.target.value)}
                ></LabelInput>
                <LabelInput
                  type='number'
                  placeholder={`${price}`}
                  onChange={(e) => setPrice(+e.target.value)}
                ></LabelInput>
                <Button
                  type='submit'
                  className='text-blue-600 flex items-center justify-center'
                >
                  <CheckIcon></CheckIcon>
                </Button>
              </form>
            ) : (
              <>
                <Small>{id}.</Small> {name}
                <Small>{price.toLocaleString()}원</Small>
                <Button
                  onClick={() => removeItem(id)}
                  className='ml-2 px-1 py-0 text-sm bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-2xl 
            active:scale-150 transition duration-300'
                >
                  x
                </Button>
                <Button
                  onClick={() => {
                    {
                      setId(id);
                      setName(name);
                      setPrice(price);
                    }
                  }}
                  className='border-transparent flex items-center justify-center px-0 py-0 w-5 h-5'
                >
                  <PencilIcon></PencilIcon>
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={editItem} className='flex gap-1'>
        {/* <input type='number' ref={idRef} placeholder='id...' className='w-14'> */}
        <LabelInput ref={nameRef} placeholder='name...' />
        <LabelInput type='number' ref={priceRef} placeholder='price...' />
        <Button type='submit' className='text-blue-500'>
          {/* <Saveicon /> */}
          <FilePlus2Icon></FilePlus2Icon>
        </Button>
      </form>
    </>
  );
}
