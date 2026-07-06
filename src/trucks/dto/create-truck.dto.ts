import { IsInt, IsString } from "class-validator";

export class CreateTruckDto {
    @IsString()
    brand?: string;

    @IsString()
    model?: string;

    @IsString()
    description?: string;

    @IsInt()
    price?: number;
}
