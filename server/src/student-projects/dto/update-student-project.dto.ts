import { CreateStudentProjectDto } from "./create-student-project.dto"
import { PartialType } from '@nestjs/mapped-types';

export class UpdateStudentProjectDto extends PartialType(CreateStudentProjectDto) {}