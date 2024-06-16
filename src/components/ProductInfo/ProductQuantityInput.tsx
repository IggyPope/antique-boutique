import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';

interface ProductQuantityInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isInCart?: boolean | undefined;
  isInStock?: boolean | undefined;
}

export const ProductQuantityInput: React.FC<ProductQuantityInputProps> = ({
  value,
  onIncrement,
  onDecrement,
  isInCart,
  isInStock,
}: ProductQuantityInputProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80px',
        height: '100%',
      }}
    >
      <IconButton onClick={onDecrement} disabled={isInCart || !isInStock}>
        <RemoveIcon />
      </IconButton>
      <input
        type="text"
        readOnly
        value={value}
        style={{ textAlign: 'center', width: '40px', height: '80%' }}
      />
      <IconButton onClick={onIncrement} disabled={isInCart || !isInStock}>
        <AddIcon />
      </IconButton>
    </div>
  );
};
