import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';

import { ApiClientBuilder } from '../client/ApiClientBuilder';

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
    this.apiRoot = this.apiBuilder.getApiRoot({ username, password });

    return this.apiRoot
      .login()
      .post({
        body: {
          email: username,
          password: password,
          // TODO:
          // Add anonymous cart to be merged with the active customer cart, when we have cart functionality
          // anonymousCart: {
          //   typeId: 'cart',
          //   id: '<anonymous-cart-id>',
          // }
        },
      })
      .execute();
  }

  public async signUp(
    username: string,
    password: string,
  ): Promise<ClientResponse<CustomerSignInResult>> {
    this.apiRoot = this.apiBuilder.getApiRoot({ username, password });

    return this.apiRoot
      .me()
      .signup()
      .post({
        body: {
          email: username,
          password: password,
          // TODO: Add CustomerDraft fields when we have signup functionality
        },
      })
      .execute();
  }

  public signOut() {
    this.apiRoot = this.apiBuilder.getApiRoot();
  }
}
