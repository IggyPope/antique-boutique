import { SvgIcon, useTheme } from '@mui/material';

const Profile = () => {
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
        <circle
          cx="11.5001"
          cy="11.5"
          r="9.40833"
          stroke={theme.palette.secondary.contrastText}
          strokeWidth="1.5"
        />
        <path
          d="M13.7981 8.4525C13.7981 9.72137 12.7695 10.75 11.5006 10.75C10.2317 10.75 9.20312 9.72137 9.20312 8.4525C9.20312 7.18362 10.2317 6.155 11.5006 6.155C12.7695 6.155 13.7981 7.18362 13.7981 8.4525Z"
          stroke={theme.palette.secondary.contrastText}
          strokeWidth="1.5"
        />
        <path
          d="M6.0293 18.5327C7.0162 15.7569 9.09472 13.8443 11.4992 13.8443C13.9036 13.8443 15.9821 15.7569 16.969 18.5327"
          stroke={theme.palette.secondary.contrastText}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default Profile;
