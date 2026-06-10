import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Mission } from '../modules/missions/missions.model';
import { seedMissions } from './seeders/mission.seeder';

export async function runSeeders(app: INestApplication) {
  const missionModel = app.get<typeof Mission>(getModelToken(Mission));
  await seedMissions(missionModel);
}
