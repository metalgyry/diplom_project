import React, { useState, useEffect } from 'react'
import AddOrUpdateProjectTask from './AddOrUpdateProjectTask'
import DeleteButton from '../DeleteButton';

export default function ProjectTask({task, projectIdCreator, idStudent, projectTasksActions}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [leftStatusButton, setLeftStatusButton] = useState(false);
    const [rightStatusButton, setRightStatusButton] = useState(false);
    
    let arrayName = task.creator_name.split(' ');

    useEffect(() => {
        if(task.status == 0 || task.status == 3) {
            if(task.status == 0){
                setLeftStatusButton(true);
            }else {
                setRightStatusButton(true);
            }
        }else {
            setLeftStatusButton(false);
            setRightStatusButton(false);
        }
    }, [leftStatusButton, rightStatusButton]);

    const changeStatusProjectTask = (isLeftOrRight) => {
        let changeNum;
        if(isLeftOrRight) {
            changeNum = -1;
        }else {
            changeNum = 1;
        }
        projectTasksActions.updateTaskStatus({...task, status: task.status + changeNum});
    };
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
                                (((idStudent == projectIdCreator) || (task.id_creator == idStudent)) && (task.status == 0)) ?
                                    <>
                                        <div className='update_button' title='Изменить' onClick={() => setIsUpdating(true)}></div>
                                        <DeleteButton textButton={'Удалить'} deleteMethod={projectTasksActions.deleteTask} id={task.id_task}/>
                                    </>
                                :
                                    ''
                            }
                        </div>
                        <div className='column_task_change_status_buttons'>
                            <button type='button' className='change_status_button' disabled={leftStatusButton} onClick={() => changeStatusProjectTask(true)}>{'<'}</button>
                            <button type='button' className='change_status_button' disabled={rightStatusButton} onClick={() => changeStatusProjectTask(false)}>{'>'}</button>
                        </div>
                </div>
            }
        </div>
    )
}
