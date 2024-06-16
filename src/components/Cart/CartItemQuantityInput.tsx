import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

interface CartItemQuantityInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const CartItemQuantityInput: React.FC<CartItemQuantityInputProps> = ({
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
      <IconButton onClick={onDecrement}>
        <RemoveIcon />
      </IconButton>
      <Typography component="span" minWidth={16} textAlign={'center'}>
        {value}
      </Typography>
      <IconButton onClick={onIncrement}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
};
