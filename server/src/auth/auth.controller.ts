import { Body, Controller, Post, Get, Delete, Res, UseGuards, HttpCode, HttpStatus, Req, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { loginDto } from './dto/login-auth.dto';
import { ConfigService } from '@nestjs/config';
import { AccessJwtAuthGuard } from './guards/auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh.guard';
import { userDto } from './dto/user.dto';

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private configService: ConfigService,
        ) {}
    
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() userAuth: loginDto,
    ) {
        const userData = await this.authService.login(userAuth);
        const tokens = await this.authService.generateToken(userData);
        res.cookie('refreshToken', tokens.refresh_token, {maxAge: this.configService.get("REFRESH_KEY_TIME"), httpOnly: true});
        const user = new userDto(userData);
        res.json({accessToken: tokens.access_token, user});
    }

    @UseGuards(RefreshJwtAuthGuard)
    @Get('/refresh')
    async refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
        console.log(req['user']);
        const tokens = await this.authService.generateToken(req['user']);
        res.cookie('refreshToken', tokens.refresh_token, {maxAge: this.configService.get("REFRESH_KEY_TIME"), httpOnly: true});
        res.json({accessToken: tokens.access_token});
    }

    @HttpCode(HttpStatus.OK)
    @Get('/logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('refreshToken');
        res.end();
    }
    
}
