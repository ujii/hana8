import {
  createContext,
  use,
  type PropsWithChildren,
  useState,
  useReducer,
} from 'react';

type ContextValue = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
  multiCount: (n: number) => void;
};

// 1. Create context
const CounterContext = createContext<ContextValue>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
  multiCount: () => {},
});

type Action = {
  type: 'plus' | 'minus' | 'multi';
  payload: number;
};

const reducer = (preCount: number, { type, payload }: Action) => {
  switch (type) {
    case 'plus':
      return preCount + payload;
    case 'minus':
      return preCount - payload;
    case 'multi':
      return preCount * payload;
    default:
      return preCount;
  }
};

// 2. Provider
export function CounterProvider({ children }: PropsWithChildren) {
  const [count, dispatch] = useReducer(
    (preCount, action) => preCount + action,
    0
  );
  //   const [count, setCount] = useState(0);
  //   const plusCount = () => setCount((prevCount) => prevCount + 1);
  //   const minusCount = () => setCount((prevCount) => prevCount - 1);
  const plusCount = () => dispatch({ type: 'plus', payload: 1 });
  const minusCount = () => dispatch({ type: 'minus', payload: -1 });
  const multiCount = (n: number) => dispatch({ type: 'multi', payload: n });

  return (
    <CounterContext.Provider
      value={{ count, plusCount, minusCount, multiCount }}
    >
      {children}
    </CounterContext.Provider>
  );
}

// 3. useCounter
// eslint-disable-next-line react-refresh/only-export-components
export const useCounter = () => use(CounterContext);
// const useCounter = () => useContext(CounterContext);
