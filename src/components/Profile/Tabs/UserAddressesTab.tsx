import { useMemo } from 'react';
import { toast } from 'react-toastify';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';

import { MyCustomerUpdate } from '@commercetools/platform-sdk';

import { useGetCustomerQuery, useUpdateCustomerMutation } from '@/api/services/commercetoolsApi';
import { AddUserAddressComponent } from '@/components/Profile/Tabs/AddUserAddressComponent';
import { UserAddressForm } from '@/components/Profile/Tabs/UserAddressForm';
import { processAddresses } from '@/components/Profile/Tabs/utils';

export interface AddressInfo {
  id?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string | null;
  version: number;
  shippingAddressId: boolean;
  billingAddressId: boolean;
  addressType: 'billing' | 'shipping' | 'shipping and billing' | '';
  useAsDefaultShipping: boolean;
  useAsDefaultBilling: boolean;
}

export function UserAddressesTab() {
  const { data: userDetails } = useGetCustomerQuery();

  const [updateCustomer] = useUpdateCustomerMutation();

  const handleRemoveAddress = (addressId: string | undefined, version: number) => {
    const payload: MyCustomerUpdate = {
      version,
      actions: [
        {
          action: 'removeAddress',
          addressId,
        },
      ],
    };
    updateCustomer(payload)
      .then(() => {
        toast.success('Address removed successfully');
      })
      .catch(() => {
        toast.error('Failed to remove address');
      });
  };

  const addresses = useMemo<AddressInfo[]>(() => processAddresses(userDetails), [userDetails]);

  return (
    <Box
      gap={3}
      width="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        flexWrap: 'wrap',
      }}
    >
      {addresses.map((address) => {
        let addressTypeLabelShipping;
        let addressTypeLabelBilling;
        const addressTypeMessage = 'Your address';

        if (address.useAsDefaultShipping) {
          addressTypeLabelShipping = 'Default Shipping';
        }

        if (address.useAsDefaultBilling) {
          addressTypeLabelBilling = 'Default Billing';
        }

        const addressTypeName = address.addressType;

        return (
          <Stack
            key={address.id}
            direction="column"
            gap={2}
            sx={{
              width: { xs: '80%', sm: '40%' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              <Typography component={'p'}>{addressTypeMessage}</Typography>
              <DeleteOutlineIcon
                sx={{ color: '#e46d6d', cursor: 'pointer' }}
                onClick={() => handleRemoveAddress(address.id, address.version)}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              {addressTypeLabelShipping && (
                <Chip label={addressTypeLabelShipping} color="secondary" variant="outlined" />
              )}
              {addressTypeLabelBilling && (
                <Chip label={addressTypeLabelBilling} sx={{ color: 'blue' }} variant="outlined" />
              )}
              {!addressTypeLabelShipping && !addressTypeLabelBilling && (
                <Chip label="Not a Default address" color="error" variant="outlined" />
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              {addressTypeName && (
                <Chip label={addressTypeName} variant="outlined" sx={{ color: 'orange' }} />
              )}
            </Box>

            <UserAddressForm initialData={address} />
          </Stack>
        );
      })}
      <Stack
        direction="column"
        gap={2}
        sx={{
          width: { xs: '80%', sm: '40%' },
          alignSelf: { xs: 'center', sm: 'flex-start' },
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component={'p'} sx={{ width: { xs: '80%' } }}>
              Add a new address
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddUserAddressComponent version={userDetails?.version || 1} />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Box>
  );
}
