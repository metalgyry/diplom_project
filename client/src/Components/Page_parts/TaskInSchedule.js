import React from 'react'
import TaskData from './TaskData'

export default function TaskInSchedule({task}) {
  return (
    <div className='schedule_task'>
        <TaskData task={task} setIsUpdating={null} deleteСurrentTask={null} isTaskOrSubTask={true} isScheduleTask={true}/>
        {task.subTasks.map((subTask) => {
                return <TaskData key={subTask.id_subtask} task={subTask} setIsUpdating={null} deleteСurrentTask={null} isTaskOrSubTask={false} isScheduleTask={true}/>
        })}
    </div>
  )
}
