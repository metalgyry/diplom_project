import React, { useState } from 'react'
import TaskData from './TaskData';
import AddOrUpdateTask from './AddOrUpdateTask';

export default function SubTask({subTask, updateSubTask, deleteSubTask}) {
    const [isUpdating, setIsUpdating] = useState(false);
    
    return (
        <div className={`subtask st_${subTask.priority == 1 ? 'low' : ''}${subTask.priority == 2 ? 'normal' : ''}${subTask.priority == 3 ? 'high' : ''}`}>
            {
                isUpdating ?
                <AddOrUpdateTask task={subTask} setIsUpdating={setIsUpdating} methodTask={updateSubTask} isTaskOrSubTask={false} isAddOrUpdate={false}/>
                :
                <TaskData task={subTask} setIsUpdating={setIsUpdating} deleteСurrentTask={deleteSubTask} isTaskOrSubTask={false} isScheduleTask={false}/>
            }
        </div>
    )
}
