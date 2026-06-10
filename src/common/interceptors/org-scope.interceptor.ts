import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';

import { orgScopeStorage } from '../../database/rls/org-scope.storage';

@Injectable()
export class OrgScopeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const orgId = request.header('x-org-id');

    if (!orgId) {
      throw new BadRequestException('x-org-id header is required');
    }

    orgScopeStorage.enterWith({ orgId });

    return next.handle();
  }
}
