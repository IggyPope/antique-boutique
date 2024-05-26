import { Button } from '@mui/material';

const CustomButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => onClick()}
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
