import { render, screen } from '@testing-library/react';

import App from '@/App';

it('renders a button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});
