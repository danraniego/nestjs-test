import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { MissionStatus } from './missions.enum';
import { Mission } from './missions.model';

@Injectable()
export class MissionsService {
  constructor(
    @InjectModel(Mission)
    private readonly missionModel: typeof Mission,
  ) {}

  async findAllMissions(): Promise<Mission[]> {
    return this.missionModel.findAll();
  }

  async submitMission(id: string): Promise<Mission> {
    const mission = await this.missionModel.findByPk(id);

    if (!mission) {
      throw new NotFoundException('Mission not found');
    }

    if (mission.status === MissionStatus.SUBMITTED) {
      throw new BadRequestException('Mission has already been submitted');
    }

    await mission.update({ status: MissionStatus.SUBMITTED });
    await mission.reload();

    return mission;
  }
}
