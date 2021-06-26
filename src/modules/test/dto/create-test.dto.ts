import {ApiProperty} from "@nestjs/swagger";
import {Subject} from "../../subject/entities/subject.entity";


export class CreateTestDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    testDate: string;

    @ApiProperty()
    subject: Subject;

}
