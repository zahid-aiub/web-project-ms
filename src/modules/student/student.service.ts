import {Injectable} from '@nestjs/common';
import {CreateStudentDto} from './dto/create-student.dto';
import {UpdateStudentDto} from './dto/update-student.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {StudentRepository} from "./student.repository";
import {ApiResponse} from "../../common/responses/api.response";
import {User} from "../user/entities/user.entity";
import {UserRepository} from "../user/user.repository";
import {Student} from "./entities/student.entity";
import {ERole} from "../../core/enums/role.enum";
import {Like} from "typeorm";
import * as bcrypt from 'bcrypt';
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {SALT_OR_ROUND} from "../../common/utils/message.utils";
import {AssignSubjectDto} from "./dto/assign-subject.dto";
import {AssignTestDto} from "./dto/assign-test.dto";

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(StudentRepository)
        private readonly studentRepository: StudentRepository,
        private readonly userRepository: UserRepository
    ) {
    }

    async create(createStudentDto: CreateStudentDto): Promise<ApiResponse> {
        const student = new Student();
        student.firstName = createStudentDto.firstName;
        student.lastName = createStudentDto.lastName;
        student.email = createStudentDto.email;
        // student.tests = createStudentDto.tests;
        const savesStudent = await this.studentRepository.save(student);

        const user = new User();
        const password = createStudentDto.password;
        const hash = await bcrypt.hash(password, SALT_OR_ROUND);
        user.username = createStudentDto.username;
        user.password = hash;
        user.student = savesStudent;
        user.roles = ERole.Student;
        await this.userRepository.save(user);

        return new ApiResponse(201, 'Student Created Successfully', user.userId);
    }

    async findAll(options: IPaginationOptions, condition: any): Promise<Pagination<Student>> {
        let _where = {};

        if (condition['search']) {
            _where['firstName'] = Like('%' + condition['search'] + '%');
        }
        return paginate<Student>(this.studentRepository, options, {
            relations: ['subjects', 'tests'],
            where: _where,

            order: {
                createdAt: "DESC"
            },
        });
    }


    async assignSubject(id: string, assignSubjectDto: AssignSubjectDto): Promise<ApiResponse> {
        const student = await this.studentRepository.findOne(id);
        student.subjects = assignSubjectDto.subjects;
        await this.studentRepository.save(student);
        return new ApiResponse(201, 'Subject Assigned successfully', student.id);
    }

    async assignTest(id: string, assignTestDto: AssignTestDto): Promise<ApiResponse> {
        const student = await this.studentRepository.findOne(id);
        student.tests = assignTestDto.tests;
        await this.studentRepository.save(student);
        return new ApiResponse(201, 'Test Assigned successfully', student.id);
    }

    findOne(id: number) {
        return `This action returns a #${id} student`;
    }

    update(id: number, updateStudentDto: UpdateStudentDto) {
        return `This action updates a #${id} student`;
    }

    remove(id: number) {
        return `This action removes a #${id} student`;
    }
}
