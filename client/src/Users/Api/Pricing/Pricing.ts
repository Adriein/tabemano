import { ApiService } from "../../../Shared/Services/ApiService";
import { PricingApiResponse } from "./PricingApiResponse";

const api = ApiService.instance();

export const PricingApiCall = {
  async getPricingList(): Promise<any> {
    const response = await api.get<PricingApiResponse>('/pricing');

    return response.data;
  }
}