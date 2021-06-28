import {Module} from '@nestjs/common';
import {ClassService} from './class.service';
import {ClassController} from './class.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
