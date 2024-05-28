import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Stack,
  Typography,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';

import { yupResolver } from '@hookform/resolvers/yup';

import { AuthService } from '@/api/services/AuthService';
import { COUNTRY_LIST } from '@/components/RegistrationForm/countries';
import { getCountryByCode } from '@/components/RegistrationForm/utils';

import { EditableTextField } from './EditableTextField';
import { schema, AddressesFormValues } from './addressesSchema';
import { copyShippingToBilling } from './utils';

export function UserAddressesTab() {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<AddressesFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      billing_zipCode: '',
      billing_city: '',
      billing_country: '',
      billing_street: '',
      shipping_zipCode: '',
      shipping_city: '',
      shipping_country: '',
      shipping_street: '',
      useAsDefaultShippingAddress: false,
      useAsDefaultBillingAddress: false,
      useAsBillingAddress: false,
    },
  });

  const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(false);
  const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(false);
  const [useAsBilling, setUseAsBilling] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    copyShippingToBilling(getValues, setValue, useAsBilling, isCleared);
  }, [getValues, setValue, useAsBilling, isCleared]);

  const syncFields = async (fieldName: keyof AddressesFormValues, value: string) => {
    if (useAsBilling) {
      setValue(fieldName, value);
      await trigger(fieldName);
    }
  };
  const syncCountryFields = async (value: string | null) => {
    if (useAsBilling && typeof value === 'string') {
      setValue('billing_country', value);
      await trigger('billing_zipCode');
    }
  };
  const service = AuthService.getInstance();
  useEffect(() => {
    service.apiRoot
      .me()
      .get()
      .execute()
      .then((res) => {
        const bCity = res.body.addresses[0].city;
        const bStreet = res.body.addresses[0].streetName;
        const bZipCode = res.body.addresses[0].postalCode;
        const bCountry = getCountryByCode(res.body.addresses[0].country);
        const shCity = res.body.addresses[1].city;
        const shStreet = res.body.addresses[1].streetName;
        const shZipCode = res.body.addresses[1].postalCode;
        const shCountry = getCountryByCode(res.body.addresses[1].country);
        if (
          bCity &&
          bStreet &&
          shStreet &&
          shCity &&
          bZipCode &&
          shZipCode &&
          bCountry &&
          shCountry
        ) {
          setValue('billing_street', bStreet, {
            shouldValidate: true,
          });
          setValue('billing_city', bCity, {
            shouldValidate: true,
          });
          setValue('shipping_street', shStreet, {
            shouldValidate: true,
          });
          setValue('shipping_city', shCity, {
            shouldValidate: true,
          });
          setValue('billing_zipCode', bZipCode, {
            shouldValidate: true,
          });
          setValue('shipping_zipCode', shZipCode, {
            shouldValidate: true,
          });
          setValue('billing_country', bCountry, {
            shouldValidate: true,
          });
          setValue('shipping_country', shCountry, {
            shouldValidate: true,
          });
        }
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        throw new Error(`${err}`);
      });
  }, [service.apiRoot, setValue]);

  const onSubmit = (data: AddressesFormValues) => {
    console.log(data);
    /*  const billingAddressIndex = 0;
     const shippingAddressIndex = 1;
    const customerDraft = {
     
       addresses: [
         {
           country: getCountryCode(data.billing_country) ?? '',
           city: data.billing_city,
           streetName: data.billing_street,
           postalCode: data.billing_zipCode,
         },
         {
           country: getCountryCode(data.billing_country) ?? '',
           city: data.shipping_city,
           streetName: data.shipping_street,
           postalCode: data.shipping_zipCode,
         },
       ],
       defaultBillingAddress: data.useAsDefaultBillingAddress ? billingAddressIndex : undefined,
       defaultShippingAddress: data.useAsDefaultShippingAddress ? shippingAddressIndex : undefined,
       shippingAddresses: [shippingAddressIndex],
       billingAddresses: [billingAddressIndex],
     };
 
     console.log(customerDraft);*/
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2} width="100%">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            gap={1}
            sx={{
              width: {
                sm: '40%',
              },
              padding: {
                xs: '5%',
                sm: '0',
              },
            }}
          >
            <Typography component={'p'}>Your Shipping Address</Typography>
            <Controller
              name="shipping_country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={COUNTRY_LIST}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Shipping Country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'none',
                      }}
                      error={!!errors.shipping_country}
                      helperText={errors.shipping_country?.message || ' '}
                    />
                  )}
                  onChange={async (_, newValue) => {
                    field.onChange(newValue ?? '');
                    await trigger(`shipping_zipCode`);
                    await syncCountryFields(newValue);
                  }}
                  isOptionEqualToValue={(option, value) => option === value}
                />
              )}
            />
            <EditableTextField
              name="shipping_zipCode"
              control={control}
              errors={errors}
              label="shipping_zipCode"
              fieldName="Shipping Zip Code"
              nameToSync="billing_zipCode"
              callback={syncFields}
              dataTestId="registration-shipping-zip-code"
            />
            <EditableTextField
              name="shipping_street"
              control={control}
              errors={errors}
              label="shipping_street"
              fieldName="Shipping Street"
              nameToSync="billing_street"
              callback={syncFields}
              dataTestId="registration-shipping-street"
            />
            <EditableTextField
              name="shipping_city"
              control={control}
              errors={errors}
              label="shipping_city"
              fieldName="Shipping City"
              nameToSync="billing_city"
              callback={syncFields}
              dataTestId="registration-shipping-city"
            />

            <Stack direction="column">
              <Controller
                name="useAsDefaultShippingAddress"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={useAsDefaultShipping}
                        onChange={() => {
                          setUseAsDefaultShipping(!useAsDefaultShipping);
                          field.onChange(!useAsDefaultShipping);
                        }}
                      />
                    }
                    label="Use as default shipping address"
                  />
                )}
              />
              <Controller
                name="useAsBillingAddress"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={useAsBilling}
                        onChange={() => {
                          setUseAsBilling(!useAsBilling);
                          field.onChange(!useAsBilling);
                          setIsCleared(!false);
                        }}
                      />
                    }
                    label="Use as billing address"
                  />
                )}
              />
            </Stack>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            gap={1}
            sx={{
              width: {
                sm: '40%',
              },
              padding: {
                xs: '5%',
                sm: '0',
              },
            }}
          >
            <Typography component={'p'}>Your Billing Address</Typography>

            <Controller
              name="billing_country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={COUNTRY_LIST}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Billing Country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'none',
                      }}
                      error={!!errors.billing_country}
                      helperText={errors.billing_country?.message || ' '}
                    />
                  )}
                  onChange={async (_, newValue) => {
                    field.onChange(newValue ?? '');
                    if (!useAsBilling) {
                      await trigger(`billing_zipCode`);
                    }
                  }}
                  isOptionEqualToValue={(option, value) => option === value}
                  disabled={useAsBilling}
                />
              )}
            />
            <EditableTextField
              name="billing_zipCode"
              control={control}
              errors={errors}
              label="billing_zipCode"
              fieldName="Billing Zip Code"
              disabled={useAsBilling}
              dataTestId="registration-billing-zip-code"
            />

            <EditableTextField
              name="billing_street"
              control={control}
              errors={errors}
              label="billing_street"
              fieldName="Billing Street"
              disabled={useAsBilling}
              dataTestId="registration-billing-street"
            />

            <EditableTextField
              name="billing_city"
              control={control}
              errors={errors}
              label="billing_city"
              fieldName="Billing City"
              disabled={useAsBilling}
              dataTestId="registration-billing-city"
            />
            <Controller
              name="useAsDefaultBillingAddress"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={useAsDefaultBilling}
                      onChange={() => {
                        setUseAsDefaultBilling(!useAsDefaultBilling);
                        field.onChange(!useAsDefaultBilling);
                      }}
                    />
                  }
                  label="Use as default billing address"
                />
              )}
            />
            <Button
              type="submit"
              disabled={!isValid}
              variant="contained"
              color="secondary"
              sx={{
                textTransform: 'none',
                fontWeight: '600',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
              data-testid="registration_submit-button"
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
}
