import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '../components/navbar/navbar';
import ReduxProvider from './ReduxProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appliwise',
  description: 'Job application tracker',
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  jobinfo: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col center bg-appbg">
        <ReduxProvider>
          <Navbar />
          <main>{props.children}</main>
          {props.jobinfo}
        </ReduxProvider>
      </body>
    </html>
  );
}
