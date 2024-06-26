import { useLocation } from 'react-router-dom';

interface IPageTitle {
  [key: string]: string;
}

const pageTitles: IPageTitle = {
  '/': 'Welcome to Antique Boutique',
  '/signin': 'Sign In to Your Account',
  '/login': 'Sign In to Your Account',
  '/signup': 'Create New Customer Account',
  '/register': 'Create New Customer Account',
  '/cart': 'Shopping Cart',
  '/about': 'Learn More About Us',
  '/profile': 'Your Profile',
};

export const usePageTitle = (): string => {
  const location = useLocation();
  return pageTitles[location.pathname];
};
