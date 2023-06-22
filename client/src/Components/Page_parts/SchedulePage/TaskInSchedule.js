import React from 'react'
import TaskData from '../CoursesPage/TaskData'

export default function TaskInSchedule({task}) {
  return (
    <div className={`schedule_task t_${task.priority == 1 ? 'low' : ''}${task.priority == 2 ? 'normal' : ''}${task.priority == 3 ? 'high' : ''}`}>
        <TaskData task={task} setIsUpdating={null} deleteСurrentTask={null} isTaskOrSubTask={true} isScheduleTask={true}/>
        {task.subTasks.map((subTask) => {
                return <TaskData key={subTask.id_subtask} task={subTask} setIsUpdating={null} deleteСurrentTask={null} isTaskOrSubTask={false} isScheduleTask={true}/>
        })}
    </div>
  )
}
