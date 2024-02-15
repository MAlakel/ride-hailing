import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProviderCRepository } from './providerC.repository';
import { Offer } from '../../offer.interface';
import { ProviderCOffer } from './providerC.offer.interface';
import { IProviderService } from '../provider.service.interface';
import { MalformedOfferException } from '../../../common/exceptions/malformed-offer-exception';

@Injectable()
export class ProviderCService implements IProviderService {
  private readonly logger = new Logger(ProviderCService.name);

  constructor(private readonly providerCRepository: ProviderCRepository) { }

  async getOffer(): Promise<Offer> {
    this.logger.log('getting offer from provider C');
    const providerCData = this.providerCRepository.getOffer();
    if (!providerCData) {
      this.logger.error('No Offer Found');
      throw new NotFoundException('No Offer Found')
    }
    return this.transformOffer(providerCData);
  }

  private transformOffer(providerCData: ProviderCOffer): Offer {
    this.logger.log('normalizing provider C offer');
    if (!providerCData.pickup || !providerCData.driver) {
      this.logger.error('Missing pickup or driver details');
      throw new MalformedOfferException('Missing pickup or driver details');
    }
    return {
      offer_id: providerCData.offer_id,
      provider: 'ProviderC',
      vehicle: providerCData.vehicle.type,
      estimated_pickup_time: providerCData.pickup.estimated_pickup,
      estimated_arrival_time: providerCData.destination.estimated_arrival,
      fare_estimate: {
        currency: providerCData.fare.currency,
        amount: providerCData.fare.lowPrice,
        currency_symbol: providerCData.fare.currency_symbol,
      },
      driver: {
        name: providerCData.driver.name,
        rating: providerCData.driver.rating,
        vehicle: {
          make: providerCData.vehicle.make,
          model: providerCData.vehicle.model,
          color: providerCData.vehicle.color,
          license_plate: providerCData.vehicle.license_plate,
        },
      },
      pickup: {
        latitude: providerCData.pickup.latitude,
        longitude: providerCData.pickup.longitude,
        address: providerCData.pickup.location,
      },
      destination: {
        latitude: providerCData.destination?.latitude,
        longitude: providerCData.destination?.longitude,
        address: providerCData.destination?.location,
      },
    };
  }
}