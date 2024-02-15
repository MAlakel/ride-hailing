import { Controller, Get, HttpException, Logger } from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from './offer.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Offers")
@Controller('offers')
export class OfferController {
  private readonly logger = new Logger(OfferController.name);
  
  constructor(private readonly offerService: OfferService) { }

  @Get()
  async getOffers(): Promise<Offer[]> {
    this.logger.log('getOffers invoked');
    return await this.offerService.getOffers();
  }

  @Get('/error')
  async getOffersError(): Promise<Offer[]> {
    this.logger.log('getOffersError invoked');
    throw new HttpException("Failed", 500);
  }
}