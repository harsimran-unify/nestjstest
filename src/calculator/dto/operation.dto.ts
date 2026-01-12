import { Type } from "class-transformer";
import { IsString } from "class-validator";


export class OperationDto {
    operation: string;

    @IsString()
    a: string;


    @IsString()
    b: string;
}