import { useSession, type ItemType } from '../hooks/SessionContext';
import { useEffect, useState, useMemo, useActionState } from 'react';
import { useInterval } from '../hooks/useTimer';
import LabelInput from './ui/LabelInput';
import Spinner from './ui/Spinner';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function My() {
  const { session } = useSession();

  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);

  useEffect(() => {
    setInterval(() => setBadSec((p) => p + 1), 1000);
  }, []);

  const ff = () => {
    setGoodSec((p) => p + 1);
  };
  const { reset, clear } = useInterval(ff, 1000);

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  const [results, search, isPending] = useActionState(
    async (preResults: ItemType[], formData: FormData) => {
      const str = formData.get('ActionState') as string;
      console.log('******', preResults, str);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return session.cart.filter((item) => item.name.includes(str));
    },
    []
  );

  return (
    <>
      <h1 className='text-xl'>
        bad: {badSec}, good: {goodSec}
      </h1>
      <div className='flex space-x-3'>
        <Button
          variant={'outline'}
          onClick={() => {
            setGoodSec(0);
            reset();
          }}
        >
          reset
        </Button>
        <Button variant={'secondary'} onClick={clear}>
          stop
        </Button>
      </div>
      <hr />

      <h2 className='text-xl'>Tot: {totalPrice.toLocaleString()}원</h2>

      {isPending ? (
        <Spinner />
      ) : (
        <div>SR_ActionState :{results.map((item) => item.name).join()}</div>
      )}

      {/* <form action={search}> */}
      <form className='flex gap-2 items-end'>
        <LabelInput label='ActionState' autoComplete='off' />
        <Button formAction={search}>Action</Button>
        <SearchButton />
      </form>
    </>
  );
}

function SearchButton() {
  const { pending, data } = useFormStatus();
  if (data) console.log('ddddddd>>', data, pending);
  return (
    <Button variant={'secondary'} disabled={pending}>
      SearchButton
    </Button>
  );
}

/*
  const { session } = useSession();
  // const [isAdding, setAdding] = useState(false);
  // const toggleAdding = () => () => setAdding((pre) => !pre);
  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false);

  const profileHandlerRef = useRef<ProfileHandler>(null);

  const item101 = session.cart.find((item) => item.id === 101);
  // useEffect(() => {
  // console.log('🚀 ~ it/em101:', item101);
  // }, [item101]);

  const [badSec, setBadSec] = useState(0);
  const [goodSec, setGoodSec] = useState(0);

  useEffect(() => {
    setInterval(() => setBadSec((p) => p + 1), 1000);
  }, []);

  // useEffect(() => {
  //   const intl = setInterval(() => setGoodSec((p) => p + 1), 1000);
  //   return () => clearInterval(intl);
  // }, []);

  // const f = () => setGoodSec((p) => p + 1);
  const ff = (n: number) => {
    // console.log('🚀 ~ n:', n, goodSec); // n은 영원히 1 (: )
    // setGoodSec(n + 1); // 위 goodSec는 영원히 0
    setGoodSec((p) => p + 1);
  };

  // goodSec + 1 의 값이
  // console.log('🚀 ~ goodSec:', goodSec);
  const { reset, clear } = useInterval(ff, 1000, goodSec + 1);
  // useInterval(setGoodSec, 1000, goodSec + 1);
  // useInterval(() => setGoodSec((p) => p + 1), 1000);
  // useInterval(f, 1000);

  // const [data, setData] = useState<ItemType[]>([]);
  // useLayoutEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   fetch('/data/sample.json', { signal })
  //     .then((res) => res.json())
  //     .then(setData);

  //   return () => controller.abort();
  // }, []);

  const totalPrice = useMemo(
    () => session.cart.reduce((acc, item) => acc + item.price, 0),
    [session.cart]
  );

  const [searchStr, setSearchStr] = useState('');
  // const debouncedSearchStr = useDebounce(searchStr, 500);
  const debouncedSearchStr = useThrottle(searchStr, 500);

  const deferredStr = useDeferredValue(searchStr);

  const [searchResult, setSearchResult] = useState<ItemType[]>([]);
  const [isSearching, startSearchingTransition] = useTransition();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startSearchingTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const str = e.target.value;
      setSearchStr(str);
      setSearchResult(session.cart.filter((item) => item.name.includes(str)));
    });
  };

  const [results, search, isPending] = useActionState(
    async (preResults: ItemType[], formData: FormData) => {
      const str = formData.get('ActionState') as string;
      console.log('******', preResults, str);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return session.cart.filter((item) => item.name.includes(str));
    },
    []
  );

  return (
    <>
      <h1 className='text-xl'>
        bad: {badSec}, good: {goodSec}
      </h1>
      <div className='flex'>
        <button onClick={reset}>reset</button>
        <button onClick={clear}>clear</button>
      </div>
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
      <Posts />
      <h2 className='text-xl'>Tot: {totalPrice.toLocaleString()}원</h2>
      {isPending ? (
        <Spinner />
      ) : (
        <div>SR_ActionState :{results.map((item) => item.name).join()}</div>
      )}
      <div>SR_Transition: {searchResult.map((item) => item.name).join()}</div>
      {isSearching ? (
        <Spinner />
      ) : (
        <h2 className='text-x text-red-500'>
          {searchStr} : {deferredStr} :{debouncedSearchStr}
        </h2>
      )}
      <form className='flex gap-2 items-end'>
        <LabelInput label='ActionState' autoComplete='off' />
        <Button formAction={search}>Action</Button>
        <SearchButton />
      </form>
      <LabelInput
        label='Transition'
        onChange={handleSearch}
        autoComplete='off'
      />
      <ul>
        {session.cart
          ?.filter((item) => item.name.includes(debouncedSearchStr))
          .map((item) => (
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
            <Btn onClick={toggleAdding} className=''>
              <PlusIcon />
            </Btn>
          )}
        </li>
      </ul>
    </>
  );
*/
