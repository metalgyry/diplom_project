import React from 'react'
import { priorityList } from '../../variables';
import DeleteButton from '../DeleteButton';

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
        <div className={`${isScheduleTask ? 'schedule_' : ''}${isTaskOrSubTask ? '' : 'sub'}task_data st_${task.priority == 1 ? 'low' : ''}${task.priority == 2 ? 'normal' : ''}${task.priority == 3 ? 'high' : ''}`}>
            <div className={`${isTaskOrSubTask ? '' : 'sub'}task_inform`}>
                <div className={`${isTaskOrSubTask ? '' : 'sub'}task_content`} >
                    {task.content}
                </div>
                <div className={`${isTaskOrSubTask ? 'task_date_priority' : 'subtask_priority'}`}>
                    {
                        isTaskOrSubTask ?
                            <div className='task_date'>
                                {`Дата: ${task.date.replaceAll('-','.')}`}
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
                                <div className='update_button' title='Изменить' onClick={() => setIsUpdating(true)}></div>
                                <DeleteButton textButton={'Удалить'} deleteMethod={deleteTask} id={null}/>
                            </>
                    }          
                </div>
        </div>
    )
}
