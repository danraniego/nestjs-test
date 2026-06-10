import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize';

export function createAdminSequelize(configService: ConfigService): Sequelize {
  return new Sequelize({
    dialect: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username:
      configService.get<string>('DB_ADMIN_USER') ??
      configService.get<string>('DB_USER'),
    password:
      configService.get<string>('DB_ADMIN_PASSWORD') ??
      configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    logging: false,
  });
}
