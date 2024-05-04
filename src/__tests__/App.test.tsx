import { render, screen } from '@testing-library/react';

import App from '@/App';

it('renders "Press me" button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Press me/i);
  expect(buttonElement).toBeInTheDocument();
});
