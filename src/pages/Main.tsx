import { useEffect } from 'react';

import { Box, Stack } from '@mui/material';

import { AuthService } from '@/api/services/AuthService';
import MainNavLinks from '@/components/MainNavLinks/MainNavLinks';
import PromoBlog from '@/components/Promo/PromoBlog';
import PromoCategories from '@/components/Promo/PromoCategories';
import PromoSlogan from '@/components/Promo/PromoSlogan';

const Main = () => {
  const service = AuthService.getInstance();

  useEffect(() => {
    service.apiRoot
      .me()
      .carts()
      .get()
      .execute()
      .then((res) => JSON.stringify(res))
      .catch((err) => {
        throw new Error(`${err}`);
      });
  });

  return (
    <Stack direction="column" gap={2}>
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <MainNavLinks />
      </Box>
      <PromoCategories />
      <PromoSlogan />
      <PromoBlog />
    </Stack>
  );
};

export default Main;
