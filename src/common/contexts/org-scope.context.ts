import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class OrgScopeContext {
  private orgId?: string;

  setOrgId(orgId: string) {
    this.orgId = orgId;
  }

  getOrgId(): string {
    if (!this.orgId) {
      throw new Error('Organization ID not found in context');
    }

    return this.orgId;
  }
}
