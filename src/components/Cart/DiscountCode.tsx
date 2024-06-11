import { useState } from 'react';

import { Stack, TextField, Typography } from '@mui/material';

import CustomButton from '@/components/UI/Button/CustomButton';

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
        <CustomButton disabled={disabled} onClick={() => applyPromo()}>
          Apply
        </CustomButton>
      </Stack>
    </Stack>
  );
};

export default DiscountCode;
