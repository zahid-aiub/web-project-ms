import {ApiProperty} from "@nestjs/swagger";
import {Test} from "../../test/entities/test.entity";

export class AssignTestDto {

    @ApiProperty()
    tests: Test[];

}
