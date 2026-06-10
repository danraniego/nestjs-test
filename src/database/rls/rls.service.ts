import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

import { createAdminSequelize } from './create-admin-sequelize';
import { orgScopeStorage } from './org-scope.storage';
import { APP_ROLE_NAME, ORG_SCOPE_SETTING } from './rls.constants';
import { RLS_SETUP_STATEMENTS } from './rls.setup';

type PgConnection = {
  query: (sql: string, values?: unknown[]) => Promise<unknown>;
};

@Injectable()
export class RlsService implements OnModuleInit {
  private readonly logger = new Logger(RlsService.name);

  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit(): void {
    this.registerConnectionHooks();
  }

  async enableRowLevelSecurity(): Promise<void> {
    const admin = createAdminSequelize(this.configService);

    try {
      await admin.authenticate();
      await admin.query(`ALTER TABLE missions OWNER TO ${APP_ROLE_NAME}`);
      await admin.query(
        `GRANT SELECT, INSERT, UPDATE, DELETE ON missions TO ${APP_ROLE_NAME}`,
      );

      for (const statement of RLS_SETUP_STATEMENTS) {
        await admin.query(statement);
      }

      this.logger.log('PostgreSQL row level security enabled for missions');
    } finally {
      await admin.close();
    }
  }

  private registerConnectionHooks(): void {
    this.sequelize.addHook(
      'afterPoolAcquire',
      async (connection: PgConnection) => {
        const orgId = orgScopeStorage.getStore()?.orgId;
        if (!orgId) {
          return;
        }

        await connection.query(
          `SELECT set_config('${ORG_SCOPE_SETTING}', $1, false)`,
          [orgId],
        );
      },
    );

    const connectionManager = this.sequelize.connectionManager as {
      releaseConnection: (connection: PgConnection) => void;
    };
    const releaseConnection =
      connectionManager.releaseConnection.bind(connectionManager);

    connectionManager.releaseConnection = (connection: PgConnection) => {
      void connection.query(`RESET ${ORG_SCOPE_SETTING}`);
      releaseConnection(connection);
    };
  }
}
