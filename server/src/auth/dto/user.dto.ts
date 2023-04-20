//import { IsString, MinLength, IsNotEmpty } from 'class-validator';

import { Students } from "@prisma/client";

export class userDto {
    id_student: number
    login: string
    full_name: string
    id_group: number

    constructor(user: Students) {
        this.id_student = user.id_student;
        this.login = user.login;
        this.full_name = user.full_name;
        this.id_group = user.id_group;
    }
}