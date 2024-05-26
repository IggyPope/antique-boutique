import { Provider } from 'react-redux';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useAuth } from '@/hooks/useAuth';

import { store } from '../../store/store';
import { LoginForm } from './LoginForm';

vi.mock('@/hooks/useAuth');

describe('LoginForm', () => {
  it('should validate the entered data correctly', async () => {
    vi.mocked(useAuth).mockReturnValue({
      ...useAuth(),
      signIn: vi.fn(),
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );
    act(() => {
      fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
        target: {
          value: 'test@mail.com',
        },
      });
    });
    act(() => {
      fireEvent.change(getByTestId('login-password'), { target: { value: 'Securepassword123!' } });
    });
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /submit/i });
      if (submitButton instanceof HTMLButtonElement) {
        expect(submitButton.disabled).toBe(false);
      }
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await waitFor(() => {
      expect(useAuth().signIn).toHaveBeenCalledWith('test@mail.com', 'Securepassword123!');
    });
  });
});
