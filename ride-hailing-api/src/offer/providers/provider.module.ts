import { Module } from '@nestjs/common';
import { ProviderAService } from './providerA/providerA.service';
import { ProviderBService } from './providerB/providerB.service';
import { ProviderCService } from './providerC/providerC.service';
import { ProviderARepository } from './providerA/providerA.repository';
import { ProviderBRepository } from './providerB/providerB.repository';
import { ProviderCRepository } from './providerC/providerC.repository';

const RideProviders = {
  provide: 'Providers',
  useFactory: (...providers) => [...providers],
  inject: [ProviderAService, ProviderBService, ProviderCService],
}

@Module({
  imports: [],
  controllers: [],
  providers: [
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
export class ProviderModule { }
