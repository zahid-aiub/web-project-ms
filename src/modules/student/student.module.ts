import {Module} from '@nestjs/common';
import {StudentService} from './student.service';
import {StudentController} from './student.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {StudentRepository} from "./student.repository";

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
