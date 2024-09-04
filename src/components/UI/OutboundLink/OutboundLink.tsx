import { Link } from '@mui/material';

import theme from '@/theme';

type OutboundLinkProps = {
  href: string;
  text: string;
};

const OutboundLink = ({ href, text }: OutboundLinkProps) => {
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
