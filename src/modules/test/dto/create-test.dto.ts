import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Subject} from "../../subject/entities/subject.entity";


export class CreateTestDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    testDate: Date;

    @ApiPropertyOptional()
    subject: Subject;

}
