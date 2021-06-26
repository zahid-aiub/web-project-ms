import {ApiProperty} from "@nestjs/swagger";
import {Subject} from "../../subject/entities/subject.entity";

export class AssignSubjectDto {

    @ApiProperty()
    subjects: Subject[];

}
