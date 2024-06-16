import { Stack, Typography } from '@mui/material';

import theme from '@/theme';
import formatPrice from '@/utils/formatPrice';

type TotalPriceSummaryProps = {
  subtotalSummary: number;
  totalSummary: number;
};

const TotalPriceSummary = ({ subtotalSummary, totalSummary }: TotalPriceSummaryProps) => {
  return (
    <Stack mt={10} sx={{ [theme.breakpoints.down('md')]: { mt: 0 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        pb={2}
        sx={{
          borderBottom: `1px solid ${theme.palette.primary.main}`,
          '& > *': { fontSize: '0.875rem' },
        }}
      >
        <Typography>Subtotal</Typography>
        <Typography>{formatPrice(subtotalSummary)}</Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt={2}
        sx={{ '& > *': { fontSize: '1.125rem', fontWeight: '600' } }}
      >
        <Typography>Order Total</Typography>
        <Typography>{formatPrice(totalSummary)}</Typography>
      </Stack>
    </Stack>
  );
};

export default TotalPriceSummary;
