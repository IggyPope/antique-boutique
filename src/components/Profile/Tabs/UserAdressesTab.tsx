import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { GetUserDetailsService } from '@/api/services/GetUserDetailsService';
import { UserAddressForm } from '@/components/Profile/Tabs/UserAddressForm';
import { getCountryByCode } from '@/components/RegistrationForm/utils';
import { UpdateCustomerService } from '@/api/services/UpdateCustomerService';
import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { AddUserAddressForm } from '@/components/Profile/Tabs/AddUserAddressForm'

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
  const service = GetUserDetailsService.getInstance();
  const updateService = UpdateCustomerService.getInstance();
  const [addresses, setAddresses] = useState<AddressInfo[]>([]);
  const [version, setVersion] = useState<number>(0);
  const [submission, setSubmission] = useState(false);

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
              addressType: address.id ? (
                (res.body?.billingAddressIds?.includes(address.id)) && (res.body?.shippingAddressIds?.includes(address.id)) ?
                  'shipping and billing' :
                  (res.body?.billingAddressIds?.includes(address.id)) ?
                    'billing' :
                    (res.body?.shippingAddressIds?.includes(address.id)) ?
                      'shipping' :
                      ''
              ) : '',
              useAsDefaultShipping: res.body.defaultShippingAddressId === address.id,
              useAsDefaultBilling: res.body.defaultBillingAddressId === address.id,
            })),
          );
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    void fetchData();
  }, [service, submission]);



  const handleFormSubmission = () => {
    setSubmission(!submission);
  };


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
        let addressTypeLabelShipping
        let addressTypeLabelBilling
        const addressTypeMessage = 'Your address'

        if (address.useAsDefaultShipping) {
          addressTypeLabelShipping = 'Default Shipping'
        }

        if (address.useAsDefaultBilling) {
          addressTypeLabelBilling = 'Default Billing'

        }

        const addressTypeName = address.addressType
        const handleRemoveAddress = async (addressToRemove: AddressInfo) => {
          setAddresses(addresses.filter(address => address.id !== addressToRemove.id));
          try {
            const payload: MyCustomerUpdate = {
              version: address.version,
              actions: [
                {
                  action: 'removeAddress',
                  addressId: addressToRemove.id,
                },
              ],
            };
            await updateService.updateCustomer(payload);
            toast.success("Address removed successfully");
            setSubmission(!submission);
          } catch (error) {
            toast.error("Failed to remove address");
          }
        }

        return (

          <Stack key={index} direction="column" gap={2} width="40%">
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}> <Typography component={'p'}>{addressTypeMessage}</Typography>
              <DeleteOutlineIcon sx={{ color: '#e46d6d', cursor: 'pointer' }} onClick={() => handleRemoveAddress(address)} /></Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>  {addressTypeLabelShipping && <Chip label={addressTypeLabelShipping} color='secondary' variant="outlined" />}
              {addressTypeLabelBilling && <Chip label={addressTypeLabelBilling} sx={{ color: 'blue' }} variant="outlined" />}
              {!addressTypeLabelShipping && !addressTypeLabelBilling && <Chip label="Not a Default address" color='error' variant="outlined" />}
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>   {addressTypeName && <Chip label={addressTypeName} variant="outlined" sx={{ color: 'orange' }} />}</Box>

            <UserAddressForm handleFormSubmission={handleFormSubmission} initialData={address} />
          </Stack>
        );
      })}
      <Stack direction="column" gap={2} width="40%">
        <Typography component={'p'}>Add a new address</Typography>
        <AddUserAddressForm handleFormSubmission={handleFormSubmission} version={version} />
      </Stack>
    </Box>
  );
}
