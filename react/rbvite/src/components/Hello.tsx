import type { PropsWithChildren } from 'react';
import Button from './ui/Button';
import { useCounter } from '../hooks/CounterContext';
import { useSession } from '../hooks/SessionContext';

// type Prop = {
//   name: string;
//   children: ReactNode;
// };

// T & {children: ReactNode;}
export default function Hello({ children }: PropsWithChildren) {
  const {
    session: { loginUser },
  } = useSession();
  const { name = 'Guest', age } = loginUser || {};

  const { plusCount } = useCounter();

  return (
    <div className='border border-red-300 p-3 text-center'>
      <h2 className='text-2xl'>
        Hello, {name}
        {age && <small className='text-sm'>({age})</small>}
      </h2>
      <div>{children}</div>
      <Button className='font-bold' onClick={plusCount}>
        count + 1
      </Button>
    </div>
  );
}

// import X from './Hello'; -> default 사용 (대부분 이 방식)
// import {X} from ;'./Hello'; -> default 사용 x
