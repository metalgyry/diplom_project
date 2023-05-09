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
        <div className={`${isScheduleTask ? 'schedule_' : ''}${isTaskOrSubTask ? '' : 'sub'}task_data`}>
            <div className={`${isTaskOrSubTask ? '' : 'sub'}task_inform`}>
                <div className={`${isTaskOrSubTask ? '' : 'sub'}task_content`} >
                    {task.content}
                </div>
                <div className={`${isTaskOrSubTask ? 'task_date_priority' : 'subtask_priority'}`}>
                    {
                        isTaskOrSubTask ?
                            <div className='task_date'>
                                {`Дата: ${task.date}`}
                            </div>
                        :
                            ''
                    }
                    Приоритет: {priorityList[task.priority]}
                    <div className='task_name_course'>
                        { (isScheduleTask && isTaskOrSubTask) ? `Курс: ${task.name_course}` : ''}
                    </div>
                </div>
            </div>
            <div className={`${isTaskOrSubTask ? 'task' : 'subtask'}_change_buttons`}>
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
    )
}
