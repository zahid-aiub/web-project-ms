import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {UserRepository} from "./user.repository";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {Like} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: UserRepository,
    ) {
    }


    create(createStudentDto: CreateUserDto): Promise<User> {
        const student = new User();
        student.username = createStudentDto.username;
        student.password = createStudentDto.password;

        return this.userRepository.save(student);
    }

    async findAll(options: IPaginationOptions, condition: any): Promise<Pagination<User>> {
        let _where = {};

        if (condition['search']) {
            _where['username'] = Like('%' + condition['search'] + '%');
        }
        return paginate<User>(this.userRepository, options, {
            //  select: ["email", "id"],
            relations: ['student'],
            where: _where,
            order: {
                createdAt: "DESC"
            },
        });
    }

    findOne(username: string): Promise<User> {
        return this.userRepository.findOne({where: {username}});
    }

    findById(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    update(id: number, updateStudentDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    // remove(id: number) {
    //   return `This action removes a #${id} user`;
    // }
}

