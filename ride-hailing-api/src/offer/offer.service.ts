import { Inject, Injectable, Logger } from '@nestjs/common';
import { Offer } from './offer.interface';
import { IProviderService } from './providers/provider.service.interface';

@Injectable()
export class OfferService {
  private readonly logger = new Logger(OfferService.name);

  constructor(@Inject('Providers') private providers: Array<IProviderService>
  ) { }

  async getOffers(): Promise<Offer[]> {
    this.logger.log('getting all offers');
    const results = await Promise.allSettled(
      this.providers.map(async provider => {
        try {
          return await provider.getOffer();
        } catch (err) {
          // this.logger.error(err);
          throw err;
        }
      })
    );

    let fulfilledResults = results.filter(res => res.status === 'fulfilled') as PromiseFulfilledResult<Offer>[];

    return fulfilledResults.map(res => res.value);
  }
}