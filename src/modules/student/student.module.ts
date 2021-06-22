import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "../user/user.repository";
import {StudentRepository} from "./student.repository";

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository, UserRepository])],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
