export interface Filter {
  setPage(page: number): this;

  setQuantity(quantity: number): this;

  apply(): Map<string, any>;
}
