import { ApiClientBuilder } from '../client/ApiClientBuilder';

export class ProductService {
  private static instance: ProductService;

  private readonly apiBuilder = new ApiClientBuilder();

  public apiRoot = this.apiBuilder.getApiRoot();

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  public async getProductById() {
    this.apiRoot = this.apiBuilder.getApiRoot();

    return this.apiRoot
      .graphql()
      .post({
        body: {
          query:
            'query query_1($productId: String){ product(id:$productId){ key masterData { current { name(locale: "en-US") description(locale: "en-US") slug(locale: "en-US") masterVariant { images { url } }  } } } }',
          variables: {
            productId: 'c2859cfc-8953-4aed-a97e-3949a27c2e04',
          },
        },
      })
      .execute();
  }
}
