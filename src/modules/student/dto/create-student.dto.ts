import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateStudentDto {

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiPropertyOptional()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiPropertyOptional()
    lastName: string;
}
