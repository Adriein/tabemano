import { Dispatch } from "react";
import { ApiService } from "../../../Shared/Services/ApiService";
import { ActionProps } from "../../../Shared/Action/ActionProps";
import { FetchClientListResponse } from "./FetchClientListResponse";
import { FetchClientListRequest } from "./FetchClientListRequest";
import { FETCH_CLIENT_LIST_ACTION } from "../../constants";
import { ASYNC_ACTION } from "../../../Shared/constants";
import { FetchClientListPayload } from "../../types";

export const fetchClientList = (dispatch: Dispatch<ActionProps<FetchClientListPayload>>) => {
  return async ({ quantity, page, filters }: FetchClientListRequest): Promise<void> => {
    dispatch({ type: ASYNC_ACTION });
    const api = ApiService.instance();

    const response = await api.post<FetchClientListResponse, FetchClientListRequest>(
      '/clients',
      { quantity, page, filters }
    );

    dispatch({
      type: FETCH_CLIENT_LIST_ACTION,
      payload: { clientList: response.data, totalUsers: response.metadata.quantity }
    });
  };
};
