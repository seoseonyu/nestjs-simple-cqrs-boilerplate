import { MikroOrmModule, MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { DynamicModule } from '@nestjs/common';

const MONGODB_CONNECTION = {
  URL:
    process.env.MONGODB_URL ||
    'mongodb://foobar:password@localhost:27017/database',
};
const mongoMikroOrmModuleOptions: MikroOrmModuleSyncOptions = {
  contextName: 'mongodb',
  entities: ['dist/entities/mongo/*/*.entity.js'],
  entitiesTs: ['src/entities/mongo/*/*.entity.ts'],
  type: 'mongo',
  clientUrl: MONGODB_CONNECTION.URL,
  allowGlobalContext: true,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
};

export default mongoMikroOrmModuleOptions;

export function getMongoMikroOrmModule(): DynamicModule {
  return MikroOrmModule.forRoot({
    ...mongoMikroOrmModuleOptions,
    allowGlobalContext: true,
  });
}
