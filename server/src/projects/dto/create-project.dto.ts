export class CreateProjectDto {
    id_group_project?: number
    name: string
    id_creator: number
    name_creator: string
    students: number[]
}