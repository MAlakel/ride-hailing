import { Test, TestingModule } from '@nestjs/testing';
import { ProviderAService } from './providerA.service';
// import { MockProviderARepository } from './mocks/MockProviderARepository';
import { NotFoundException } from '@nestjs/common';
import { MalformedOfferException } from '../../../common/exceptions/malformed-offer-exception';
import { ProviderAOffer } from './providerA.offer.interface';
import { ProviderARepository } from './providerA.repository';

class MockProviderARepository {
  getOffer(): any {
    // Mock implementation for getOffer method
    return {
      offer_id: '1',
      vehicle_type: 'SUV',
      estimated_pickup_time: '2024-02-14T14:00:00',
      estimated_arrival_time: '2024-02-14T15:00:00',
      fare_estimate: {
        currency: 'USD',
        amount: 25.00,
        currency_symbol: '$',
      },
      driver: {
        name: 'John Doe',
        rating: 4.8,
        vehicle_details: {
          make: 'Toyota',
          model: 'Highlander',
          color: 'White',
          license_plate: 'ABC123',
        },
      },
      pickup_location: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: '123 Main St, Anytown',
      },
      destination_location: {
        latitude: 40.7128,
        longitude: -74.0060,
        address: '456 Elm St, Anytown',
      },
    };
  }
}

describe('ProviderAService', () => {
  let service: ProviderAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderAService,
        {
          provide: ProviderARepository,
          useClass: MockProviderARepository, // Use the mock repository
        },
      ],
    }).compile();

    service = module.get<ProviderAService>(ProviderAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOffer', () => {
    it('should return an offer from Provider A', async () => {
      const offer = await service.getOffer();
      expect(offer).toBeDefined();
      expect(offer.offer_id).toBe('1');
      expect(offer.provider).toBe('ProviderA');
      // Add more assertions for offer fields
    });

    it('should throw NotFoundException when offer is not found', async () => {
      jest.spyOn(MockProviderARepository.prototype, 'getOffer').mockReturnValueOnce(undefined);

      await expect(service.getOffer()).rejects.toThrowError(NotFoundException);
    });
  });

  describe('transformOffer', () => {
    it('should transform provider A offer data into standard offer format', () => {
      const providerAData = {
        "offer_id": "123456789",
        "provider": "RideHail Inc.",
        "vehicle_type": "Sedan",
        "estimated_pickup_time": "2024-02-14T15:00:00",
        "estimated_arrival_time": "2024-02-14T15:40:00",
        "fare_estimate": {
          "currency": "USD",
          "amount": 15.50,
          "currency_symbol": "$"
        },
        "driver": {
          "name": "John Doe",
          "rating": 4.8,
          "vehicle_details": {
            "make": "Toyota",
            "model": "Camry",
            "color": "Black",
            "license_plate": "ABC123"
          }
        },
        "pickup_location": {
          "latitude": 40.7128,
          "longitude": -74.0060,
          "address": "123 Main St, Anytown"
        },
        "destination_location": {
          "latitude": 40.7128,
          "longitude": -74.0060,
          "address": "456 Elm St, Anytown"
        }
      };

      const transformedOffer = service['transformOffer'](providerAData);
      expect(transformedOffer).toBeDefined();
      expect(transformedOffer.vehicle).toEqual(providerAData.vehicle_type);
      expect(transformedOffer.provider).toBe('ProviderA');
      // Add more assertions for transformed offer fields
    });

    it('should throw MalformedOfferException if required fields are missing', () => {
      const providerAData = {
        "offer_id": "123456789",
        "provider": "RideHail Inc.",
        "vehicle_type": "Sedan",
        "estimated_pickup_time": "2024-02-14T15:00:00",
        "estimated_arrival_time": "2024-02-14T15:40:00",
        "fare_estimate": {
          "currency": "USD",
          "amount": 15.50,
          "currency_symbol": "$"
        },
        "driver": {
          "name": "John Doe",
          "rating": 4.8,
          "vehicle_details": {
            "make": "Toyota",
            "model": "Camry",
            "color": "Black",
            "license_plate": "ABC123"
          }
        },
        "destination_location": {
          "latitude": 40.7128,
          "longitude": -74.0060,
          "address": "456 Elm St, Anytown"
        }
      };

      expect(() => service['transformOffer'](providerAData as ProviderAOffer)).toThrow(MalformedOfferException);
    });
  });
});