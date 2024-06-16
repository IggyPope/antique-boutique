import { Card, CardMedia, Grid, IconButton, Stack, Typography } from '@mui/material';

import { LineItem } from '@commercetools/platform-sdk';

import { CartItemQuantity } from '@/components/Cart/CartItemQuantity';
import Delete from '@/components/UI/Icon/Delete';
import { APP_SETTINGS } from '@/constants/app';
import theme from '@/theme';
import formatPrice from '@/utils/formatPrice';

type CartItemProps = {
  item: LineItem;
  changeQuantity: (lineItemId: string, quantity: number) => void;
};

const CartItem = ({ item, changeQuantity }: CartItemProps) => {
  return (
    <Card
      key={item.id}
      sx={{
        display: 'flex',
        boxShadow: 'none',
        padding: '26px 0',
        borderRadius: '0',
        borderBottom: `1px solid ${theme.palette.primary.light}`,
      }}
    >
      <Grid container spacing={2}>
        <Grid item md="auto" xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            image={item.variant.images ? item.variant.images[0].url : ''}
            title={item.name[APP_SETTINGS.LOCALE]}
            sx={{ width: '170px', height: '170px' }}
          />
        </Grid>
        <Grid item md={5.5} xs={10}>
          <Stack gap={1}>
            <Typography variant="h6" sx={{ textDecoration: 'underline' }}>
              {item.name[APP_SETTINGS.LOCALE]}
            </Typography>
            <Typography sx={{ color: 'primary.main' }}>
              {formatPrice(item.price.value.centAmount)}
            </Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <CartItemQuantity id={item.id} changeQuantity={changeQuantity} />
            </Stack>
            <Stack sx={{ '& p': { fontSize: '1.125rem', fontWeight: '600' }, mt: 1 }}>
              {item.price.discounted?.value.centAmount ? (
                <Stack direction="row" gap={1}>
                  <Typography>
                    {formatPrice(item.price.discounted.value.centAmount * item.quantity)}
                  </Typography>
                  <Typography sx={{ textDecoration: 'line-through', color: 'primary.main' }}>
                    {formatPrice(item.price.value.centAmount * item.quantity)}
                  </Typography>
                </Stack>
              ) : (
                <Typography>{formatPrice(item.price.value.centAmount * item.quantity)}</Typography>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid item md xs={2} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'start' }}>
          <IconButton
            sx={{
              '&:hover path': { transition: 'fill 0.3s' },
              '@media (any-hover: hover)': { '&:hover path': { fill: theme.palette.error.main } },
            }}
            onClick={() => changeQuantity(item.id, 0)}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;
