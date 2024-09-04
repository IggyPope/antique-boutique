import { AddressInfo } from '@/components/Profile/Tabs/UserAddressesTab';

interface AddressLabels {
  shippingLabel: string | null;
  billingLabel: string | null;
  addressTypeName: string;
  addressTypeMessage: string;
}

export const getAddressLabels = (address: AddressInfo): AddressLabels => {
  let shippingLabel = null;
  let billingLabel = null;
  const addressTypeMessage = 'Your address';
  const addressTypeName = address.addressType;

  if (address.useAsDefaultShipping) {
    shippingLabel = 'Default Shipping';
  }

  if (address.useAsDefaultBilling) {
    billingLabel = 'Default Billing';
  }

  return {
    shippingLabel,
    billingLabel,
    addressTypeName,
    addressTypeMessage,
  };
};
