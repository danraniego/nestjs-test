import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runSeeders } from './database/database.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await runSeeders(app);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
