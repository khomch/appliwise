import AuthProvider from '@/components/auth-provider/auth-provider';
import { useAppDispatch } from '@/hooks/hooks';
import { fetchBoards } from '@/services/board.service';
import { getUserProfile } from '@/services/user.service';
import { getBoardData } from '@/store/slices/boardSlice';
import { fetchUserDetails } from '@/store/slices/userSlice';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type Repo = {
  name: string;
  stargazers_count: number;
};

async function getData() {
  const res = fetchBoards();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
 
  return res;
}

export default async function Home() {
  const data = await getData()
  console.log('data: ', data);
  return (
    <main className="flex w-full justify-center items-center align-middle">
      <section className="flex min-h-screen justify-between max-w-[1320px] self-center w-full">
        <h1>HOME PAGE WIP</h1>
      </section>
    </main>
  );
}
