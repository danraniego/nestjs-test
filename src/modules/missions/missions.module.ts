import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { Mission } from './missions.model';

@Module({
  imports: [SequelizeModule.forFeature([Mission])],
  providers: [MissionsService],
  controllers: [MissionsController],
})
export class MissionsModule {}
