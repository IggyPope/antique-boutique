import { useState } from 'react';

import { Stack, TextField, Button } from '@mui/material';

import { useDiscountCodes } from '@/hooks/useDiscountCodes';

const DiscountCode = ({ disabled }: { disabled: boolean }) => {
  const [promo, setPromo] = useState('');

  const { addDiscountCode } = useDiscountCodes();

  const applyPromo = () => {
    void addDiscountCode(promo);
  };

  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems={'center'} gap={1}>
        <TextField
          disabled={disabled}
          label="Discount code"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Enter code"
          sx={{ backgroundColor: 'secondary.contrastText', height: '40px' }}
          onKeyUp={(e) => e.key === 'Enter' && promo.length > 0 && applyPromo()}
        />
        <Button
          disabled={disabled}
          onClick={() => applyPromo()}
          color="secondary"
          sx={{ height: '40px' }}
        >
          Apply
        </Button>
      </Stack>
    </Stack>
  );
};

export default DiscountCode;
