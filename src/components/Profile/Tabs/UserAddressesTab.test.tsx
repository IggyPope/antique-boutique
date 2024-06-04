import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import { describe, it, expect } from 'vitest';

import { UserAddressesTab } from '@/components/Profile/Tabs/UserAddressesTab';
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
          <UserAddressesTab />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      const zipCodeFields = screen.queryAllByTestId<HTMLInputElement>('editing-zip-code');
      const streetFields = screen.queryAllByTestId<HTMLInputElement>('editing-street');
      const cityFields = screen.queryAllByTestId<HTMLInputElement>('editing-city');

      expect(screen.getByText('Default Billing')).toBeInTheDocument();
      expect(screen.getByText('Default Shipping')).toBeInTheDocument();
      expect(zipCodeFields[0].value).toBe('123456');
      expect(streetFields[0].value).toBe('Ulitsa');
      expect(cityFields[0].value).toBe('Minsk');
      expect(zipCodeFields[1].value).toBe('23456');
      expect(streetFields[1].value).toBe('Street');
      expect(cityFields[1].value).toBe('Calais');
    });
  });
  afterEach(() => {
    nock.cleanAll();
  });
});
