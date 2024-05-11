import { countriesList } from './countries';

export function getCountryByCode(countryCode: string | undefined): string | null {
  const countryCodeInLowerCase = countryCode?.toLowerCase();
  return countriesList
    .map((country): string | null => {
      return country.code.toLowerCase() === countryCodeInLowerCase ? country.label : null;
    })
    .join('');
}

export function getCountryCode(countryName: string | undefined): string | null {
  const countryNameInLowerCase = countryName?.toLowerCase();
  return countriesList
    .map((country): string | null => {
      return country.label.toLowerCase() === countryNameInLowerCase ? country.code : null;
    })
    .join('');
}
