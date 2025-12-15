import {
  useRef,
  type FormEvent,
  useEffect,
  useImperativeHandle,
  type RefObject,
} from 'react';
import Button from './ui/Button';
import type { LoginFunction } from '../App';
import LabelInput from './ui/LabelInput';

export type LoginHandler = {
  validate: () => void;
  focusName: () => void;
};

type Props = {
  login: LoginFunction;
  ref: RefObject<LoginHandler | null>;
};

export default function Login({ login, ref }: Props) {
  // const [name, setName] = useState('');
  // const [age, setAge] = useState(0);

  // DOM을 참조할 경우 초기값은 무조건 null
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    validate() {
      if (!nameRef.current?.value) {
        alert('Input the name!');
        nameRef.current?.focus();
        return false;
      }

      if (!ageRef.current?.value) {
        alert('Input the age!');
        ageRef.current?.focus();
        return false;
      }

      return true;
    },

    focusName() {
      nameRef.current?.focus();
    },
  }));

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (nameRef.current?.value && ageRef.current?.value
    login(nameRef.current?.value ?? '', Number(ageRef.current?.value));
  };

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus();
  }, []);

  return (
    <div className='border border-red-300 p-3 rounded-lg'>
      <h1 className='text-2xl text-center font-medium'>Login</h1>
      <form onSubmit={makeLogin} className='space-y-3'>
        <LabelInput label='Name' ref={nameRef} />
        <LabelInput
          type='number'
          ref={ageRef}
          // onChange={(e) => setAge(+e.target.value)}
          placeholder='Age...'
        />

        {/* <LabelInput
          type='number'
          label='Age'
          onChange={(e) => setAge(+e.target.value)}
          placeholder='user age...'
        /> */}

        {/* <div>
          <label htmlFor='age' className='test-sm text-gray-600'>
            Age
          </label>
          <input
            type='number'
            id='age'
            ref={ageRef}
            // onChange={(e) => setAge(+e.target.value)}
            placeholder='user age...'
            className='w-full'
            required
          ></input>
        </div> */}

        {/* <div>
          <label htmlFor='name' className='test-sm text-gray-600'>
            Name
          </label>
          <input
            type='text'
            id='name'
            onChange={(e) => setName(e.target.value)}
            placeholder='user name...'
            className='w-full'
            required
          ></input>
        </div> */}
        {/* <div>
          <label htmlFor='age' className='test-sm text-gray-600'>
            Age
          </label>
          <input
            type='number'
            id='age'
            onChange={(e) => setAge(+e.target.value)}
            placeholder='user age...'
            className='w-full'
            required
          ></input>
        </div> */}

        <div className='text-center'>
          <button type='reset'>Cancel</button>
          <Button
            // type='submit'
            // onClick={() => login(name, age)}
            className='bg-blue-500 text-white hover:bg-blue-600'
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
