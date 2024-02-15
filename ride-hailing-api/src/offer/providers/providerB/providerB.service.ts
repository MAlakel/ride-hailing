import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProviderBRepository } from './providerB.repository';
import { Offer } from '../../offer.interface';
import { ProviderBOffer } from './providerB.offer.interface';
import { IProviderService } from '../provider.service.interface';
import { MalformedOfferException } from '../../../common/exceptions/malformed-offer-exception';
import { ConfigService } from '@nestjs/config';
import { modifyPrice } from '../../../common/price-modifier';

@Injectable()
export class ProviderBService implements IProviderService {
  private readonly logger = new Logger(ProviderBService.name);

  constructor(private readonly providerBRepository: ProviderBRepository, private configService: ConfigService) { }

  async getOffer(): Promise<Offer> {
    this.logger.log('getting offer from provider B');
    const providerBData = this.providerBRepository.getOffer();
    if (!providerBData) {
      this.logger.error('No Offer Found');
      throw new NotFoundException('No Offer Found')
    }
    return this.transformOffer(providerBData);
  }

  private transformOffer(providerBData: ProviderBOffer): Offer {
    this.logger.log('normalizing provider B offer');
    if (!providerBData.pickup || !providerBData.driver) {
      this.logger.error('Missing pickup or driver details');
      throw new MalformedOfferException('Missing pickup or driver details');
    }
    const priceModifier = this.configService.get<string>('PRICE_MODIFIER');
    const price = modifyPrice(providerBData.fare.lowPrice, providerBData.fare.highPrice, priceModifier);
    return {
      offer_id: providerBData.offer_id,
      provider: 'ProviderB',
      vehicle: providerBData.vehicle.type,
      estimated_pickup_time: providerBData.pickup.estimated_pickup,
      estimated_arrival_time: providerBData.destination.estimated_arrival,
      fare_estimate: {
        currency: providerBData.fare.currency,
        amount: price,
        currency_symbol: providerBData.fare.currency_symbol,
      },
      driver: {
        name: providerBData.driver.name,
        rating: providerBData.driver.rating,
        vehicle: {
          make: providerBData.vehicle.make,
          model: providerBData.vehicle.model,
          color: providerBData.vehicle.color,
          license_plate: providerBData.vehicle.license_plate,
        },
      },
      pickup: {
        latitude: providerBData.pickup.latitude,
        longitude: providerBData.pickup.longitude,
        address: providerBData.pickup.location,
      },
      destination: {
        latitude: providerBData.destination?.latitude,
        longitude: providerBData.destination?.longitude,
        address: providerBData.destination?.location,
      },
    };
  }
}