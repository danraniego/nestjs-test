import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { OrgScopeInterceptor } from '../../common/interceptors/org-scope.interceptor';
import { Mission } from './missions.model';
import { MissionsService } from './missions.service';

@Controller('missions')
@UseInterceptors(OrgScopeInterceptor)
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get()
  findAll(): Promise<Mission[]> {
    return this.missionsService.findAllMissions();
  }

  @Post(':id/submit')
  submit(@Param('id', ParseUUIDPipe) id: string): Promise<Mission> {
    return this.missionsService.submitMission(id);
  }
}
