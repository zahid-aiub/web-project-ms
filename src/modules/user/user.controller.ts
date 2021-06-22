import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseGuards,
    Query,
    ParseIntPipe
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Pagination} from "nestjs-typeorm-paginate";
import {User} from "./entities/user.entity";
import {ApiPaginateResponse} from "../../common/responses/api.paginate.response";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createStudentDto: CreateUserDto) {
        return this.userService.create(createStudentDto);
    }

    @Get('all')
    async findAll(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10,
        @Query('search') search: string = ""
    ): Promise<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;
        let condition = {search};
        const response = await this.userService.findAll({page, limit}, condition);
        return ApiPaginateResponse(200, 'User List', response);
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findById(+id);
    }

    @Get(':username')
    findOne(@Param('username') username: string) {
        return this.userService.findOne(username);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateUserDto) {
        return this.userService.update(+id, updateStudentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
