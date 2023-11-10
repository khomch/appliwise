'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
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
              <ul className="list-none mx-16 flex gap-2">
                {links.map(({ path, label }) => (
                  <Link key={path} href={path}>
                    <div
                      className={`text-m ${
                        pathname === path
                          ? 'py-2 border-b-2 border-appprimary text-appprimary'
                          : 'py-2 hover:border-b-2'
                      }`}
                    >
                      {label}
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <Link href={'/'}>Login</Link>
              <Link href={'/'}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
