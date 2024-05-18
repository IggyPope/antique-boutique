import { Provider } from 'react-redux';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import { useAuth } from '@/hooks/useAuth';

import { store } from '../../store/store';
import { RegistrationForm } from './RegistrationForm';

vi.mock('@/hooks/useAuth');
describe('RegistrationForm', () => {
  it('should validate the entered data correctly', async () => {
    vi.mocked(useAuth).mockReturnValue({
      ...useAuth(),
      signUp: vi.fn(),
    });
    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <RegistrationForm />
      </Provider>,
    );
    act(() => {
      fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
        target: {
          value: 'test@mail.com',
        },
      });
      fireEvent.change(getByLabelText(/password/i), { target: { value: 'Securepassword123!' } });
      fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
      fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    });
    const datePicker = screen.getByLabelText('Date of Birth');

    await userEvent.click(datePicker);
    const chosenDate = screen.getByRole('button', {
      name: 'Choose date, selected date is Jan 1, 2000',
    });

    fireEvent.click(chosenDate);
    act(() => {
      fireEvent.input(screen.getByRole('textbox', { name: /Date of Birth/i }), {
        target: {
          value: '01/01/1999',
        },
      });
      fireEvent.change(getByLabelText(/Shipping Street/i), { target: { value: 'St' } });
      fireEvent.change(getByLabelText(/Shipping City/i), { target: { value: 'Paris' } });
      const autocomplete = getByRole('combobox', { name: /shipping country/i });
      autocomplete.focus();
      fireEvent.mouseDown(autocomplete);
      fireEvent.change(autocomplete, { target: { value: 'a' } });

      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
      fireEvent.keyDown(autocomplete, { key: 'Enter' });

      fireEvent.change(getByLabelText(/Shipping Zip Code/i), { target: { value: '12345' } });
      const autocompleteBil = getByRole('combobox', { name: /billing country/i });

      autocompleteBil.focus();

      fireEvent.change(autocompleteBil, { target: { value: 'a' } });
      fireEvent.keyDown(autocompleteBil, { key: 'ArrowDown' });
      fireEvent.keyDown(autocompleteBil, { key: 'Enter', code: 'Enter' });

      fireEvent.change(getByLabelText(/Billing Zip Code/i), { target: { value: '12345' } });
      fireEvent.change(getByLabelText(/Billing Street/i), { target: { value: 'St' } });
      fireEvent.change(getByLabelText(/Billing City/i), { target: { value: 'Paris' } });
      const useAsBillingAddressCheckbox = screen.getByLabelText('Use as billing address');
      fireEvent.click(useAsBillingAddressCheckbox);
    });

    await waitFor(() => {
      const submitButton = getByRole('button', { name: /submit/i }) as HTMLButtonElement;
      expect(submitButton.disabled).toBe(false);
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    });

    expect(useAuth().signUp).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1999-01-01',
        email: 'test@mail.com',
        password: 'Securepassword123!',
        addresses: [
          {
            country: 'DZ',
            city: 'Paris',
            streetName: 'St',
            postalCode: '12345',
          },
          {
            country: 'DZ',
            city: 'Paris',
            streetName: 'St',
            postalCode: '12345',
          },
        ],
        defaultBillingAddress: undefined,
        defaultShippingAddress: undefined,
      }),
    );
  }, 95000);
});
