import {Injectable} from '@nestjs/common';
import {CreateSubjectDto} from './dto/create-subject.dto';
import {UpdateSubjectDto} from './dto/update-subject.dto';
import {ApiResponse} from "../../common/responses/api.response";
import {InjectRepository} from "@nestjs/typeorm";
import {SubjectRepository} from "./subject.repository";

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

    async findOne(id: number): Promise<ApiResponse> {
        const subject = await this.subjectRepository.findOne(id, {relations: ['tests']});
        return new ApiResponse(200, 'Subject with ID: ' + id, subject);
    }

    update(id: number, updateSubjectDto: UpdateSubjectDto) {
        return `This action updates a #${id} subject`;
    }

    remove(id: number) {
        return `This action removes a #${id} subject`;
    }

}
