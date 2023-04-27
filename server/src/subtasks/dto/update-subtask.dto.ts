import { PartialType } from '@nestjs/mapped-types';
import { CreateSubTaskDto } from './create-subtask.dto';

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto) {}