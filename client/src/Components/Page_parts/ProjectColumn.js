import React, { useContext, useEffect, useState } from 'react'
import ProjectTask from './ProjectTask'
import AddOrUpdateProjectTask from './AddOrUpdateProjectTask'
import { Context } from '../../index';

export default function ProjectColumn({columnStatus, columnNames, projectIdCreator, tasks, projectTasksActions}) {
    const { userStore } = useContext(Context);
    console.log("ProjectColumn: ", tasks);
    //console.log("ProjectColumn: ", tasks.length > 0);
    
    //const [columnTasks, setColumnTasks] = useState([]);

    // useEffect(() => {
    //     setColumnTasks(tasks);
    // },[tasks]);

    // const createProjectTask = (projectNewTask) => {
    //     projectTasksActions.addTask(projectNewTask);
    // };

    // const updateProjectTask = (projectUpdateTask) => {
    //     projectTasksActions.updateTask(projectUpdateTask);
    // };

    // const updateProjectTaskStatus = (projectUpdateTaskStatus) => {
    //     projectTasksActions.updateTaskStatus(projectUpdateTaskStatus);
    // };

    // const deleteProjectTask = (projectDeleteTask) => {
    //     projectTasksActions.deleteTask(projectDeleteTask);
    // };

  return (
    <div className='project_column'>
        <div className='project_column_name'>
            {columnNames}
        </div>
        <div className='create_project_task_button'>
            {
                (columnStatus == 0) ?
                    <AddOrUpdateProjectTask task={null} idCreator={userStore.user.id_student}
                        nameCreator={userStore.user.full_name} setIsUpdating={null} methodTask={projectTasksActions.addTask} isAddOrUpdate={true}
                    />
                :
                    ''
            }
        </div>
        <div className='project_column_tasks'>
            {
                (tasks.length > 0) ?
                tasks.map((task) => {
                    return <ProjectTask key={task.id_task} task={task} projectIdCreator={projectIdCreator}
                        idStudent={userStore.user.id_student} projectTasksActions={projectTasksActions}
                    />
                })
                :
                ''
            }
        </div>
    </div>
  )
}
