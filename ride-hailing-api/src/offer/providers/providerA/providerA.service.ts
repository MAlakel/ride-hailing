import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProviderARepository } from './providerA.repository';
import { Offer } from '../../offer.interface';
import { ProviderAOffer } from './providerA.offer.interface';
import { IProviderService } from '../provider.service.interface';
import { MalformedOfferException } from '../../../common/exceptions/malformed-offer-exception';

@Injectable()
export class ProviderAService implements IProviderService {
  private readonly logger = new Logger(ProviderAService.name);

  constructor(private readonly providerARepository: ProviderARepository) { }

  async getOffer(): Promise<Offer> {
    this.logger.log('getting offer from provider A');
    const providerAData = this.providerARepository.getOffer();
    if (!providerAData) {
      this.logger.error('No Offer Found');
      throw new NotFoundException('No Offer Found')
    }
    return this.transformOffer(providerAData);
  }

  private transformOffer(providerAData: ProviderAOffer): Offer {
    this.logger.log('normalizing provider A offer');
    // Basic checks for mandatory fields, can be extended and customized
    if (!providerAData.pickup_location || !providerAData.driver) {
      this.logger.error('Missing pickup or driver details');
      throw new MalformedOfferException('Missing pickup or driver details');
    }
    return {
      offer_id: providerAData.offer_id,
      provider: 'ProviderA',
      vehicle: providerAData.vehicle_type,
      estimated_pickup_time: providerAData.estimated_pickup_time,
      estimated_arrival_time: providerAData.estimated_arrival_time,
      fare_estimate: {
        currency: providerAData.fare_estimate.currency,
        amount: providerAData.fare_estimate.amount,
        currency_symbol: providerAData.fare_estimate.currency_symbol,
      },
      driver: {
        name: providerAData.driver.name,
        rating: providerAData.driver.rating,
        vehicle: {
          make: providerAData.driver.vehicle_details.make,
          model: providerAData.driver.vehicle_details.model,
          color: providerAData.driver.vehicle_details.color,
          license_plate: providerAData.driver.vehicle_details.license_plate,
        },
      },
      pickup: {
        latitude: providerAData.pickup_location.latitude,
        longitude: providerAData.pickup_location.longitude,
        address: providerAData.pickup_location.address,
      },
      destination: {
        latitude: providerAData.destination_location?.latitude,
        longitude: providerAData.destination_location?.longitude,
        address: providerAData.destination_location?.address,
      },
    };
  }
}