import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createAdminSequelize } from './rls/create-admin-sequelize';
import { seedMissions } from './seeders/mission.seeder';

export async function runSeeders(app: INestApplication) {
  const configService = app.get(ConfigService);
  const adminSequelize = createAdminSequelize(configService);

  try {
    await adminSequelize.authenticate();
    await seedMissions(adminSequelize);
  } finally {
    await adminSequelize.close();
  }
}
