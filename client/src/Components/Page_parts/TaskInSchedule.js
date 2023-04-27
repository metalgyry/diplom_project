import React from 'react'
import TaskData from './TaskData'

export default function TaskInSchedule({task}) {
  return (
    <div>
        <TaskData task={task} setIsUpdating={null} deleteСurrentTask={null} isTaskOrSubTask={true} isScheduleTask={true}/>
        <br/>
        {task.subTasks.map((subTask) => {
                return <TaskData key={subTask.id_subtask} task={subTask} setIsUpdating={null} deleteСurrentTask={null} isTaskOrSubTask={false} isScheduleTask={true}/>
        })}
        <br/><br/>
    </div>
  )
}
