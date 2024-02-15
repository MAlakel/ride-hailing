import { Test, TestingModule } from '@nestjs/testing';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { HttpException } from '@nestjs/common';
import { IProviderService } from 'src/offer/providers/provider.service.interface';

describe('OfferController', () => {
  let controller: OfferController;
  let offerService: OfferService;

  const mockProviderService: Partial<IProviderService> = {
    getOffer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferController],
      providers: [{
        provide: OfferService,
        useValue: {
          getOffers: jest.fn(),
        },
      },
      {
        provide: 'Providers',
        useValue: [mockProviderService],
      }]
    }).compile();

    controller = module.get<OfferController>(OfferController);
    offerService = module.get<OfferService>(OfferService);
  });

  describe('getOffers', () => {
    it('should return an array of offers', async () => {
      const offers = [{
        "offer_id": "123456789",
        "provider": "ProviderA",
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
      }];
      jest.spyOn(offerService, 'getOffers').mockResolvedValue(offers);

      expect(await controller.getOffers()).toBe(offers);
    });
  });

  describe('getOffersError', () => {
    it('should throw an HttpException with status 500', async () => {
      jest.spyOn(offerService, 'getOffers').mockRejectedValue(new HttpException('Failed', 500));

      await expect(controller.getOffersError()).rejects.toThrow(new HttpException('Failed', 500));
    });
  });
});
