import React, { useState } from 'react'
import TaskData from './TaskData';
import UpdateTask from './UpdateTask';

export default function SubTask({subTask, updateSubTask, deleteSubTask}) {
    const [isUpdating, setIsUpdating] = useState(false);
    
    return (
        <div className='task'>
            {
                isUpdating ?
                <UpdateTask task={subTask} setIsUpdating={setIsUpdating} updateTask={updateSubTask} isTaskOrSubTask={false}/>
                :
                <TaskData task={subTask} setIsUpdating={setIsUpdating} deleteTask={deleteSubTask} isTaskOrSubTask={false}/>
            }
            <br/>
        </div>
    )
}
