import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import { userDto } from "../dto/user.dto";
import { ConfigService } from "@nestjs/config";

// TODO: Поработать над ошибками т.к. не везде должны быть ошибки(наверно, надо обдумать) связанные с UnauthorizedException

@Injectable()
export class AccessJwtAuthGuard implements CanActivate {
    constructor( private jwtService: JwtService,
                 private configService: ConfigService,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const authHeader = req.headers['authorization'];
        if(!authHeader) {
            throw new UnauthorizedException({'message': 'Отсутствие Access токена!'});
            //return false;
        }
        const fullAccessToken = authHeader.split(' ');
        if(fullAccessToken[0] !== 'Bearer') {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Отсутствие Bearer access токена(Не тот заголовок)!',
                }, 
                HttpStatus.FORBIDDEN,
            );
        }
        const accessToken = fullAccessToken[1];
        /*
        let myToken: string;
        for (let i = 0; i < accessToken.length; i++) {
          const nameToken = accessToken[i].split('=')[0];
          if(nameToken === 'authorization'){
            myToken = accessToken[i];
            break;
          }
        }
        */
        //console.log(accessToken);
        //console.log(this.configService.get("ACCESS_KEY"));

        if (!accessToken) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Пользователь не авторизован(нет самого Access JWT токена)',
                }, 
                HttpStatus.FORBIDDEN,
            );
        }
        let user: userDto;
        try {
            user = this.jwtService.verify(accessToken, {secret: this.configService.get("ACCESS_KEY")});
        } catch (error) {
            console.log(error);
        }
        
        if(!user) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: 'Токен умер(не расшифрован).',
                }, 
                HttpStatus.FORBIDDEN,
            );
        }

        //console.log('User:');
        //console.log(user);
        //console.log("________________________________");

        req.user = user;
        return true;
    }

}