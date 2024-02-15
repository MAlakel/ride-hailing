import { Module } from '@nestjs/common';
import { OfferService } from './offer/offer.service';
import { OfferController } from './offer/offer.controller';
import { ProviderModule } from './offer/providers/provider.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProviderModule],
  controllers: [OfferController],
  providers: [OfferService],
})
export class AppModule { }
