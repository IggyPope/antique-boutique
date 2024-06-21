import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import { describe, it, expect } from 'vitest';

import { UserCredentialsTab } from '@/components/Profile/Tabs/UserCredentialsTab';
import { store } from '@/store/store';

beforeEach(() => {
  nock('https://api.europe-west1.gcp.commercetools.com/antique-boutique')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get('/me')
    .reply(200, {
      id: '1ccf9484-ccaf-4167-be71-7201f4d234b3',
      version: 146,
      email: 'test@something.com',
      firstName: 'Ellie',
      lastName: 'Belly',
      dateOfBirth: '2000-01-05',
      password: '****BJs=',
      addresses: [
        {
          id: 'SgWGM6kb',
          streetName: 'Ulitsa',
          postalCode: '123456',
          city: 'Minsk',
          country: 'BY',
        },
        {
          id: '4tHy09gn',
          streetName: 'Street',
          postalCode: '23456',
          city: 'Calais',
          country: 'FR',
        },
      ],
      defaultShippingAddressId: '4tHy09gn',
      defaultBillingAddressId: 'SgWGM6kb',
      shippingAddressIds: ['SgWGM6kb', '4tHy09gn'],
      billingAddressIds: ['4tHy09gn', 'SgWGM6kb'],
    });
});

describe('Profile Page Component', () => {
  it('renders profile data with fetched values', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserCredentialsTab />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const firstNameInput = screen.getByTestId<HTMLInputElement>('edit-first-name');
      const lastNameInput = screen.getByTestId<HTMLInputElement>('edit-last-name');
      const email = screen.getByTestId<HTMLInputElement>('edit-email');

      expect(firstNameInput.value).toBe('Ellie');
      expect(lastNameInput.value).toBe('Belly');
      expect(email.value).toBe('test@something.com');
    });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    if (submitButton instanceof HTMLButtonElement) {
      expect(submitButton.disabled).toBe(false);
    }
  });
  afterEach(() => {
    nock.cleanAll();
  });
});
