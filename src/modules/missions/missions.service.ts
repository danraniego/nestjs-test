import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrgScopeContext } from '../../common/contexts/org-scope.context';
import { Mission } from './missions.model';

@Injectable()
export class MissionsService {
  constructor(
    @InjectModel(Mission)
    private readonly missionModel: typeof Mission,
    private readonly orgScopeContext: OrgScopeContext,
  ) {}

  async findAllMissions(): Promise<Mission[]> {
    return this.missionModel.findAll({
      where: {
        organization_id: this.orgScopeContext.getOrgId(),
      },
    });
  }
}
