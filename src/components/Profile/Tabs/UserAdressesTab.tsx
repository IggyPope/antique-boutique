import { useEffect, useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { GetUserDetailsService } from '@/api/services/GetUserDetailsService';
import { getCountryByCode } from '@/components/RegistrationForm/utils';

import { UserAddressForm } from './UserAddressForm';

export interface AddressInfo {
  id?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string | null;
  version: number;
  shippingAddressId: boolean;
  billingAddressId: boolean;
  addressType: 'billing' | 'shipping' | undefined;
  useAsDefaultShipping: boolean;
  useAsDefaultBilling: boolean;
}

export function UserAddressesTab() {
  const service = GetUserDetailsService.getInstance();
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [version, setVersion] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await service.getUserDetails();
        const addressesList = res.body.addresses;
        setVersion(res.body.version);
        if (res.body.shippingAddressIds && res.body.billingAddressIds) {
          setAddresses(
            addressesList.map((address) => ({
              id: address.id,
              street: address.streetName,
              city: address.city,
              zipCode: address.postalCode,
              country: getCountryByCode(address.country),
              version: res.body.version,
              shippingAddressId: res.body?.shippingAddressIds?.includes(address.id || '') ?? false,
              billingAddressId: res.body?.billingAddressIds?.includes(address.id || '') ?? false,
              addressType: res.body?.shippingAddressIds?.includes(address.id || '')
                ? 'shipping'
                : 'billing',
              useAsDefaultShipping: Boolean(res.body.defaultShippingAddressId),
              useAsDefaultBilling: Boolean(res.body.defaultBillingAddressId),
            })),
          );
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    void fetchData();
  }, [service]);

  return (
    <Box
      gap={3}
      width="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        flexWrap: 'wrap',
      }}
    >
      {addresses.map((address, index) => {
        const addressTypeMessage = `Your ${address.addressType} address`;
        return (
          <Stack key={index} direction="column" gap={2} width="40%">
            <Typography component={'p'}>{addressTypeMessage}</Typography>
            <UserAddressForm initialData={address} />
          </Stack>
        );
      })}
      <Stack direction="column" gap={2} width="40%">
        <Typography component={'p'}>Add a new address</Typography>
        <UserAddressForm initialData={null} version={version} />
      </Stack>
    </Box>
  );
}
