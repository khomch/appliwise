'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../hooks/hooks';
import { registerUser } from '@/services/user.service';
import { Input } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import Link from 'next/link';
import { fetchUserDetails } from '../../store/slices/userSlice';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const isFormValid =
    firstName && lastName && email && password && password === repeatPassword;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await registerUser({
      email,
      firstName,
      lastName,
      password,
    });
    if (response.token) {
      dispatch(fetchUserDetails());
      router.push('/dashboard');
    }
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="mt-12 font-regular text-xl">Register</h1>
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
          inputName="First name"
          value={firstName}
          type="text"
          placeholder="Enter your first name"
          setValue={setFirstName}
        />
        <Input
          inputName="Last name"
          value={lastName}
          type="text"
          placeholder="Enter your last name"
          setValue={setLastName}
        />
        <Input
          inputName="Password"
          value={password}
          type="password"
          placeholder="Enter your password"
          setValue={setPassword}
        />
        <Input
          inputName="Repeat password"
          value={repeatPassword}
          type="password"
          placeholder="Repeat your password"
          setValue={setRepeatPassword}
        />
        <Button
          variant="primary"
          type="submit"
          size="xl"
          value={'Register'}
          disabled={!isFormValid}
        />
        <div className="text-center text-xs text-apptprimary">
          Already have and account?&nbsp;
          <Link href="/login">
            <span className="text-appprimary">Login</span>
          </Link>
        </div>
      </form>
    </section>
  );
}
