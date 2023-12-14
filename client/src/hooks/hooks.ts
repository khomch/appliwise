import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { isUserLogged } from '@/services/api.service';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useAuth = (router: AppRouterInstance) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    (async () => {
      const { error } = await isUserLogged();
      if (error) {
        router.push('/login');
        return;
      }
      setIsAuthorized(true);
    })();
  }, [router]);

  return isAuthorized;
};
