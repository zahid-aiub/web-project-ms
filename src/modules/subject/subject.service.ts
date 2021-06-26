import {Injectable} from '@nestjs/common';
import {CreateSubjectDto} from './dto/create-subject.dto';
import {UpdateSubjectDto} from './dto/update-subject.dto';
import {ApiResponse} from "../../common/responses/api.response";
import {InjectRepository} from "@nestjs/typeorm";
import {TestRepository} from "../test/test.repository";
import {SubjectRepository} from "./subject.repository";
import {AssignSubjectDto} from "../student/dto/assign-subject.dto";
import {AssignTestDto} from "../student/dto/assign-test.dto";

@Injectable()
export class SubjectService {

    constructor(
        @InjectRepository(SubjectRepository)
        private readonly subjectRepository: SubjectRepository
    ) {
    }

    async create(createSubjectDto: CreateSubjectDto): Promise<ApiResponse> {
        const subject = await this.subjectRepository.save(createSubjectDto);
        return new ApiResponse(201, 'Subject Created Successfully', subject.id);
    }

    async findAll() {
        return this.subjectRepository.find({relations: ['tests']});
    }

    findOne(id: number) {
        return `This action returns a #${id} subject`;
    }

    update(id: number, updateSubjectDto: UpdateSubjectDto) {
        return `This action updates a #${id} subject`;
    }

    remove(id: number) {
        return `This action removes a #${id} subject`;
    }

}
