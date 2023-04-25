import React, { useContext, useState } from 'react'
import { createTask, deleteTask, updateTask } from '../../http/userAPI';
import { Context } from '../../index';
import AddOrUpdateTask from './AddOrUpdateTask'
import Task from './Task';

export default function Course({course}) {
    const { userStore } = useContext(Context)
    const [arrayTasks, setArrayTasks] = useState(course.tasks);
    console.log(arrayTasks);

    const createNewTask = async (task) => {
        console.log("CREATE NEW Task");
        try {
            let newTask = {...task, id_student: userStore.user.id_student, id_course: course.id_course};
            const response = await createTask(newTask);
            console.log(response.data);
            if(response.status === 200) {
                setArrayTasks([...arrayTasks, response.data]);
            }else {
                alert("Не удалось создать задачу!"); // измениить вывод из response ошибки по моему стандарту
            }
        } catch (error) {
            alert(error);
        }
    };

    const updateCurrentTask = async (changeTask) => {
        console.log("UPDATE Task");
        try {
            const response = await updateTask(changeTask);
            console.log(response.data);
            if(response.status === 200) {
                setArrayTasks(arrayTasks.map((task) => {
                    if(task.id_task == response.data.id_task) {
                        return {...task, content: response.data.content, date: response.data.date, priority: response.data.priority};
                    }else {
                        return task;
                    }
                }));
            }else {
                alert("Не удалось изменить задачу!"); // измениить вывод из response ошибки по моему стандарту
            }
        } catch (error) {
            alert(error);
        }
    };

    const deleteCurrentTask = async (id_task) => {
        console.log("DELETE Task");
        try {
            const response = await deleteTask(id_task);
            console.log(response.data);
            if(response.status === 200) {
                setArrayTasks(arrayTasks.filter(task => task.id_task != response.data.id_task));
            }else {
                alert("Не удалось удалить задачу!"); // измениить вывод из response ошибки по моему стандарту
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className='course'>
            <div className='course_name'>
                {course.name}
            </div>
            {arrayTasks.map((task) => {
                return <Task key={task.id_task} task={task} updateTask={updateCurrentTask} deleteTask={deleteCurrentTask}/>
            })}
            <AddOrUpdateTask task={null} setIsUpdating={null} methodTask={createNewTask} isTaskOrSubTask={true} isAddOrUpdate={true}/>
            <br/><br/>
        </div>
    )
}
