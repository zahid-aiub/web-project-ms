import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Student} from './entities/student.entity';
import {StudentRepository} from "./student.repository";
import {CreateStudentDto} from "./dto/create-user.dto";
import {UpdateStudentDto} from "./dto/update-user.dto";

@Injectable()
export class StudentService {
  constructor(
      @InjectRepository(Student)
      private studentRepository: StudentRepository,
  ) {}


  create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = new Student();
    student.username = createStudentDto.username;
    student.password = createStudentDto.password;

    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  findOne(username: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { username } });
  }
  findById(id: number): Promise<Student> {
    return this.studentRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} user`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

