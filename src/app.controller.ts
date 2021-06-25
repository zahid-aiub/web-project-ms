import {
  BadRequestException,
  CacheInterceptor,
  Controller,
  Get,
  Logger,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import {Cron} from "@nestjs/schedule";
import {UserService} from "./modules/user/user.service";
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly userService: UserService
              ) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /*@Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('========== Called when the current second is 45 ===========');
  }*/

  /*@Get('cache')
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(CacheInterceptor)
  getUserInfo() {
    return this.userService.findAll();
  }*/

}
