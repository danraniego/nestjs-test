import type { Sequelize } from 'sequelize';

import { MissionStatus } from '../../modules/missions/missions.enum';

const ORG_A_ID = '8a3f2d1e-7c4b-4a91-9f58-2d3a7e9b6c11';
const ORG_B_ID = 'f5c8e2a4-1b9d-4f73-a6e0-8c4d9b2f7a55';

export async function seedMissions(sequelize: Sequelize) {
  const [countResult] = (await sequelize.query(
    'SELECT count(*)::int AS count FROM missions',
  )) as [{ count: number }[], unknown];

  if (countResult[0].count > 0) {
    return;
  }

  await sequelize.query(
    `
      INSERT INTO missions (id, organization_id, title, points, status, "createdAt", "updatedAt")
      VALUES
        (gen_random_uuid(), :orgA, 'Org A - Mission 1', 100, :status, NOW(), NOW()),
        (gen_random_uuid(), :orgA, 'Org A - Mission 2', 50, :status, NOW(), NOW()),
        (gen_random_uuid(), :orgB, 'Org B - Mission 1', 150, :status, NOW(), NOW()),
        (gen_random_uuid(), :orgB, 'Org B - Mission 2', 100, :status, NOW(), NOW())
    `,
    {
      replacements: {
        orgA: ORG_A_ID,
        orgB: ORG_B_ID,
        status: MissionStatus.AVAILABLE,
      },
    },
  );
}
