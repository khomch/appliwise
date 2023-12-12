import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ReduxProvider from './ReduxProvider';
import './globals.css';
import Navbar from '../components/navbar/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appliwise',
  description: 'Job application tracker',
};

export default function RootLayout(props: {
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
