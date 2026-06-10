import { AsyncLocalStorage } from 'async_hooks';

export type OrgScopeStore = {
  orgId: string;
};

export const orgScopeStorage = new AsyncLocalStorage<OrgScopeStore>();
