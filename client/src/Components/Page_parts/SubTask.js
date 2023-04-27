import React, { useState } from 'react'
import TaskData from './TaskData';
import AddOrUpdateTask from './AddOrUpdateTask';

export default function SubTask({subTask, updateSubTask, deleteSubTask}) {
    const [isUpdating, setIsUpdating] = useState(false);
    
    return (
        <div className='task'>
            {
                isUpdating ?
                <AddOrUpdateTask task={subTask} setIsUpdating={setIsUpdating} methodTask={updateSubTask} isTaskOrSubTask={false} isAddOrUpdate={false}/>
                :
                <TaskData task={subTask} setIsUpdating={setIsUpdating} deleteСurrentTask={deleteSubTask} isTaskOrSubTask={false} isScheduleTask={false}/>
            }
            <br/>
        </div>
    )
}
