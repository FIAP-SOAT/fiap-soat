import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/adapter/database/database.module';
import { HttpModule } from '@shared/adapter/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
