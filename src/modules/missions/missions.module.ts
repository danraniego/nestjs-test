import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrgScopeContext } from '../../common/contexts/org-scope.context';
import { OrgScopeMiddleware } from '../../common/middlewares/org-scope.middleware';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { Mission } from './missions.model';

@Module({
  imports: [SequelizeModule.forFeature([Mission])],
  providers: [MissionsService, OrgScopeContext, OrgScopeMiddleware],
  controllers: [MissionsController],
})
export class MissionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OrgScopeMiddleware).forRoutes(MissionsController);
  }
}
