import React, { useState } from 'react'
import AddOrUpdateProjectTask from './AddOrUpdateProjectTask'
import DeleteButton from './DeleteButton';

export default function ProjectTask({task, projectIdCreator, idStudent, projectTasksActions}) {
    const [isUpdating, setIsUpdating] = useState(false);
    
    let arrayName = task.creator_name.split(' ');

    // const deleteButton = () => {
    //     projectTasksActions.deleteTask(task);
    // }

    return (
        <div className='column_task'>
            {
                isUpdating ?
                    <AddOrUpdateProjectTask task={task} idCreator={null} nameCreator={null}
                        setIsUpdating={setIsUpdating} methodTask={projectTasksActions.updateTask}
                    isAddOrUpdate={false}/>
                :
                <div className='column_task_data'>
                        <div className='column_task_content' >
                            {task.content}
                        </div>
                        <div className='column_task_creator_name' >
                            {`${arrayName[0]} ${arrayName[1][0]}. ${arrayName[2][0]}.`}
                        </div>
                        <div className='column_task_change_button'>
                            {
                                ((task.id_creator == projectIdCreator) || (task.id_creator == idStudent)) ?
                                    <>
                                        <button type='button' className='update_button' onClick={() => setIsUpdating(true)}>Изменить</button>
                                        <DeleteButton textButton={'Удалить'} deleteMethod={projectTasksActions.deleteTask} id={task.id_task}/>
                                    </>
                                :
                                    ''
                            }
                        </div>
                </div>
            }
        </div>
    )
}
