import type { PropsWithChildren } from 'react';
import Button from './ui/Button';

// type Prop = {
//   name: string;
//   children: ReactNode;
// };
type Prop = PropsWithChildren<{
  name?: string;
  age?: number;
  plusCount: () => void;
}>;

// T & {children: ReactNode;}
export default function Hello({
  name = 'guest',
  age,
  children,
  plusCount,
}: Prop) {
  return (
    <div className='border border-red-300 p-3 text-center'>
      <h2 className='text-2xl'>
        Hello, {name || 'guest'}{' '}
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
