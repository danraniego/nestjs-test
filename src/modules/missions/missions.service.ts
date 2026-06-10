import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
}
