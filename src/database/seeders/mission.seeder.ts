import { Mission } from '../../modules/missions/missions.model';
import { MissionStatus } from '../../modules/missions/missions.enum';

const ORG_A_ID = '8a3f2d1e-7c4b-4a91-9f58-2d3a7e9b6c11';
const ORG_B_ID = 'f5c8e2a4-1b9d-4f73-a6e0-8c4d9b2f7a55';

export async function seedMissions(missionModel: typeof Mission) {
  const count: number = await missionModel.count();

  if (count > 0) {
    return;
  }

  await missionModel.bulkCreate([
    {
      organization_id: ORG_A_ID,
      title: 'Org A - Mission 1',
      points: 100,
      status: MissionStatus.AVAILABLE,
    },
    {
      organization_id: ORG_A_ID,
      title: 'Org A - Mission 2',
      points: 50,
      status: MissionStatus.AVAILABLE,
    },
    {
      organization_id: ORG_B_ID,
      title: 'Org B - Mission 1',
      points: 150,
      status: MissionStatus.AVAILABLE,
    },
    {
      organization_id: ORG_B_ID,
      title: 'Org B - Mission 2',
      points: 100,
      status: MissionStatus.AVAILABLE,
    },
  ]);
}
