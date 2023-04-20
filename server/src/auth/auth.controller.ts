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
        const user = await this.authService.login(userAuth);
        const tokens = await this.authService.generateToken(user);
        res.cookie('refreshToken', tokens.refresh_token, {maxAge: this.configService.get("REFRESH_KEY_TIME"), httpOnly: true});
        //res.setHeader('Set-Cookie', jwtToken);
        const userNew = new userDto(user);
        res.json({accessToken: tokens.access_token, userNew});
    }
    
    @HttpCode(HttpStatus.OK)
    @Get('/login')
    async logPage(@Res() res: Response, @Req() req: Request) {
        console.log(req.headers.cookie);
        const moreHeader = req.headers['authorization'].split(' ')[1];
        console.log(moreHeader);
        res.end();
    }

    @UseGuards(AccessJwtAuthGuard)
    @Get('/refresh')
    async refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
        console.log(req['user']);
        console.log('____________________________');
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
