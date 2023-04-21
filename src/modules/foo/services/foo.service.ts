import { Injectable } from "@nestjs/common";
import { IFooService } from "../interfaces/foo-service.interface";

@Injectable()
export class FooService implements IFooService {}