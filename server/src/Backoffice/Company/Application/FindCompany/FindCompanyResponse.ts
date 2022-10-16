export class FindCompanyResponse {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly fiscalId: string,
    readonly address: string,
    readonly phone: number,
    readonly type: string,
    readonly country: string,
  ) {}
}