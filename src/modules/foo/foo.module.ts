import { ClassProvider, Module } from '@nestjs/common';
import { CreateFooCommandHandler } from './commands/handlers/create-foo-command.handler';
import { FooController } from './controllers/foo.controller';
import { FooServiceKey } from './interfaces/foo-service.interface';
import { FooService } from './services/foo.service';
import { FooRepositoryModule } from 'src/entities/pg/foo/foo-repository.module';

// ======= COMMAND START ======= //
const commandHandlers = [CreateFooCommandHandler];
// ======= COMMAND END ======= //

// ======= QUERY START ======= //;
const queryHandlers = [];
// ======= QUERY END ======= //

// ======= EVENT START ======= //
const eventHandlers = [];
// ======= EVENT END ======= //

// ======= SERVICE START ======= //
const fooService: ClassProvider = {
  provide: FooServiceKey,
  useClass: FooService,
};

// ======= SERVICE END ======= //

const services = [fooService];

@Module({
  imports: [FooRepositoryModule],
  controllers: [FooController],
  providers: [...services],
})
export class FooModule {}
