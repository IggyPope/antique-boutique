import { useState } from 'react';

import { Stack, TextField, Typography, Button } from '@mui/material';

const DiscountCode = ({ disabled }: { disabled: boolean }) => {
  const [promo, setPromo] = useState('');

  const applyPromo = () => {
    setPromo('');
  };

  return (
    <Stack gap={1}>
      <Typography fontSize="0.875rem">Apply Discount Code</Typography>
      <Stack direction="row">
        <TextField
          disabled={disabled}
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Enter code"
          sx={{ backgroundColor: 'secondary.contrastText' }}
        />
        <Button disabled={disabled} onClick={() => applyPromo()} color="primary">
          Apply
        </Button>
      </Stack>
    </Stack>
  );
};

export default DiscountCode;
