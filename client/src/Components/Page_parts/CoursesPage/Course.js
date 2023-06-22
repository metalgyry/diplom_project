import React, { useState } from 'react'
// import { Context } from '../../../index';
import { createNewTask, updateCurrentTask, deleteCurrentTask } from '../../methodTask';
import AddOrUpdateCourse from './AddOrUpdateCourse';
import AddOrUpdateTask from './AddOrUpdateTask'
import DeleteButton from '../DeleteButton';
import Task from './Task';

export default function Course({course, updateCourse, deleteCourse}) {
    // const { userStore } = useContext(Context)
    const [arrayTasks, setArrayTasks] = useState(course.tasks);
    const [isUpdating, setIsUpdating] = useState(false);
    let textDeleteButton = 'Удалить';

    const methodCreateNewTask = (task) => {
        createNewTask(task, setArrayTasks, arrayTasks, course.id_course, true);
    };

    const methodUpdateCurrentTask = (changeTask) => {
        updateCurrentTask(changeTask, setArrayTasks, arrayTasks, true);
    };

    const methodDeleteCurrentTask = (id_task) => {
        deleteCurrentTask(id_task, setArrayTasks, arrayTasks, true);
    };

    return (
        <div className='course'>
            {
                isUpdating ?
                    <AddOrUpdateCourse course={course} setIsUpdating={setIsUpdating} methodCourse={updateCourse} isAddOrUpdate={false} />
                :
                    <div className='course_content'>
                        <div className='course_name'>
                            {course.name}
                        </div>
                        <div className='course_name_buttons'>
                            <div className='update_button' title='Изменить' onClick={() => {setIsUpdating(true)}}></div>
                            <DeleteButton textButton={textDeleteButton} deleteMethod={deleteCourse} id={course.id_course}/>
                        </div>
                    </div>
            }
            {
                <div className='course_title_tasks'>
                    {'Задачи:'}
                </div>
            }
            <div className='course_list_tasks'>
                {arrayTasks.map((task) => {
                    return <Task key={task.id_task} task={task} updateTask={methodUpdateCurrentTask} deleteTask={methodDeleteCurrentTask}/>
                })}
            </div>
            <AddOrUpdateTask task={null} setIsUpdating={null} methodTask={methodCreateNewTask} isTaskOrSubTask={true} isAddOrUpdate={true}/>
        </div>
    )
}
