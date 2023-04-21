import { Controller, Injectable, Post } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { CommandBus } from "@nestjs/cqrs/dist";
import { CreateFooCommand } from "../commands/impl/create-foo.command";

@Controller('foo')
export class FooController {
  constructor(
    private readonly commandBus:CommandBus, private readonly queryBus: QueryBus
  ){}

  @Post('')
  async create() {
    await this.commandBus.execute<CreateFooCommand, void>(new CreateFooCommand());
  }
}