import { EntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { IFooRepositroy } from './foo-repository.inteface';

@Injectable()
export class FooRepository implements IFooRepositroy {
  constructor(private readonly em: EntityManager) {}
}
