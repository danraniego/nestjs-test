import { Controller, Get } from '@nestjs/common';
import { Mission } from './missions.model';
import { MissionsService } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get()
  findAll(): Promise<Mission[]> {
    return this.missionsService.findAllMissions();
  }
}
