import { Module } from '@nestjs/common';
import { getMongoMikroOrmModule } from './config/database/mongo-mikro.config';
import { getPgMikroOrmModule } from './config/database/pg-mikro.config';
import { FooModule } from './modules/foo/foo.module';

@Module({
  imports: [getPgMikroOrmModule(), getMongoMikroOrmModule(), FooModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
