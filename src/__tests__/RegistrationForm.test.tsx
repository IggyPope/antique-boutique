import { Provider } from 'react-redux';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

import { RegistrationForm } from '@/components/RegistrationForm/RegistrationForm';
import { useAuth } from '@/hooks/useAuth';
import { store } from '@/store/store';

vi.mock('@/hooks/useAuth');
describe('RegistrationForm', () => {
  it('should validate the entered data correctly', async () => {
    vi.mocked(useAuth).mockReturnValue({
      ...useAuth(),
      signUp: vi.fn(),
    });
    const { getByTestId, getByRole } = render(
      <Provider store={store}>
        <RegistrationForm />
      </Provider>,
    );
    act(() => {
      fireEvent.change(getByTestId('registration-email'), { target: { value: 'test@mail.com' } });
      fireEvent.change(getByTestId('registration-password'), {
        target: { value: 'Securepassword123!' },
      });
      fireEvent.change(getByTestId('registration-first-name'), { target: { value: 'John' } });
      fireEvent.change(getByTestId('registration-last-name'), { target: { value: 'Doe' } });
    });
    const datePicker = screen.getByLabelText('Date of Birth');

    await userEvent.click(datePicker);
    const chosenDate = screen.getByRole('button', {
      name: 'Choose date, selected date is Jan 1, 2000',
    });

    fireEvent.click(chosenDate);
    act(() => {
      fireEvent.input(datePicker, {
        target: {
          value: '01/01/1999',
        },
      });
      fireEvent.change(getByTestId('registration-shipping-street'), { target: { value: 'St' } });
      fireEvent.change(getByTestId('registration-shipping-city'), { target: { value: 'Paris' } });
      const autocomplete = getByRole('combobox', { name: /shipping country/i });
      autocomplete.focus();
      fireEvent.mouseDown(autocomplete);
      fireEvent.change(autocomplete, { target: { value: 'a' } });

      fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
      fireEvent.keyDown(autocomplete, { key: 'Enter' });

      fireEvent.change(getByTestId('registration-shipping-zip-code'), {
        target: { value: '12345' },
      });
      const autocompleteBil = getByRole('combobox', { name: /billing country/i });

      autocompleteBil.focus();

      fireEvent.change(autocompleteBil, { target: { value: 'a' } });
      fireEvent.keyDown(autocompleteBil, { key: 'ArrowDown' });
      fireEvent.keyDown(autocompleteBil, { key: 'Enter', code: 'Enter' });

      fireEvent.change(getByTestId('registration-billing-zip-code'), {
        target: { value: '12345' },
      });
      fireEvent.change(getByTestId('registration-billing-street'), { target: { value: 'St' } });
      fireEvent.change(getByTestId('registration-billing-city'), { target: { value: 'Paris' } });
      const useAsBillingAddressCheckbox = screen.getByLabelText('Use as billing address');
      fireEvent.click(useAsBillingAddressCheckbox);
    });

    await waitFor(() => {
      const submitButton = getByTestId('registration_submit-button') as HTMLButtonElement;
      expect(submitButton.disabled).toBe(false);
    });

    await waitFor(() => {
      fireEvent.submit(screen.getByTestId('registration_submit-button'));
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
