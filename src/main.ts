import 'dotenv/config';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runSeeders } from './database/database.seeder';
import { provisionAppDatabaseRole } from './database/rls/provision-app-role';
import { RlsService } from './database/rls/rls.service';
async function bootstrap() {
  const configService = new ConfigService();
  await provisionAppDatabaseRole(configService);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  await app.init();
  await runSeeders(app);
  await app.get(RlsService).enableRowLevelSecurity();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
