import { Test, TestingModule } from '@nestjs/testing';
import { ProviderBService } from './providerB.service';
import { NotFoundException } from '@nestjs/common';
import { MalformedOfferException } from '../../../common/exceptions/malformed-offer-exception';
import { ProviderBOffer } from './providerB.offer.interface';
import { ProviderBRepository } from './providerB.repository';
import { ConfigService } from '@nestjs/config';

class MockProviderBRepository {
  getOffer(): any {
    // Mock implementation for getOffer method
    return {
      offer_id: '1',
      company: 'RideShare Co.',
      fare: {
        currency: 'USD',
        lowPrice: 25.00,
        highPrice: 25.00,
        currency_symbol: '$',
      },
      vehicle: {
        type: 'SUV',
        model: 'Highlander',
        make: 'Toyota',
        color: 'White',
        license_plate: 'ABC123'
      },
      driver: {
        name: 'John Doe',
        rating: 4.8,
        phone: "+1234567890"
      },
      pickup: {
        latitude: 40.7128,
        longitude: -74.0060,
        location: '123 Main St, Anytown',
        estimated_pickup: '2024-02-14T14:00:00',
      },
      destination: {
        latitude: 40.7128,
        longitude: -74.0060,
        location: '456 Elm St, Anytown',
        estimated_arrival: '2024-02-14T15:00:00',
      },
    } as ProviderBOffer;
  }
}

describe('ProviderBService', () => {
  let service: ProviderBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProviderBService,
        {
          provide: ProviderBRepository,
          useClass: MockProviderBRepository, // Use the mock repository
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'PRICE_MODIFIER') {
                return 'MIN';
              }
              return null;
            })
          },
        },
      ],
    }).compile();

    service = module.get<ProviderBService>(ProviderBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOffer', () => {
    it('should return an offer from Provider B', async () => {
      const offer = await service.getOffer();
      expect(offer).toBeDefined();
      expect(offer.offer_id).toBe('1');
      expect(offer.provider).toBe('ProviderB');
      // Add more assertions for offer fields
    });

    it('should throw NotFoundException when offer is not found', async () => {
      jest.spyOn(MockProviderBRepository.prototype, 'getOffer').mockReturnValueOnce(undefined);

      await expect(service.getOffer()).rejects.toThrowError(NotFoundException);
    });
  });

  describe('transformOffer', () => {
    it('should transform provider B offer data into standard offer format', () => {
      const providerBData = {
        "offer_id": "987654321",
        "company": "RideShare Co.",
        "vehicle": {
          "type": "SUV",
          "make": "Toyota",
          "model": "Highlander",
          "color": "White",
          "license_plate": "XYZ456"
        },
        "driver": {
          "name": "Jane Smith",
          "rating": 4.9,
          "phone": "+1234567890"
        },
        "pickup": {
          "location": "123 Main St, Anytown",
          "latitude": 40.7128,
          "longitude": -74.0060,
          "estimated_pickup": "2024-02-14T15:00:00"
        },
        "destination": {
          "location": "456 Elm St, Anytown",
          "latitude": 40.7128,
          "longitude": -74.0060,
          "estimated_arrival": "2024-02-14T15:45:00"
        },
        "fare": {
          "currency": "USD",
          "lowPrice": 20.00,
          "highPrice": 30.00,
          "currency_symbol": "$"
        }
      };

      const transformedOffer = service['transformOffer'](providerBData);
      expect(transformedOffer).toBeDefined();
      expect(transformedOffer.vehicle).toEqual(providerBData.vehicle.type);
      expect(transformedOffer.provider).toBe('ProviderB');
      // Add more assertions for transformed offer fields
    });

    it('should throw MalformedOfferException if required fields are missing', () => {
      const providerBData = {
        "offer_id": "987654321",
        "company": "RideShare Co.",
        "vehicle": {
          "type": "SUV",
          "make": "Toyota",
          "model": "Highlander",
          "color": "White",
          "license_plate": "XYZ456"
        },
        "pickup": {
          "location": "123 Main St, Anytown",
          "latitude": 40.7128,
          "longitude": -74.0060,
          "estimated_pickup": "2024-02-14T15:00:00"
        },
        "destination": {
          "location": "456 Elm St, Anytown",
          "latitude": 40.7128,
          "longitude": -74.0060,
          "estimated_arrival": "2024-02-14T15:45:00"
        },
        "fare": {
          "currency": "USD",
          "lowPrice": 20.00,
          "highPrice": 30.00,
          "currency_symbol": "$"
        }
      };

      expect(() => service['transformOffer'](providerBData as ProviderBOffer)).toThrow(MalformedOfferException);
    });
  });
});