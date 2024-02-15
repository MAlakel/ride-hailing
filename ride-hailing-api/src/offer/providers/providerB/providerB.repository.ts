import { Injectable } from '@nestjs/common';
import { ProviderBOffer } from './providerB.offer.interface';
import providerBData from '../../../sample/providerB-offer-sample.json';

@Injectable()
export class ProviderBRepository {
  getOffer(): ProviderBOffer {
    return providerBData;
  }
}