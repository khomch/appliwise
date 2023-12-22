'use client';
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchUserDetails } from '@/store/slices/userSlice';
import { Button } from '../ui/button/button';

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDetails()).then(() => setIsUserLoading(false));
  }, [dispatch]);

  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/statistics', label: 'Statistics' },
  ];

  return (
    <header className="shadow mb-2 min-h-[80px] bg-white border-b border-appborder items-center">
      <div className="relative flex max-w-[1320px] flex-col overflow-hidden px-4 md:mx-auto md:flex-row md:items-center">
        <h2 className="flex h-[80px] text-apptprimary text-xl font-medium items-center">
          <Link href={'/'}>Appliwise</Link>
        </h2>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-7 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        {
          <nav
            aria-label="Header Navigation"
            className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul className="flex flex-col items-center mb-10 md:mb-0 space-y-2 md:ml-auto md:flex-row md:space-y-0 bg-white">
              {user &&
                user.id &&
                links.map(({ path, label }) => (
                  <Link key={path} href={path}>
                    <li
                      className={`text-m ${
                        pathname === path
                          ? 'py-2 border-b-2 border-appprimary text-appprimary md:mr-12 mb-2 md:mb-0'
                          : 'py-2 border-b-2 border-transparent md:mr-12 text-apptprimary hover:border-b-2 hover:border-appborder mb-2 md:mb-0'
                      }`}
                    >
                      {label}
                    </li>
                  </Link>
                ))}
              <li className="text-gray-600 hover:text-blue-600 w-20">
                {user && user.id ? (
                  <Link href="/profile">
                    <Button
                      variant="primary"
                      style={'border'}
                      value={'Profile'}
                      type="button"
                      size="s"
                    />
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button
                      variant="primary"
                      style={'border'}
                      value={'Login'}
                      type="button"
                      size="s"
                    />
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        }
      </div>
    </header>
  );
};

export default Navbar;
