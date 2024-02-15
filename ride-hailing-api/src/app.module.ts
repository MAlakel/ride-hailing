import { Module } from '@nestjs/common';
import { OfferModule } from './offer/offer.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OfferModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
