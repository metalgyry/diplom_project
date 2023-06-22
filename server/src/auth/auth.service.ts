import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Students } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { loginDto } from './dto/login-auth.dto';
import { userDto } from './dto/user.dto';

type Tokens = {
    access_token: string,
    refresh_token: string
}

@Injectable()
export class AuthService {

    constructor(private configService: ConfigService,
        private usersService: UsersService,
        private jwtService: JwtService) {}
     
    async generateToken(user: userDto): Promise<Tokens> {
        try {

            const payload = {id_student: user.id_student, login: user.login, full_name: user.full_name, id_group: user.id_group};
            const accessToken = await this.jwtService.signAsync(payload, { secret: this.configService.get('ACCESS_KEY'), expiresIn: ( this.configService.get("ACCESS_KEY_TIME") / 1000 ) });
            const refreshToken = await this.jwtService.signAsync(payload, { secret: this.configService.get('REFRESH_KEY'), expiresIn: ( this.configService.get("REFRESH_KEY_TIME") / 1000 ) });
            return {access_token: accessToken, refresh_token: refreshToken};
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Не удалось сгенерировать токены!',
                }, HttpStatus.INTERNAL_SERVER_ERROR,
                { cause: error }
            );
        }
    }

    private async validateUser(userData: loginDto): Promise<Students> {
        try {
            const userWithPass = await this.usersService.getUserByLogin(userData.login);
            if (userData.password != userWithPass.password) {
                throw new HttpException(
                    {
                        status: HttpStatus.FORBIDDEN,
                        error: 'Неверный пароль!',
                    }, 
                    HttpStatus.FORBIDDEN,
                );
                }
                return userWithPass;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Неверный логин или пароль!',
                }, HttpStatus.FORBIDDEN,
                { cause: error }
            );
        }
    }

    async login(userData: loginDto): Promise<Students> {
        return await this.validateUser(userData);
    }

}
