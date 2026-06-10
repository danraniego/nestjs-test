import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgScopeInterceptor } from '../../common/interceptors/org-scope.interceptor';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { Mission } from './missions.model';

@Module({
  imports: [SequelizeModule.forFeature([Mission])],
  providers: [MissionsService, OrgScopeInterceptor],
  controllers: [MissionsController],
})
export class MissionsModule {}
