import {
  use,
  type PropsWithChildren,
  type RefObject,
  useState,
  createContext,
  useRef,
  useReducer,
  useEffect,
} from 'react';
import type { LoginHandler } from '../components/Login';
import { useFetch } from './useFetch';

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
export const DefaultSession: Session = {
  // loginUser: null, // 로그아웃 테스트
  loginUser: { id: 1, name: 'Hong', age: 33 },
  cart: [
    { id: 100, name: '라면112', price: 3000 },
    { id: 101, name: '컵라면1223', price: 2000 },
    { id: 200, name: '파234', price: 5000 },
  ],
};

const SKEY = 'CART_0.1';
const SKEY_EXP = 'CART_EXP';
// const SKEY_EXP_TIME = 86400 * 1000; 하루동안 유지
const SKEY_EXP_TIME = 30 * 1000;
const setStorage = (cart: ItemType[]) => {
  localStorage.setItem('SKEY', JSON.stringify(cart));
  localStorage.setItem('SKEY_EXP', String(Date.now() + SKEY_EXP_TIME));
};
const getStorage = () => {
  const expireAt = Number(localStorage.getItem(SKEY_EXP));
  if (isNaN(expireAt) || expireAt < Date.now()) {
    localStorage.clear();
    return [];
  }
  return JSON.parse(localStorage.getItem(SKEY) || '[]') as ItemType[];
};

type SessionContextValue = {
  session: Session;
  login: LoginFunction;
  logout: () => void;
  loginHandlerRef: RefObject<LoginHandler | null> | null;
  removeItem: (id: number) => void;
  saveItem: (item: ItemType) => void;
};

const SessionContext = createContext<SessionContextValue>({
  session: { loginUser: null, cart: [] },
  login: () => {},
  logout: () => {},
  loginHandlerRef: null,
  removeItem: () => {},
  saveItem: () => {},
});

type Action =
  | { type: 'INITIALIZE'; payload: ItemType[] }
  | { type: 'LOGIN'; payload: LoginUser }
  | { type: 'LOGOUT'; payload: null }
  | { type: 'ADD-ITEM'; payload: ItemType }
  | { type: 'EDIT-ITEM'; payload: ItemType }
  | { type: 'REMOVE-ITEM'; payload: number };

const reducer = (session: Session, { type, payload }: Action) => {
  let cart = [];

  switch (type) {
    case 'LOGIN':
    case 'LOGOUT':
      return { ...session, loginUser: payload };
    case 'ADD-ITEM':
      // return { ...session, cart: [...session.cart, payload] };
      cart = [...session.cart, payload];
      break;
    case 'EDIT-ITEM':
      // return {
      //   ...session,
      //   cart: session.cart.map((item) =>
      //     item.id === payload.id ? payload : item
      //   ),
      // };
      cart = session.cart.map((item) =>
        item.id === payload.id ? payload : item
      );
      break;
    case 'REMOVE-ITEM':
      // return {
      //   ...session,
      //   cart: session.cart.filter((item) => item.id !== payload),
      // };
      cart = session.cart.filter((item) => item.id !== payload);
      break;
    case 'INITIALIZE':
      cart = payload;
      break;
    default:
      return session;
  }

  setStorage(cart);
  return { ...session, cart };
};

export function SessionProvider({ children }: PropsWithChildren) {
  //   const [session, setSession] = useState<Session>(DefaultSession);
  const [session, dispatch] = useReducer(reducer, {
    loginUser: { id: 1, name: 'Hong', age: 33 },
    cart: getStorage(),
  }); // reducer가 리턴하는 타입이 곧 session 타입. 따라서 타입 일치해야함

  const { data: sampleData } = useFetch<ItemType[]>('/data/sample.json');
  useEffect(() => {
    if (sampleData && !session.cart.length) {
      dispatch({ type: 'INITIALIZE', payload: sampleData });
    }
  }, [sampleData]);

  const loginHandlerRef = useRef<LoginHandler | null>(null);

  const logout = () => {
    // session.loginUser = null;
    // setSession({ ...session, loginUser: null });
    dispatch({ type: 'LOGOUT', payload: null });
  };

  const login: LoginFunction = (name, age) => {
    // if (!name || !age) return alert('Input Name and Age');
    if (loginHandlerRef.current?.validate())
      // setSession({ ...session, loginUser: { id: 1, name, age } });
      dispatch({ type: 'LOGIN', payload: { id: 1, name, age } });
  };

  const removeItem = (id: number) => {
    if (!confirm('Are you sure?')) return;

    // 새 배열 두번 반환. 좋은 코드 x
    // setSession({
    //   ...session,
    //   cart: [...session.cart.filter((ItemTypes) => ItemTypes.id !== id)],
    // });

    // 좋은 코드
    // setSession({
    //   ...session,
    //   cart: session.cart.filter((item) => item.id !== id),
    // });

    dispatch({ type: 'REMOVE-ITEM', payload: id });
  };

  const saveItem = ({ id, name, price }: ItemType) => {
    // item이 카트에 존재해야지만 수정 가능
    // if(id) {} 코드는 보안 문제로 권장 x
    const item = id && session.cart.find((item) => item.id === id);
    if (item) {
      // item.name = name;
      // item.price = price;
      // setSession({
      //   ...session,
      //   cart: session.cart.map((item) =>
      //     item.id === id ? { id, name, price } : item
      //   ),
      // });
      dispatch({ type: 'EDIT-ITEM', payload: { id, name, price } });
    } else {
      const newItem = {
        id: Math.max(...session.cart.map((ItemTypes) => ItemTypes.id), 0) + 1,
        name,
        price,
      };
      // session.cart.push(newItem);
      // setSession({ ...session, cart: [...session.cart, newItem] });
      dispatch({ type: 'ADD-ITEM', payload: newItem });
    }
    // setSession({ ...session, cart: [...session.cart] });

    // 결과는 아래 코드와 같지만 cart가 re rendering 되는 것이 아니고 session에 의해 렌더링됨. 잘못된 코드.
    // session.cart.push(newItem);
    // setSession([...session]);
    // setSession({ ...session, cart: [...session.cart, newItem] });
  };

  return (
    <SessionContext.Provider
      value={{ session, login, logout, loginHandlerRef, removeItem, saveItem }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => use(SessionContext);
