import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags("Работа с данными пользователя(студента)")
@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService ) {}
    
}
