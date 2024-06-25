import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import { describe, it, expect } from 'vitest';

import { ProductPage } from '@/pages/ProductPage';
import { store } from '@/store/store';

beforeEach(() => {
  vi.mock('react-router-dom', async () => {
    const mod = await vi.importActual('react-router-dom');
    return {
      ...mod,
      useParams: () => ({
        id: '123',
      }),
    };
  });

  nock('https://api.europe-west1.gcp.commercetools.com/antique-boutique')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
    })
    .get(`/product-projections/123`)
    .reply(200, {
      name: { en: 'Test Product' },
      masterVariant: {
        images: [{ url: 'http://example.com/image.jpg' }],
        attributes: [],
        prices: [
          {
            id: '3ea45a96-16d9-47e4-8527-e54a100fd24c',
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 32000,
              fractionDigits: 2,
            },
            discounted: {
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 27200,
                fractionDigits: 2,
              },
              discount: {
                typeId: 'product-discount',
                id: 'f56011b4-d2ad-41d2-844d-31f12bd311db',
              },
            },
          },
        ],
      },
    });
});

describe('ProductPage Component', () => {
  it('renders product details with by default and fetched values', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('12 Reviews')).toBeInTheDocument();
    });
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Sold')).toBeInTheDocument();
    expect(screen.getByText('€320.00')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByAltText('image 0')).toHaveAttribute('src', 'http://example.com/image.jpg');
  });
  afterEach(() => {
    nock.cleanAll();
  });
});
