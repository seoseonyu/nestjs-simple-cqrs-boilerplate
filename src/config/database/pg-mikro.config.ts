import { LoadStrategy, Options } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { DynamicModule } from '@nestjs/common';

const POSTGRESQL_CONNECTION = {
  HOST: process.env.POSTGRES_HOST || 'localhost',
  PORT: process.env.POSTGRES_PORT || '5432',
  USERNAME: process.env.POSTGRES_USERNAME || 'root',
  PASSWORD: process.env.POSTGRES_PASSWORD || 'password',
  DATABASE: process.env.POSTGRES_DATABASE || 'database',
};

const pgMikroOrmModuleOptions: Options = {
  entities: ['dist/entities/pg/*/*.entity.js'],
  entitiesTs: ['src/entities/pg/*/*.entity.ts'],
  type: 'postgresql',
  dbName: POSTGRESQL_CONNECTION.DATABASE,
  user: POSTGRESQL_CONNECTION.USERNAME,
  password: POSTGRESQL_CONNECTION.PASSWORD,
  host: POSTGRESQL_CONNECTION.HOST,
  port: +POSTGRESQL_CONNECTION.PORT,
  highlighter: new SqlHighlighter(),
  loadStrategy: LoadStrategy.JOINED,
  autoJoinOneToOneOwner: false,
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'migrations',
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: false,
    emit: 'ts',
    snapshot: false,
  },
  forceEntityConstructor: true,
  debug: process.env.NODE_ENV === 'production' ? false : true,
};

export default pgMikroOrmModuleOptions;

export function getPgMikroOrmModule(): DynamicModule {
  return MikroOrmModule.forRoot({
    ...pgMikroOrmModuleOptions,
    allowGlobalContext: true,
  });
}
