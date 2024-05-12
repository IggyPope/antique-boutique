import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type Client,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const {
  VITE_CTP_AUTH_URL,
  VITE_CTP_API_URL,
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
} = import.meta.env;

export class ApiClientBuilder {
  private readonly authUrl: string;

  private readonly apiUrl: string;

  private readonly projectKey: string;

  private readonly clientID: string;

  private readonly clientSecret: string;

  constructor() {
    if (
      !VITE_CTP_AUTH_URL ||
      !VITE_CTP_API_URL ||
      !VITE_CTP_PROJECT_KEY ||
      !VITE_CTP_CLIENT_ID ||
      !VITE_CTP_CLIENT_SECRET
    ) {
      throw new Error('Missing environment variables.');
    }

    this.authUrl = VITE_CTP_AUTH_URL;
    this.apiUrl = VITE_CTP_API_URL;
    this.projectKey = VITE_CTP_PROJECT_KEY;
    this.clientID = VITE_CTP_CLIENT_ID;
    this.clientSecret = VITE_CTP_CLIENT_SECRET;
  }

  getApiRoot(credentials?: { username: string; password: string }): ByProjectKeyRequestBuilder {
    return createApiBuilderFromCtpClient(this.getApiClient(credentials)).withProjectKey({
      projectKey: this.projectKey,
    });
  }

  private getApiClient(credentials?: { username: string; password: string }): Client {
    if (credentials) {
      return this.getPasswordFlowClient(credentials.username, credentials.password);
    }
    return this.getAnonymousFlowClient();
  }

  private getAnonymousFlowClient(): Client {
    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withHttpMiddleware(this.getHttpMiddlewareOptions())
      .withAnonymousSessionFlow(this.getAnonymousAuthMiddlewareOptions())
      .build();
  }

  private getPasswordFlowClient(username: string, password: string): Client {
    return new ClientBuilder()
      .withProjectKey(this.projectKey)
      .withHttpMiddleware(this.getHttpMiddlewareOptions())
      .withPasswordFlow(this.getPasswordFlowMiddlewareOptions(username, password))
      .build();
  }

  private getHttpMiddlewareOptions(): HttpMiddlewareOptions {
    return {
      host: this.apiUrl,
    };
  }

  private getAnonymousAuthMiddlewareOptions(): AnonymousAuthMiddlewareOptions {
    return {
      host: this.authUrl,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientID,
        clientSecret: this.clientSecret,
      },
    };
  }

  public getPasswordFlowMiddlewareOptions(
    username: string,
    password: string,
  ): PasswordAuthMiddlewareOptions {
    return {
      host: this.authUrl,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientID,
        clientSecret: this.clientSecret,
        user: {
          username,
          password,
        },
      },
    };
  }
}