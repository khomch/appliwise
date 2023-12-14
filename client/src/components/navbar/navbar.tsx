'use client';
import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchUserDetails } from '@/store/slices/userSlice';

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
    <>
      <div className="w-full h-20 bg-white border-b border-appborder">
        <div className="flex h-full justify-center w-full">
          <div className="w-full max-w-[1320px] flex items-center justify-between h-full mx-4">
            <div className="flex items-center">
              <h2 className="text-apptprimary text-xl font-medium">
                <Link href={'/'}>Appliwise</Link>
              </h2>
              {!isUserLoading && user && user.id && (
                <ul className="list-none mx-16 flex gap-4">
                  {links.map(({ path, label }) => (
                    <Link key={path} href={path}>
                      <div
                        className={`text-m ${
                          pathname === path
                            ? 'py-2 border-b-2 border-appprimary text-appprimary'
                            : 'py-2 border-b-2 border-transparent text-apptprimary hover:border-b-2 hover:border-appborder'
                        }`}
                      >
                        {label}
                      </div>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
            {!isUserLoading && (
              <>
                {user && user.id ? (
                  <div className="flex gap-2 py-2 border-b-2 border-transparent">
                    <Link href={'/profile'}>Profile</Link>
                  </div>
                ) : (
                  <div className="flex gap-2 py-2 border-b-2 border-transparent">
                    <Link href={'/login'}>Login</Link>
                    <Link href={'/register'}>Register</Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
