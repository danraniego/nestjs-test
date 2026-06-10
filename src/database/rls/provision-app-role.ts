import { ConfigService } from '@nestjs/config';

import { createAdminSequelize } from './create-admin-sequelize';
import { APP_ROLE_NAME } from './rls.constants';

function escapeLiteral(value: string): string {
  return value.replace(/'/g, "''");
}

export async function provisionAppDatabaseRole(
  configService: ConfigService,
): Promise<void> {
  const appPassword = configService.get<string>('DB_PASS');
  const database = configService.get<string>('DB_NAME');

  if (!appPassword || !database) {
    throw new Error('Database credentials are not configured');
  }

  const admin = createAdminSequelize(configService);

  try {
    await admin.authenticate();

    const [existingRole] = (await admin.query(
      `SELECT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${APP_ROLE_NAME}') AS exists`,
    )) as [{ exists: boolean }[], unknown];

    const escapedPassword = escapeLiteral(appPassword);

    if (!existingRole[0].exists) {
      await admin.query(
        `CREATE ROLE ${APP_ROLE_NAME} LOGIN PASSWORD '${escapedPassword}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS`,
      );
    } else {
      await admin.query(
        `ALTER ROLE ${APP_ROLE_NAME} WITH LOGIN PASSWORD '${escapedPassword}' NOSUPERUSER NOBYPASSRLS`,
      );
    }

    await admin.query(
      `GRANT CONNECT ON DATABASE "${database}" TO ${APP_ROLE_NAME}`,
    );
    await admin.query(`GRANT USAGE ON SCHEMA public TO ${APP_ROLE_NAME}`);
    await admin.query(
      `GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${APP_ROLE_NAME}`,
    );
    await admin.query(
      `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${APP_ROLE_NAME}`,
    );
  } finally {
    await admin.close();
  }
}
