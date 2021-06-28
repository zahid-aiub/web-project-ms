import {Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards} from '@nestjs/common';
import {StudentService} from './student.service';
import {CreateStudentDto} from './dto/create-student.dto';
import {UpdateStudentDto} from './dto/update-student.dto';
import {Pagination} from "nestjs-typeorm-paginate";
import {User} from "../user/entities/user.entity";
import {Student} from "./entities/student.entity";
import {ApiPaginateResponse} from "../../common/responses/api.paginate.response";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {AssignSubjectDto} from "./dto/assign-subject.dto";
import {AssignTestDto} from "./dto/assign-test.dto";
import {SubjectService} from "../subject/subject.service";
import {SubjectRepository} from "../subject/subject.repository";

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService,
                private readonly subjectRepository: SubjectRepository,
                ) {
    }

    @Post('add')
    async create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.create(createStudentDto);
    }

    @Get('all')
    // @UseGuards(JwtAuthGuard)
    async findAll(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10,
        @Query('search') search: string = ""
    ): Promise<Pagination<Student>> {
        limit = limit > 100 ? 100 : limit;
        let condition = {search};
        const response = await this.studentService.findAll({page, limit}, condition);

        await response.items.forEach(student => {
           student.subjects.forEach(subject => {
               this.subjectRepository.findOne(subject.id).then(subjectDb => {
                   subject.tests = subjectDb.tests;
               })
           });
        });

        return ApiPaginateResponse(200, 'Student List', response);
    }

    @Post('assign-subject/:id')
    async assignSubject(@Param('id') id: string, @Body() assignSubjectDto: AssignSubjectDto): Promise<any> {
        return this.studentService.assignSubject(id, assignSubjectDto);
    }

    @Post('assign-test/:id')
    async assignTest(@Param('id') id: string, @Body() assignTestDto: AssignTestDto): Promise<any> {
        return this.studentService.assignTest(id, assignTestDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.studentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
        return this.studentService.update(+id, updateStudentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.studentService.remove(+id);
    }
}
