import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProviderCRepository {
  getOffer(): any {
    throw new NotFoundException('intentional NotFoundException from Provider C');
  }
}