import { useState } from 'react';
import type { LoginUser } from '../App';
import Button from './ui/Button';

export default function Login() {
  return (
    <>
      <div className='flex gap-4'>
        <div>
          <small>Name </small>
          <form className='border border-gray-300 rounded px-2 py-1'>
            <input type='text'></input>
          </form>
        </div>
        <div>
          <small> age </small>
          <form className='border border-gray-300 rounded px-2 py-1'>
            <input type='password'></input>
          </form>
        </div>
      </div>
      <Button className='bg-gray-100 flex-auto'>Sign In</Button>
    </>
  );
}
