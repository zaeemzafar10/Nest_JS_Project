import { IsString, IsNotEmpty } from 'class-validator'

export class QueryDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly subject: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;
}
