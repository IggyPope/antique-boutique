import { ClientResponse, Customer } from '@commercetools/platform-sdk';

import { ApiClientBuilder } from '../client/ApiClientBuilder';

export class GetUserDetailsService {
  private static instance: GetUserDetailsService;

  private readonly apiBuilder = new ApiClientBuilder();

  public apiRoot = this.apiBuilder.getApiRoot();

  private constructor() {}

  public static getInstance(): GetUserDetailsService {
    if (!GetUserDetailsService.instance) {
      GetUserDetailsService.instance = new GetUserDetailsService();
    }
    return GetUserDetailsService.instance;
  }

  public async getUserDetails(): Promise<ClientResponse<Customer>> {
    this.apiRoot = this.apiBuilder.getApiRoot();

    return this.apiRoot
      .me()
      .get()
      .execute()
      .then((response) => {
        const customerData = response;
        return customerData;
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        throw error;
      });
  }
}
