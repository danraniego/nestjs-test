import { ORG_SCOPE_SETTING } from './rls.constants';

export const RLS_SETUP_STATEMENTS = [
  'ALTER TABLE missions ENABLE ROW LEVEL SECURITY',
  'ALTER TABLE missions FORCE ROW LEVEL SECURITY',
  `DROP POLICY IF EXISTS missions_org_select ON missions`,
  `CREATE POLICY missions_org_select ON missions
    FOR SELECT
    USING (organization_id = current_setting('${ORG_SCOPE_SETTING}', true)::uuid)`,
  `DROP POLICY IF EXISTS missions_org_insert ON missions`,
  `CREATE POLICY missions_org_insert ON missions
    FOR INSERT
    WITH CHECK (organization_id = current_setting('${ORG_SCOPE_SETTING}', true)::uuid)`,
  `DROP POLICY IF EXISTS missions_org_update ON missions`,
  `CREATE POLICY missions_org_update ON missions
    FOR UPDATE
    USING (organization_id = current_setting('${ORG_SCOPE_SETTING}', true)::uuid)
    WITH CHECK (organization_id = current_setting('${ORG_SCOPE_SETTING}', true)::uuid)`,
  `DROP POLICY IF EXISTS missions_org_delete ON missions`,
  `CREATE POLICY missions_org_delete ON missions
    FOR DELETE
    USING (organization_id = current_setting('${ORG_SCOPE_SETTING}', true)::uuid)`,
];
