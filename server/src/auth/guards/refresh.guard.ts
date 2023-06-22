import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import { userDto } from "../dto/user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RefreshJwtAuthGuard implements CanActivate {
    constructor( private jwtService: JwtService,
                 private configService: ConfigService,
        ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const cookie = req.headers.cookie;
        if(!cookie) {
            throw new UnauthorizedException({'message': 'Отсутствие Refresh токена!'});
        }
        const fullRefreshToken = cookie.split('=');
        if(fullRefreshToken[0] !== 'refreshToken') {
            throw new UnauthorizedException({'message': 'Отсутствие RefreshToken токена(Не тот заголовок)!'});
        }
        const refreshToken = fullRefreshToken[1];

        if (!refreshToken) {
            throw new UnauthorizedException({'message': 'Пользователь не авторизован(нет самого Refresh jwt токена)'});
        }
        let user: userDto;
        try {
            user = this.jwtService.verify(refreshToken, {secret: this.configService.get("REFRESH_KEY")});
        } catch (error) {
            console.log(error);
        }
        
        if(!user) {
            throw new UnauthorizedException({'message': 'Токен умер.'});
        }

        req.user = user;
        return true;
    }

}