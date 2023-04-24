import React, { useState } from 'react'
import AddTask from './AddTask'
import Task from './Task';

export default function Course({course}) {
    const [arrayTasks, setArrayTasks] = useState(course.tasks);
    console.log(arrayTasks);

    const createTask = (task) => {
        // тут только алгоритм добавления новой задачи при помощи arrayTasks и setArrayTasks
    };

    const updateTask = (task) => {
        // тут только алгоритм удаления задачи при помощи arrayTasks и setArrayTasks
    };

    const deleteTask = (id_task) => {
        // тут только алгоритм удаления задачи при помощи arrayTasks и setArrayTasks
    };

    return (
        <div className='course'>
            <div className='course_name'>
                {course.name}
            </div>
            {arrayTasks.map((task) => {
                return <Task key={task.id_task} task={task} updateTask={updateTask} deleteTask={deleteTask}/>
            })}
            <AddTask id={course.id_course} add={createTask} isAddTask={true}/>
            <br/><br/>
        </div>
    )
}
