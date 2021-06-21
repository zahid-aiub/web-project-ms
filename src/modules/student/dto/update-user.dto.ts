import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-user.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
