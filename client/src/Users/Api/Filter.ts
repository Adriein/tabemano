import { ApiService } from "../../Shared/Services/ApiService";
import { Filter } from "../Models/Filter";

const api = ApiService.instance();

export const FilterCall = {
  async getClientTableFilters(): Promise<Filter[]> {
    const response = await api.post<{ data: Filter[] }, { entities: string[] }>(
      '/filter',
      { entities: [ 'user', 'config', 'pricing', 'subscription' ] }
    );

    return response.data;
  }
}