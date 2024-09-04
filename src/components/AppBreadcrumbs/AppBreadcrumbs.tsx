import { useLocation } from 'react-router-dom';

import { Breadcrumbs, Link } from '@mui/material';

const AppBreadcrumbs = () => {
  const { pathname } = useLocation();

  let currentLocation = '';

  const crumbs = pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index) => {
      currentLocation += `/${crumb}`;

      return (
        <Link key={index} underline="hover" href={currentLocation}>
          {crumb[0].toUpperCase() + crumb.slice(1)}
        </Link>
      );
    });
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" href="/">
        Home
      </Link>
      {crumbs}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
