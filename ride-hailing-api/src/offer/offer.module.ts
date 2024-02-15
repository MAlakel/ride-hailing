import { Module } from '@nestjs/common';
import { ProviderAService } from './providers/providerA/providerA.service';
import { ProviderBService } from './providers/providerB/providerB.service';
import { ProviderCService } from './providers/providerC/providerC.service';
import { ProviderARepository } from './providers/providerA/providerA.repository';
import { ProviderBRepository } from './providers/providerB/providerB.repository';
import { ProviderCRepository } from './providers/providerC/providerC.repository';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';

const RideProviders = {
  provide: 'Providers',
  useFactory: (...providers) => [...providers],
  inject: [ProviderAService, ProviderBService, ProviderCService],
}

@Module({
  imports: [],
  controllers: [OfferController],
  providers: [
    OfferService,
    RideProviders,
    ProviderAService,
    ProviderBService,
    ProviderCService,
    ProviderARepository,
    ProviderBRepository,
    ProviderCRepository
  ],
  exports: [
    RideProviders,
    ProviderAService,
    ProviderBService,
    ProviderCService
  ]
})
export class OfferModule { }
