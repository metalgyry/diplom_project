import { Injectable, UnauthorizedException } from '@nestjs/common';
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
        const payload = {id_student: user.id_student, login: user.login, full_name: user.full_name, id_group: user.id_group};
        const accessToken = await this.jwtService.signAsync(payload, { secret: this.configService.get('ACCESS_KEY'), expiresIn: ( this.configService.get("ACCESS_KEY_TIME") / 1000 ) });
        const refreshToken = await this.jwtService.signAsync(payload, { secret: this.configService.get('REFRESH_KEY'), expiresIn: ( this.configService.get("REFRESH_KEY_TIME") / 1000 ) });

        return {access_token: accessToken, refresh_token: refreshToken};
    }

    private async validateUser(userData: loginDto): Promise<Students> {
        const userWithPass = await this.usersService.getUserByLogin(userData.login);
        if(!userWithPass){
        throw new UnauthorizedException({message: 'Пользователя с таким логином не существует!'})
        }
        // тут может быть bcrypt() и тогда и в регистрации(если она будет)
        if (userData.password != userWithPass.password) {
        throw new UnauthorizedException({message: 'Неверный пароль!'});
        }
        return userWithPass;
    }

    async login(userData: loginDto): Promise<Students> {
        return await this.validateUser(userData);
    }

}
