import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack, Typography } from '@mui/material';

import { useDiscountCodes } from '@/hooks/useDiscountCodes';

export const AppliedCodes = () => {
  const { appliedCodes, removeDiscountCode } = useDiscountCodes();

  return (
    <Stack gap={1}>
      {appliedCodes.map((code) => (
        <Stack key={code.id} direction="row" gap={1} justifyContent="space-between">
          <Typography>{code.code}</Typography>
          <Button
            onClick={() => removeDiscountCode(code.id)}
            variant="text"
            color="primary"
            size="small"
            sx={{ padding: 0, minWidth: '0' }}
          >
            <CloseIcon />
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};
