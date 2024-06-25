import { useMemo } from 'react';

import { useAuth } from '@/hooks/useAuth';

type Pages = { text: string; path: string; auth?: boolean }[];

const pages = [
  { text: 'Home', path: '/' },
  { text: 'Catalog', path: '/catalog' },
  { text: 'About us', path: '/about' },
  { text: 'Sign in', path: '/signin', auth: false },
  { text: 'Sign up', path: '/signup', auth: false },
  { text: 'Sign out', path: '/signout', auth: true },
];

export const useFilteredPages = (): Pages => {
  const { isAuthenticated } = useAuth();

  const filteredPages = useMemo(() => {
    return pages.filter((page) => (isAuthenticated ? page.auth !== false : page.auth !== true));
  }, [isAuthenticated]);

  return filteredPages;
};
