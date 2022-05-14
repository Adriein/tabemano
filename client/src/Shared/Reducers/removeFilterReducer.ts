import { ActionProps } from "../Action/ActionProps";
import { FilterService } from "../Services/FilterService";
import { FilterProps } from "../Action/Filter/FilterProps";

export const removeFilterReducer = <T extends FilterProps, S extends { filters: FilterProps[] }>(
  state: S,
  action: ActionProps<T>
): S => {
  const filterToRemove = action.payload ?? {} as FilterProps;
  const filterService = new FilterService<FilterProps>(state.filters);
  
  return {
    ...state,
    filters: [ ...filterService.remove(filterToRemove) ]
  };
}