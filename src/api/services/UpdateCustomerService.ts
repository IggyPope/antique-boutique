import { ClientResponse, Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';

import { ApiClientBuilder } from '../client/ApiClientBuilder';

export class UpdateCustomerService {
  private static instance: UpdateCustomerService;

  private readonly apiBuilder = new ApiClientBuilder();

  public apiRoot = this.apiBuilder.getApiRoot();

  private constructor() {}

  public static getInstance(): UpdateCustomerService {
    if (!UpdateCustomerService.instance) {
      UpdateCustomerService.instance = new UpdateCustomerService();
    }
    return UpdateCustomerService.instance;
  }

  public async updateCustomer(payload: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    this.apiRoot = this.apiBuilder.getApiRoot();

    // Assuming the SDK provides a way to update customer details, replace 'updateCustomer' with the actual method
    return this.apiRoot
      .me()
      .post({
        body: payload,
      })
      .execute()

      .catch((error) => {
        console.error('Error updating customer personal info:', error);
        throw error;
      });
  }
}
