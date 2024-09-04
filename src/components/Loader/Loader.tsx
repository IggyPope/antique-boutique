import CircularProgress from '@mui/material/CircularProgress';

export function Loader() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <CircularProgress color="primary" />
    </div>
  );
}
