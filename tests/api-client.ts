import { APIRequestContext, APIResponse } from 'playwright';
import { LoginDto } from './dto/login-dto';
import { StatusCodes } from 'http-status-codes';
import { expect } from '@playwright/test';
import { OrderDto } from './dto/order-dto';

const serviceURL = 'https://backend.tallinn-learning.ee/';
const loginPath = 'login/student';
const orderPath = 'orders';
const deletePath = 'orders';
const getPath = 'orders';

export class ApiClient {
  static instance: ApiClient;
  private request: APIRequestContext;
  private jwt: string = '';

  private constructor(request: APIRequestContext) {
    this.request = request;
  }

  public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(request);
      await ApiClient.instance.requestJwt();
    } else if (ApiClient.instance.request !== request) {
      ApiClient.instance.request = request;
      await ApiClient.instance.requestJwt();
    }
    return ApiClient.instance;
  }

  private async requestJwt(): Promise<void> {
    console.log('Requesting JWT...');
    const authResponse = await this.request.post(`${serviceURL}${loginPath}`, {
      data: LoginDto.createLoginWithCorrectData(),
    });

    if (authResponse.status() !== StatusCodes.OK) {
      console.log('Authorization failed');
      throw new Error(`Request failed with status ${authResponse.status()}`);
    }

    this.jwt = await authResponse.text();
    console.log('jwt received:');
    console.log(this.jwt);
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    console.log('Creating order...');
    const response = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
    console.log('Order response: ', response);

    expect(response.status()).toBe(StatusCodes.OK);
    const responseBody = await response.json();
    console.log('Order created: ');
    console.log(responseBody);

    return responseBody.id;
  }
  async deleteOrder(orderId: number): Promise<APIResponse> {
    console.log('Delete order...');
    const response = await this.request.delete(`${serviceURL}${deletePath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
    console.log('Delete response: ', response);

    const responseBody = await response.json();
    console.log('Order deleted: ');
    console.log(responseBody);
    return response;
  }

  async getOrder(orderId: number): Promise<APIResponse> {
    console.log('Get order...');
    const response = await this.request.get(`${serviceURL}${getPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    });
    console.log('Get response: ', response);

    const responseBody = await response.text();
    console.log('Get order: ');
    console.log(responseBody);
    return response;
  }
}
