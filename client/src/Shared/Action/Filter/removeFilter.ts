import { Dispatch } from "react";
import { ActionProps } from "../ActionProps";
import { REMOVE_FILTER_ACTION } from "../../constants";
import { FilterProps } from "./FilterProps";

export const removeFilter = (dispatch: Dispatch<ActionProps<FilterProps>>) => {
  return (filter: FilterProps): void => {
    dispatch({ type: REMOVE_FILTER_ACTION, payload: filter });
  };
};