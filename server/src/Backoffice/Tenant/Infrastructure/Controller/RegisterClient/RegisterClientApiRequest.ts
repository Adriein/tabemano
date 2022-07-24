export interface RegisterClientApiRequest {
  name: string;
  email: string;
  pricingId: string;
  roleId: string;
  currentUser: {
    id: string;
  }
}