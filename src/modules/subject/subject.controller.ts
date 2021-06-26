import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {SubjectService} from './subject.service';
import {CreateSubjectDto} from './dto/create-subject.dto';
import {UpdateSubjectDto} from './dto/update-subject.dto';
import {AssignSubjectDto} from "../student/dto/assign-subject.dto";
import {AssignTestDto} from "../student/dto/assign-test.dto";

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {
    }

    @Post('add')
    async create(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectService.create(createSubjectDto);
    }

    @Get('all')
    async findAll() {
        return this.subjectService.findAll();
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subjectService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
        return this.subjectService.update(+id, updateSubjectDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subjectService.remove(+id);
    }
}
