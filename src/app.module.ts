import {CacheInterceptor, CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './modules/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from "./modules/user/user.module";
import {ScheduleModule} from "@nestjs/schedule";
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    autoLoadEntities: true,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),

    ScheduleModule.forRoot(),
    CacheModule.register({
      ttl: 30,  // cache for second
      max: 10,
      /*
      store: redisStore,
      host: 'localhost',
      port: 6379,
      */

    }),

    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService],

})
export class AppModule {}
