import { Invoice } from "Invoicing/Invoice/Domain/Entity/Invoice";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface InvoiceRepository extends IRepository<Invoice> {}