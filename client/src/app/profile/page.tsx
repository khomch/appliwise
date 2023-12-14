'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button/button';
import { useAppDispatch } from '../../hooks/hooks';
import { resetUserState } from '../../store/slices/userSlice';
import { logoutUser } from '@/services/user.service';

export default function Profile() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    dispatch(resetUserState());
    router.push('/login');
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="mt-12 font-regular text-xl">Profile</h1>
      <form className="flex flex-col w-full max-w-sm mt-4 gap-4 p-4 border border-appborder shadow-sm rounded-lg my-1  bg-white">
        <Button
          variant="primary"
          type="button"
          size="xl"
          value={'Logout'}
          onClick={handleLogout}
        />
      </form>
    </section>
  );
}
