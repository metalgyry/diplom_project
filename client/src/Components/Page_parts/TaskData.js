import React from 'react'

export default function TaskData({task, setIsUpdating, deleteTask, isTaskOrSubTask}) {
    return (
        <>
            <div className='task_main'>
                    <div className='task_content'>
                        {task.content}
                    </div>
                    <div className='task_change_button'>
                        <button type='button' className='update_button' onClick={() => setIsUpdating(true)}>Изменить</button>
                        <button type='button' className='delete_button' onClick={() => deleteTask(task.id_task)}>Удалить</button>
                    </div>
                </div>
                <div className='task_date_priority'>
                    { isTaskOrSubTask ? `Дата: ${task.date} | ` : ''}
                    Приоритет: {task.priority}
                </div>
        </>
    )
}
