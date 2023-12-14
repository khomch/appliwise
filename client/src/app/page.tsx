import Image from 'next/image';
import Interface from '../../public/interface.png';
import { Button } from '@/components/ui/button/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex w-full justify-center items-center align-middle">
      <section className="flex justify-between max-w-[1320px] self-center items-center w-full mt-28">
        <div>
          <h1
            className="font-bold text-6xl tracking-narrow
        bg-gradient-to-r from-apptprimary via-slate-600 to-apptprimary inline-block text-transparent bg-clip-text py-9
        "
          >
            Appliwise — <br />
            Robust Job Application <br />Tracking Solution
          </h1>
          <Link href="/register">
            <Button variant="primary" value={'Get started'} type="button" />
          </Link>
        </div>
        <Image className=" max-w-xl h-fit" src={Interface} alt="interface" />
      </section>
    </main>
  );
}
