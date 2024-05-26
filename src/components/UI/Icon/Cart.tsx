import { SvgIcon, useTheme } from '@mui/material';

const Cart = () => {
  const theme = useTheme();

  return (
    <SvgIcon>
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.875 19.125V3.875C2.875 3.32272 3.32272 2.875 3.875 2.875H19.125C19.6773 2.875 20.125 3.32272 20.125 3.875V19.125C20.125 19.6773 19.6773 20.125 19.125 20.125H3.875C3.32272 20.125 2.875 19.6773 2.875 19.125Z"
          stroke={theme.palette.secondary.contrastText}
          strokeWidth="1.5"
        />
        <path
          d="M5.75 8.625H7.31818M7.31818 8.625H8.88636M7.31818 8.625C6.9697 11.0208 7.31818 15.8125 11.5 15.8125C15.6818 15.8125 16.0303 11.0208 15.6818 8.625M17.25 8.625H15.6818M15.6818 8.625H14.1136"
          stroke={theme.palette.secondary.contrastText}
          strokeWidth="1.5"
        />
      </svg>
    </SvgIcon>
  );
};

export default Cart;
