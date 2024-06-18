import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

interface CartItemQuantityInputProps {
  isLoading: boolean;
  value: number | undefined;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const CartItemQuantityInput: React.FC<CartItemQuantityInputProps> = ({
  isLoading,
  value,
  onIncrement,
  onDecrement,
}: CartItemQuantityInputProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      height={'100%'}
    >
      <IconButton disabled={isLoading} onClick={onDecrement}>
        <RemoveIcon />
      </IconButton>
      <Typography component="span" minWidth={16} textAlign={'center'}>
        {value ?? 0}
      </Typography>
      <IconButton disabled={isLoading} onClick={onIncrement}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
};
