import { usePathname, useRouter } from 'next/navigation';
import Loader from '../ui/loader/loader';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchUserDetails } from '@/store/slices/userSlice';
import { useEffect } from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { fetchBoards } from '@/services/board.service';
import { getStaticProps } from 'next/dist/build/templates/pages';

type AuthProviderProps = {
  children: React.ReactNode;
  repo: InferGetStaticPropsType<typeof getStaticProps>;
};

type Repo = {
  name: string;
  stargazers_count: number;
};


const allowedPaths = ['/', '/login', '/register'];

function AuthProvider({ children, repo }: AuthProviderProps) {
  console.log('repo: ', repo);
  const router = useRouter();
  const pathname = usePathname();
  const { isLogged } = useAppSelector((state) => state.user);
  const isAllowed = isLogged || allowedPaths.includes(pathname);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserDetails())
  //     .then((res) => {
  //       if (res.payload && res.payload._id) return;
  //       if (!isAllowed) {
  //         router.push('/login');
  //       }
  //     })
  //     .catch((err) => console.log('Error while fetching user details', err));
  // }, [dispatch, isAllowed, router]);

  return isAllowed ? (
    <>{children}</>
  ) : (
    <div className="auth-provider">{<Loader />}</div>
  );
}

export default AuthProvider;
