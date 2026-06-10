import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { OrgScopeContext } from '../contexts/org-scope.context';

@Injectable()
export class OrgScopeMiddleware implements NestMiddleware {
  constructor(private readonly orgScopeContext: OrgScopeContext) {}

  use(req: Request, res: Response, next: NextFunction) {
    const orgId = req.header('x-org-id');

    if (!orgId) {
      throw new BadRequestException('x-org-id header is required');
    }

    this.orgScopeContext.setOrgId(orgId);

    next();
  }
}
