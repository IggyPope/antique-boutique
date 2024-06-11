import { Button } from '@mui/material';

type CustomButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const CustomButton = ({ onClick, disabled, children }: CustomButtonProps) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={onClick}
      disabled={disabled}
      sx={{
        textTransform: 'none',
        fontWeight: '600',
        borderRadius: '2px',
        textDecoration: 'none',
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
