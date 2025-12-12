import { useState } from 'react';
import Button from './ui/Button';
import type { LoginFunction } from '../App';

type Props = {
  login: LoginFunction;
};

export default function Login({ login }: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div className='border border-red-300 p-3 rounded-lg'>
      <h1 className='text-2xl text-center font-medium'>Login</h1>
      <form className='space-y-3'>
        <div>
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
        </div>
        <div>
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
        </div>
        <div className='text-center'>
          <Button
            onClick={() => login(name, age)}
            className='bg-blue-500 text-white hover:bg-blue-600 w-full'
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
