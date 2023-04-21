import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs/dist";
import { FooServiceKey, IFooService } from "../../interfaces/foo-service.interface";
import { CreateFooCommand } from "../impl/create-foo.command";

@CommandHandler(CreateFooCommand)
export class CreateFooCommandHandler implements ICommandHandler<CreateFooCommand> {
  constructor(@Inject(FooServiceKey) private readonly fooService: IFooService) {}

  execute(command: CreateFooCommand): Promise<any> {
    throw new Error("Method not implemented.");
  }
}