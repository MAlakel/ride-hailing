import { Injectable } from '@nestjs/common';
import { ProviderAOffer } from './providerA.offer.interface';
import providerAData from '../../../sample/providerA-offer-sample.json';

@Injectable()
export class ProviderARepository {
  getOffer(): ProviderAOffer {
    return providerAData;
  }
}