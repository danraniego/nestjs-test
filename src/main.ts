import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runSeeders } from './database/database.seeder';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await runSeeders(app);

  app.setGlobalPrefix('api/v1');

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
