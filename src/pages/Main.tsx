import { useEffect } from 'react';

import { Stack } from '@mui/material';

import { AuthService } from '@/api/services/AuthService';
import PromoBlog from '@/components/Promo/PromoBlog';
import PromoCategories from '@/components/Promo/PromoCategories';
import PromoSlogan from '@/components/Promo/PromoSlogan';

const Main = () => {
  const service = AuthService.getInstance();

  useEffect(() => {
    service.apiRoot
      .productProjections()
      .get()
      .execute()
      .catch((err) => {
        throw new Error(`${err}`);
      });
  }, [service.apiRoot]);

  return (
    <Stack py={2} direction="column" gap={2}>
      <PromoCategories />
      <PromoSlogan />
      <PromoBlog />
    </Stack>
  );
};

export default Main;
