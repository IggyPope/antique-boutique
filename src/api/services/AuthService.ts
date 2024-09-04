import {
  type CustomerDraft,
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

import { ApiClientBuilder } from '@/api/client/ApiClientBuilder';

export class AuthService {
  private static instance: AuthService;

  private readonly apiBuilder = new ApiClientBuilder();

  public apiRoot = this.apiBuilder.getApiRoot();

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async signIn(
    username: string,
    password: string,
  ): Promise<ClientResponse<CustomerSignInResult>> {
    return this.apiRoot
      .me()
      .login()
      .post({
        body: {
          email: username,
          password: password,
          activeCartSignInMode: 'MergeWithExistingCustomerCart',
        },
      })
      .execute()
      .then((res) => {
        this.apiRoot = this.apiBuilder.getApiRoot({ username, password });

        return res;
      });
  }

  public async signUp(
    customerDraft: CustomerDraft & { password: string },
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const response = await this.apiRoot
      .me()
      .signup()
      .post({
        body: {
          ...customerDraft,
        },
      })
      .execute()
      .then((res) => {
        this.apiRoot = this.apiBuilder.getApiRoot({
          username: customerDraft.email,
          password: customerDraft.password,
        });

        return res;
      });

    return response;
  }

  public signOut() {
    this.apiRoot = this.apiBuilder.getApiRoot();

    void this.apiRoot.get().execute();
  }
}
