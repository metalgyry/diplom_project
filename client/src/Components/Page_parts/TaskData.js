import React from 'react'
import { priorityList } from '../variables';
import DeleteButton from './DeleteButton';

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
                                <DeleteButton textButton={'Удалить'} deleteMethod={deleteTask} id={null}/>
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
