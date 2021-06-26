import {Injectable} from '@nestjs/common';
import {CreateTestDto} from './dto/create-test.dto';
import {UpdateTestDto} from './dto/update-test.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {StudentRepository} from "../student/student.repository";
import {UserRepository} from "../user/user.repository";
import {TestRepository} from "./test.repository";
import {ApiResponse} from "../../common/responses/api.response";

@Injectable()
export class TestService {

    constructor(
        @InjectRepository(TestRepository)
        private readonly testRepository: TestRepository
    ) {
    }

    async create(createTestDto: CreateTestDto): Promise<ApiResponse> {
        const test = await this.testRepository.save(createTestDto);
        return new ApiResponse(201, 'Test Created Successfully', test.id);
    }

    async findAll() {
        return this.testRepository.find(/*{relations: ['subject']}*/);
    }

    findOne(id: number) {
        return `This action returns a #${id} test`;
    }

    async update(id: number, updateTestDto: UpdateTestDto): Promise<ApiResponse> {
        const test = await this.testRepository.findOne(id);
        if (test) {
            test.name = updateTestDto.name;
            test.testDate = updateTestDto.testDate;
            await this.testRepository.save(test);
            return new ApiResponse(201, 'Test Updated Successfully', id);
        } else {
            return new ApiResponse(404, 'Test Not Found with ID: ' + id, id);
        }
    }

    remove(id: number) {
        return `This action removes a #${id} test`;
    }
}
