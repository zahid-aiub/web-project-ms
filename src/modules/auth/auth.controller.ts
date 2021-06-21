import {Controller, Get, Logger, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "../../common/guards/local-auth.guard";
import {JwtAuthGuard} from "../../common/guards/jwt-auth.guard";
import {RolesGuard} from "../../common/guards/roles.guard";
import {Role} from "../../core/enums/role.enum";
import {Roles} from "../../common/decorators/roles.decorator";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    private readonly logger = new Logger(AuthController.name);

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        this.logger.log('========== Login Api Call ===========');
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('admin')
    getAdmin(@Request() req) {
        return req.user;
    }
}
