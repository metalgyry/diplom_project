import React, { useContext, useState } from 'react'
import { Context } from '../../index';
import { createNewTask, updateCurrentTask, deleteCurrentTask } from '../methodTask';
import AddOrUpdateTask from './AddOrUpdateTask'
import Task from './Task';

export default function Course({course}) {
    const { userStore } = useContext(Context)
    const [arrayTasks, setArrayTasks] = useState(course.tasks);
    console.log(arrayTasks);

    const methodCreateNewTask = (task) => {
        createNewTask(task, setArrayTasks, arrayTasks, userStore.user.id_student, course.id_course, true);
    };

    const methodUpdateCurrentTask = (changeTask) => {
        updateCurrentTask(changeTask, setArrayTasks, arrayTasks, true);
    };

    const methodDeleteCurrentTask = (id_task) => {
        deleteCurrentTask(id_task, setArrayTasks, arrayTasks, true);
    };

    return (
        <div className='course'>
            <div className='course_name'>
                {course.name}
            </div>
            {arrayTasks.map((task) => {
                return <Task key={task.id_task} task={task} updateTask={methodUpdateCurrentTask} deleteTask={methodDeleteCurrentTask}/>
            })}
            <AddOrUpdateTask task={null} setIsUpdating={null} methodTask={methodCreateNewTask} isTaskOrSubTask={true} isAddOrUpdate={true}/>
            <br/><br/>
        </div>
    )
}
