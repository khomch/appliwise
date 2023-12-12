'use client';

import { loginUser } from '@/services/user.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '../../components/ui/button/button';
import { Input } from '../../components/ui/input/input';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchUserDetails } from '../../store/slices/userSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isFormValid = email && password && password;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await loginUser({ email, password });
    if (response.token) {
      dispatch(fetchUserDetails());
      router.push('/dashboard');
    }
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="mt-12 font-regular text-xl">Login</h1>
      <form
        className="flex flex-col w-full max-w-sm mt-4 gap-4 p-4 border border-appborder shadow-sm rounded-lg my-1  bg-white"
        onSubmit={handleSubmit}
      >
        <Input
          inputName="Email"
          value={email}
          type="email"
          placeholder="Enter your email"
          setValue={setEmail}
        />
        <Input
          inputName="Password"
          value={password}
          type="password"
          placeholder="Enter your password"
          setValue={setPassword}
        />
        <Button
          variant="primary"
          type="submit"
          size="xl"
          value={'Login'}
          disabled={!isFormValid}
        />
        <div className="text-center text-xs text-apptprimary">
          Don&apos;t have an account?&nbsp;
          <Link href="/register">
            <span className="text-appprimary">Register</span>
          </Link>
        </div>
      </form>
    </section>
  );
}
