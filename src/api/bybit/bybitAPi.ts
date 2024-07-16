import {
  RestClientV5,
  CategoryV5,
  OrderParamsV5,
  AmendOrderParamsV5,
  GetAccountOrdersParamsV5,
  GetInstrumentsInfoParamsV5,
  GetTickersParamsV5,
  SetTradingStopParamsV5,
  CancelAllOrdersParamsV5,
  APIResponseV3,
  GetAllCoinsBalanceParamsV5,
  MovePositionParamsV5,
  CreateSubMemberParamsV5,
  CreateSubApiKeyParamsV5,
  GetWalletBalanceParamsV5,
} from "bybit-api";
import { ErrorService } from "../../utils";

export class BybitWrapper {
  private client: RestClientV5;

  constructor(apiKey: string, apiSecret: string, testnet = false) {
    this.client = new RestClientV5({
      secret: apiSecret,
      key: apiKey,
      testnet,
      parse_exceptions: true,
    });
  }

  private async handleResponse<T>(
    response: APIResponseV3<T>
  ): Promise<T | null> {
    if (response.retCode !== 0) {
      ErrorService.handleApiError(new Error(response.retMsg));
      return null;
    }
    return response.result;
  }

  async createSubUID(params: CreateSubMemberParamsV5): Promise<any> {
    try {
      const response = await this.client.createSubMember(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async createSubUIDAPIKey(params: CreateSubApiKeyParamsV5): Promise<any> {
    try {
      const response = await this.client.createSubUIDAPIKey(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getAllowedDepositCoinInfo(): Promise<any> {
    try {
      const response = await this.client.getAllowedDepositCoinInfo();
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getSubDepositAddress(
    subUID: string,
    chainType: string,
    coin: string
  ): Promise<any> {
    try {
      const response = await this.client.getSubDepositAddress(
        coin,
        chainType,
        subUID
      );
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getSubDepositRecords(subUID: string, coin: string): Promise<any> {
    try {
      const response = await this.client.getSubAccountDepositRecords({
        subMemberId: subUID,
        coin,
      });
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getWalletBalance(params: GetWalletBalanceParamsV5): Promise<any> {
    try {
      const response = await this.client.getWalletBalance(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getAllCoinsBalance(params: GetAllCoinsBalanceParamsV5): Promise<any> {
    try {
      const response = await this.client.getAllCoinsBalance(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getInstrumentsInfo(params: GetInstrumentsInfoParamsV5): Promise<any> {
    try {
      const response = await this.client.getInstrumentsInfo(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getTickers(params: GetTickersParamsV5<CategoryV5>): Promise<any> {
    try {
      let response: any;

      if (params.category === 'linear' || params.category === 'inverse') {
        response = await this.client.getTickers(params as GetTickersParamsV5<'linear' | 'inverse'>);
      } else if (params.category === 'option') {
        response = await this.client.getTickers(params as GetTickersParamsV5<'option'>);
      } else if (params.category === 'spot') {
        response = await this.client.getTickers(params as GetTickersParamsV5<'spot'>);
      }

      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }
  
  async placeOrder(params: OrderParamsV5): Promise<any> {
    try {
      const response = await this.client.submitOrder(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async amendOrder(params: AmendOrderParamsV5): Promise<any> {
    try {
      const response = await this.client.amendOrder(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async cancelOrder(params: {
    orderId?: string;
    symbol: string;
    category: CategoryV5;
  }): Promise<any> {
    try {
      const response = await this.client.cancelOrder(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getOrderHistory(params: GetAccountOrdersParamsV5): Promise<any> {
    try {
      const response = await this.client.getHistoricOrders(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getOpenClosedOrders(params: GetAccountOrdersParamsV5): Promise<any> {
    try {
      const response = await this.client.getActiveOrders(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getPositionInfo(params: {
    category: CategoryV5;
    symbol?: string;
  }): Promise<any> {
    try {
      const response = await this.client.getPositionInfo(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async setTradingStop(params: SetTradingStopParamsV5): Promise<any> {
    try {
      const response = await this.client.setTradingStop(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async getClosedPnl(params: {
    symbol: string;
    category: CategoryV5;
  }): Promise<any> {
    try {
      const response = await this.client.getClosedPnL(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async cancelAllOrders(params: CancelAllOrdersParamsV5): Promise<any> {
    try {
      const response = await this.client.cancelAllOrders(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }

  async movePosition(params: MovePositionParamsV5): Promise<any> {
    try {
      const response = await this.client.movePosition(params);
      return this.handleResponse(response);
    } catch (error) {
      ErrorService.handleApiError(error);
      return null;
    }
  }
}
