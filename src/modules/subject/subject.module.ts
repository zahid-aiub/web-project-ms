import {Module} from '@nestjs/common';
import {SubjectService} from './subject.service';
import {SubjectController} from './subject.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubjectRepository} from "./subject.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SubjectRepository])],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
