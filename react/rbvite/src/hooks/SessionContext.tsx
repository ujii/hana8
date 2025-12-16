import {
  use,
  type PropsWithChildren,
  type RefObject,
  useState,
  createContext,
  useRef,
  useReducer,
} from 'react';
import type { LoginHandler } from '../components/Login';

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
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
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
  session: DefaultSession,
  login: () => {},
  logout: () => {},
  loginHandlerRef: null,
  removeItem: () => {},
  saveItem: () => {},
});

type Action =
  | { type: 'login'; payload: LoginUser }
  | { type: 'logout'; payload: null }
  | { type: 'removeItem'; payload: number }
  | { type: 'saveItem'; payload: ItemType };

const reducer = (session: Session, action: Action) => {
  switch (action.type) {
    case 'login':
      return { ...session, loginUser: action.payload };
    case 'logout':
      return { ...session, loginUser: null };
    case 'removeItem':
      return {
        ...session,
        cart: session.cart.filter((item) => item.id !== action.payload),
      };
    case 'saveItem':
      const item =
        action.payload.id &&
        session.cart.find((item) => item.id === action.payload.id);

      if (!item) {
        const newItem = {
          id: Math.max(...session.cart.map((item) => item.id), 0) + 1,
          name: action.payload.name,
          price: action.payload.price,
        };
        return { ...session, cart: [...session.cart, newItem] };
      } else {
        return {
          ...session,
          cart: session.cart.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  name: action.payload.name,
                  price: action.payload.price,
                }
              : item
          ),
        };
      }
    default:
      return session;
  }
};

export function SessionProvider({ children }: PropsWithChildren) {
  //   const [session, setSession] = useState<Session>(DefaultSession);
  const [session, dispatch] = useReducer(reducer, {} as Session);

  const loginHandlerRef = useRef<LoginHandler | null>(null);

  //   const logout = () => {
  //     // session.loginUser = null;
  //     setSession({ ...session, loginUser: null });
  //   };
  const logout = () => dispatch({ type: 'logout', payload: null });

  //   const login: LoginFunction = (name, age) => {
  //     // if (!name || !age) return alert('Input Name and Age');
  //     if (loginHandlerRef.current?.validate())
  //       setSession({ ...session, loginUser: { id: 1, name, age } });
  //   };
  const login = (name: string, age: number) =>
    dispatch({ type: 'login', payload: { id: 1, name, age } });

  //   const removeItem = (id: number) => {
  //     if (!confirm('Are you sure?')) return;

  //     // 새 배열 두번 반환. 좋은 코드 x
  //     // setSession({
  //     //   ...session,
  //     //   cart: [...session.cart.filter((ItemTypes) => ItemTypes.id !== id)],
  //     // });

  //     // 좋은 코드
  //     setSession({
  //       ...session,
  //       cart: session.cart.filter((item) => item.id !== id),
  //     });
  //   };
  const removeItem = (id: number) =>
    dispatch({ type: 'removeItem', payload: id });

  //   const saveItem = ({ id, name, price }: ItemType) => {
  //     // item이 카트에 존재해야지만 수정 가능
  //     // if(id) {} 코드는 보안 문제로 권장 x
  //     const item = id && session.cart.find((item) => item.id === id);
  //     if (item) {
  //       // item.name = name;
  //       // item.price = price;
  //       setSession({
  //         ...session,
  //         cart: session.cart.map((item) =>
  //           item.id === id ? { id, name, price } : item
  //         ),
  //       });
  //     } else {
  //       const newItem = {
  //         id: Math.max(...session.cart.map((ItemTypes) => ItemTypes.id), 0) + 1,
  //         name,
  //         price,
  //       };
  //       // session.cart.push(newItem);
  //       setSession({ ...session, cart: [...session.cart, newItem] });
  //     }
  //     // setSession({ ...session, cart: [...session.cart] });

  //     // 결과는 아래 코드와 같지만 cart가 re rendering 되는 것이 아니고 session에 의해 렌더링됨. 잘못된 코드.
  //     // session.cart.push(newItem);
  //     // setSession([...session]);
  //     // setSession({ ...session, cart: [...session.cart, newItem] });
  //   };
  const saveItem = ({ id, name, price }: ItemType) =>
    dispatch({ type: 'saveItem', payload: { id, name, price } });

  return (
    <SessionContext.Provider
      value={{ session, login, logout, loginHandlerRef, removeItem, saveItem }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => use(SessionContext);
