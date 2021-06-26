import {Module} from '@nestjs/common';
import {TestService} from './test.service';
import {TestController} from './test.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TestRepository} from "./test.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TestRepository])],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
