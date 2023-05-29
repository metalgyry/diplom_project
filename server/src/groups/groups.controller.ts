import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService ) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Get('/students')
    async getGroupStudents(@Req() req: Request) {
      const groupStudents = await this.groupsService.getGroupStudents(req['user'].id_group);
      return groupStudents;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AccessJwtAuthGuard)
    @Get('/name')
    async getGroupName(@Req() req: Request) {
      const groupStudents = await this.groupsService.getGroupName(req['user'].id_group);
      return groupStudents;
    }

}
