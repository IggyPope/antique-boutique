import {
  Card,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { TestType } from '@/components/Cart/types';
import Delete from '@/components/UI/Icon/Delete';
import theme from '@/theme';
import formatPrice from '@/utils/formatPrice';

type CartItemProps = {
  item: TestType;
  deleteItem: (id: string) => void;
  changeQuantity: (id: string, quantity: string) => void;
};

const CartItem = ({ item, deleteItem, changeQuantity }: CartItemProps) => {
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
            image={item.imageUrl}
            title={item.name}
            sx={{ width: '170px', height: '170px' }}
          />
        </Grid>
        <Grid item md={5.5} xs={10}>
          <Stack gap={1}>
            <Typography variant="h6" sx={{ textDecoration: 'underline' }}>
              {item.name}
            </Typography>
            <Typography sx={{ color: 'primary.main' }}>${formatPrice(item.price)}</Typography>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography>Quantity</Typography>
              <FormControl variant="standard" size="small">
                <Select value={item.quantity}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem
                      value={num}
                      key={num}
                      onClick={() => changeQuantity(item.id, num.toString())}
                    >
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack sx={{ '& p': { fontSize: '1.125rem', fontWeight: '600' }, mt: 1 }}>
              {item.discountedPrice ? (
                <Stack direction="row" gap={1}>
                  <Typography>${formatPrice(item.discountedPrice * item.quantity)}</Typography>
                  <Typography sx={{ textDecoration: 'line-through', color: 'primary.main' }}>
                    ${formatPrice(item.price * item.quantity)}
                  </Typography>
                </Stack>
              ) : (
                <Typography>${formatPrice(item.price * item.quantity)}</Typography>
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
            onClick={() => deleteItem(item.id)}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;
