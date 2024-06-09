import { ClientResponse, Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';

import { ApiClientBuilder } from '@/api/client/ApiClientBuilder';

export class ChangeUserPasswordService {
  private static instance: ChangeUserPasswordService;

  private readonly apiBuilder = new ApiClientBuilder();

  public apiRoot = this.apiBuilder.getApiRoot();

  private constructor() {}

  public static getInstance(): ChangeUserPasswordService {
    if (!ChangeUserPasswordService.instance) {
      ChangeUserPasswordService.instance = new ChangeUserPasswordService();
    }
    return ChangeUserPasswordService.instance;
  }

  public async changePassword(
    payload: MyCustomerChangePassword,
  ): Promise<ClientResponse<Customer>> {
    this.apiRoot = this.apiBuilder.getApiRoot();

    return this.apiRoot
      .me()
      .password()
      .post({
        body: payload,
      })
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
