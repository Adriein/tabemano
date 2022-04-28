export class FilterDto {
  constructor(
    public entity: string,
    public field: string,
    public operation: string,
    public value: string
  ) {}
}