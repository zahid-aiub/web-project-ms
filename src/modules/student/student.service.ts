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
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

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
        const savesStudent = await this.studentRepository.save(student);

        const user = new User();
        user.username = createStudentDto.username;
        user.password = createStudentDto.password;
        user.student = savesStudent;
        user.roles = ERole.Student;
        const savedUser = await this.userRepository.save(user);

        return new ApiResponse(201, 'Student Created Successfully', user.userId);
    }

    async findAll(options: IPaginationOptions, condition: any): Promise<Pagination<Student>> {
        let _where = {};

        if (condition['search']) {
            _where['firstName'] = Like('%' + condition['search'] + '%');
        }
        return paginate<Student>(this.studentRepository, options, {
            // relations: ['user'],
            where: _where,

            order: {
                createdAt: "DESC"
            },
        });
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
