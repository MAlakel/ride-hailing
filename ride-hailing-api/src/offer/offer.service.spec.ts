import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from './offer.service';
import { Offer } from 'src/offer/offer.interface';
import { IProviderService } from './providers/provider.service.interface';

class MockProviderService implements IProviderService {
  async getOffer(): Promise<Offer> {
    // Mock implementation for getOffer method
    return {
      "offer_id": "123456789",
      "provider": "Provider",
      "vehicle": "Sedan",
      "estimated_pickup_time": "2024-02-14T15:00:00",
      "estimated_arrival_time": "2024-02-14T15:40:00",
      "fare_estimate": {
        "currency": "USD",
        "amount": 15.5,
        "currency_symbol": "$"
      },
      "driver": {
        "name": "John Doe",
        "rating": 4.8,
        "vehicle": {
          "make": "Toyota",
          "model": "Camry",
          "color": "Black",
          "license_plate": "ABC123"
        }
      },
      "pickup": {
        "latitude": 40.7128,
        "longitude": -74.006,
        "address": "123 Main St, Anytown"
      },
      "destination": {
        "latitude": 40.7128,
        "longitude": -74.006,
        "address": "456 Elm St, Anytown"
      }
    };
  }
}

class MockSecondProviderService implements IProviderService {
  async getOffer(): Promise<Offer> {
    return {
      "offer_id": "123456789",
      "provider": "Provider2",
      "vehicle": "Sedan",
      "estimated_pickup_time": "2024-02-14T15:00:00",
      "estimated_arrival_time": "2024-02-14T15:40:00",
      "fare_estimate": {
        "currency": "USD",
        "amount": 15.5,
        "currency_symbol": "$"
      },
      "driver": {
        "name": "John Doe",
        "rating": 4.8,
        "vehicle": {
          "make": "Toyota",
          "model": "Camry",
          "color": "Black",
          "license_plate": "ABC123"
        }
      },
      "pickup": {
        "latitude": 40.7128,
        "longitude": -74.006,
        "address": "123 Main St, Anytown"
      },
      "destination": {
        "latitude": 40.7128,
        "longitude": -74.006,
        "address": "456 Elm St, Anytown"
      }
    };
  }
}

const Providers = [new MockProviderService(), new MockSecondProviderService(), new MockProviderService()];

describe('OfferService', () => {
  let service: OfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferService,
        {
          provide: 'Providers', // Injected array of provider services
          useValue: Providers, // Use the mock provider service
        },
      ],
    }).compile();

    service = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOffers', () => {
    it('should return an array of offers from all providers', async () => {
      const offers = await service.getOffers();
      expect(offers).toBeDefined();
      expect(Array.isArray(offers)).toBe(true);
      expect(offers.length).toBeGreaterThan(0);
    });

    it('should handle errors from providers and return valid offers', async () => {
      // Mock an error in one of the provider services
      jest.spyOn(MockSecondProviderService.prototype, 'getOffer').mockRejectedValueOnce(new Error('Intentional Provider error'));

      // Call getOffers and ensure it returns valid offers from other providers
      const offers = await service.getOffers();
      expect(offers).toBeDefined();
      expect(Array.isArray(offers)).toBe(true);
      expect(offers.length).toEqual(Providers.length - 1);
      expect(offers.every(offer => offer.provider !== 'Provider2')).toBe(true);
    });
  });
});