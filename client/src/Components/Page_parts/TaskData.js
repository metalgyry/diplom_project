import React from 'react'
import { priorityList } from '../variables';

export default function TaskData({task, setIsUpdating, deleteСurrentTask, isTaskOrSubTask, isScheduleTask}) {

    const deleteTask = () => {
        let id;
        if(isTaskOrSubTask) {
            id = task.id_task;
        }
        else {
            id = task.id_subtask;
        }
        deleteСurrentTask(id);
    };

    return (
        <>
            <div className='task_data'>
                    <div className='task_content' >
                        {task.content}
                    </div>
                    <div className='task_change_button'>
                        {
                            isScheduleTask ?
                            ''
                            :
                            <>
                                <button type='button' className='update_button' onClick={() => setIsUpdating(true)}>Изменить</button>
                                <button type='button' className='delete_button' onClick={deleteTask}>Удалить</button>
                            </>
                        }
                        
                    </div>
                </div>
                <div className='task_date_priority'>
                    { isTaskOrSubTask ? `Дата: ${task.date} | ` : ''}
                    Приоритет: {priorityList[task.priority]}
                    <br/>
                    { (isScheduleTask && isTaskOrSubTask) ? `Курс: ${task.name_course}` : ''}
                </div>
        </>
    )
}
