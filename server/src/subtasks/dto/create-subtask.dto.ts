export class CreateSubTaskDto {
    id_subtask?: number
    id_task: number
    content: string
    priority: number
    // id_student: number
    id_course: number
}