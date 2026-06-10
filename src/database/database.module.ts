import { Module } from '@nestjs/common';

import { RlsService } from './rls/rls.service';

@Module({
  providers: [RlsService],
})
export class DatabaseModule {}
