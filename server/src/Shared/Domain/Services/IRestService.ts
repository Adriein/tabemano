export interface IRestService {
  post<Req>(request: Req): Promise<void>;

  get<Res>(): Promise<Res>;
}