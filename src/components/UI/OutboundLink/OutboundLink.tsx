import { Link } from '@mui/material';

import theme from '@/theme';

const OutboundLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      underline="none"
      color={theme.palette.secondary.contrastText}
      sx={{
        transition: '0.3s',
        '&:hover': {
          color: theme.palette.secondary.main,
        },
      }}
    >
      {text}
    </Link>
  );
};

export default OutboundLink;
