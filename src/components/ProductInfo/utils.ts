import { Attribute } from '@commercetools/platform-sdk';

export const isInStock = (attributes: Attribute[] | undefined): boolean => {
  return (
    attributes?.some(
      (attr) =>
        (attr.name === 'In-Stock' && Array.isArray(attr.value) && attr.value.includes(true)) ||
        (attr.name === 'Availability' && Array.isArray(attr.value) && attr.value.includes(true)),
    ) ?? false
  );
};
