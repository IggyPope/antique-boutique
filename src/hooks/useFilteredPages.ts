import { useAuth } from '@/hooks/useAuth';

const pages = [
  { text: 'Home', path: '/' },
  { text: 'Catalog', path: '/catalog' },
  { text: 'Sign in', path: '/signin', auth: false },
  { text: 'Sign up', path: '/signup', auth: false },
  { text: 'Sign out', path: '/signout', auth: true },
  { text: 'About us', path: '/about' },
];

export const useFilteredPages = () => {
  const { isAuthenticated } = useAuth();

  const filteredPages = pages.filter((page) =>
    isAuthenticated ? page.auth !== false : page.auth !== true,
  );

  return filteredPages;
};
