import { render, screen } from '@testing-library/react';

import App from '@/App';

it('renders simple button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Simple button/i);
  expect(buttonElement).toBeInTheDocument();
});
