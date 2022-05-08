import { ClientList } from "../../Models/ClientList";


export interface FetchClientListResponse {
  data: ClientList[],
  metadata: { page: number, quantity: number }
}