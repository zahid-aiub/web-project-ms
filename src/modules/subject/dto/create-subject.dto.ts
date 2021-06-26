import {ApiProperty} from "@nestjs/swagger";
import {Student} from "../../student/entities/student.entity";


export class CreateSubjectDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    students: Student[];

}
