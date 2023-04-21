import { ClassProvider, Module } from '@nestjs/common';
import { FooRepositoryKey } from './foo-repository.inteface';
import { FooRepository } from './foo.repository';

const fooRepository: ClassProvider = {
  provide: FooRepositoryKey,
  useClass: FooRepository,
};

@Module({
  providers: [fooRepository],
  exports: [fooRepository],
})
export class FooRepositoryModule {}
