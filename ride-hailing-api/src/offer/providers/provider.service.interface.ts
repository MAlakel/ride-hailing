import { Offer } from "src/offer/offer.interface";

export interface IProviderService {
  getOffer(): Promise<Offer>;
}