import Image from 'next/image';
import Interface from '../../public/interface.jpg';
import { Button } from '@/components/ui/button/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex flex-col w-full justify-center items-center align-middle">
      <svg
        className="absolute -z-10 -top-10 opacity-30"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="scale(2) rotate(0)"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="hsla(0,0%,100%,1)"
            />
            <path
              d="M3.25 10h13.5M10 3.25v13.5"
              strokeLinecap="square"
              strokeWidth="0.5"
              stroke="hsla(225, 8%, 90%, 1)"
              fill="none"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#a)"
        />
      </svg>
      <section
        className="flex flex-col-reverse justify-center px-2 md:px-4 md:flex-row md:justify-between max-w-[1320px] self-center items-center w-full md:mt-20
        pattern-wavy pattern-blue-100 pattern-bg-white 
        pattern-size-16 pattern-opacity-100
        
      "
      >
        <div className="flex flex-col items-start w-full">
          <h1
            className="font-bold text-4xl mr-2 lg:text-6xl xl:text-7xl tracking-narrow
        bg-gradient-to-r from-apptprimary via-slate-700 to-slate-500 inline-block text-transparent bg-clip-text py-9
        "
          >
            Robust <br />
            Job Application <br />
            Tracking Solution
          </h1>
          <Link href="/register" className="w-full">
            <Button variant="primary" value={'Get started'} type="button" />
          </Link>
        </div>
        <Image
          className="mt-16 mb-20 max-h-96 rounded-xl object-cover object-top shadow-lg shadow-indigo-100
           md:max-w-md lg:max-w-screen-sm "
          src={Interface}
          alt="interface"
        />
      </section>
    </main>
  );
}
