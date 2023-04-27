import { createTaskOrSubTask, deleteTaskOrSubTask, updateTaskOrSubTask } from '../http/userAPI';

export const createNewTask = async (task, setArray, array, id_student, id_course, isTaskOrSubTask) => {
    console.log("CREATE NEW Task");
    try {
        let newTask = {...task, id_student: id_student, id_course: id_course};
        console.log(newTask);
        const response = await createTaskOrSubTask(newTask, isTaskOrSubTask);
        console.log(response.data);
        if(response.status === 200) {
            setArray([...array, response.data]);
        }else {
            alert("Не удалось создать задачу!"); // измениить вывод из response ошибки по моему стандарту
        }
    } catch (error) {
        alert("Ошибка: " + error.response.data.error);
    }
};

export const updateCurrentTask = async (changeTask, setArray, array, isTaskOrSubTask) => {
    console.log("UPDATE Task");
    try {
        const response = await updateTaskOrSubTask(changeTask, isTaskOrSubTask);
        console.log(response.data);
        if(response.status === 200) {
            if(isTaskOrSubTask) {
                setArray(array.map((task) => {
                    if(task.id_task == response.data.id_task) {
                        return {...task, content: response.data.content, date: response.data.date, priority: response.data.priority};
                    }else {
                        return task;
                    }
                }));
            }else {
                setArray(array.map((subtask) => {
                    if(subtask.id_subtask == response.data.id_subtask) {
                        return {...subtask, content: response.data.content, priority: response.data.priority};
                    }else {
                        return subtask;
                    }
                }));
            }
            
        }else {
            alert("Не удалось изменить задачу!"); // измениить вывод из response ошибки по моему стандарту
        }
    } catch (error) {
        alert("Ошибка: " + error.response.data.error);
    }
};

export const deleteCurrentTask = async (id, setArray, array, isTaskOrSubTask) => {
    console.log("DELETE Task");
    try {
        const response = await deleteTaskOrSubTask(id, isTaskOrSubTask);
        console.log(response.data);
        if(response.status === 200) {
            if(isTaskOrSubTask) {
                setArray(array.filter(task => task.id_task != response.data.id_task));
            }else {
                setArray(array.filter(subtask => subtask.id_subtask != response.data.id_subtask));
            }
            
        }else {
            alert("Не удалось удалить задачу!"); // измениить вывод из response ошибки по моему стандарту
        }
    } catch (error) {
        alert("Ошибка: " + error.response.data.error);
    }
};