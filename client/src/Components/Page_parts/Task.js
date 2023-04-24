import React, { useState } from 'react'
import AddTask from './AddTask';
import SubTask from './SubTask';
import TaskData from './TaskData';
import UpdateTask from './UpdateTask';

export default function Task({task, updateTask, deleteTask}) { // использование isTask(Boolean) нельзя по правилам React т.к. нарушится логика работы хуков, поэтому создан SubTask
    const [arraySubTasks, setArraySubTasks] = useState(task.subTasks);
    const [isUpdating, setIsUpdating] = useState(false);

    const createSubTask = (subTask) => {
        // тут только алгоритм добавления новой задачи при помощи arrayTasks и setArrayTasks
    };

    const updateSubTask = (subTask) => {
        // тут только алгоритм удаления задачи при помощи arrayTasks и setArrayTasks
    };

    const deleteSubTask = (id_subtask) => {
        // тут только алгоритм удаления задачи при помощи arrayTasks и setArrayTasks
    };

    return (
        <div className='task'>
            {
                isUpdating ?
                <UpdateTask task={task} setIsUpdating={setIsUpdating} updateTask={updateTask} isTaskOrSubTask={true}/>
                :
                <TaskData task={task} setIsUpdating={setIsUpdating} deleteTask={deleteTask} isTaskOrSubTask={true}/>
            }
            {arraySubTasks.map((subTask) => {
                return <SubTask key={subTask.id_subtask} subTask={subTask} updateSubTask={updateSubTask} deleteSubTask={deleteSubTask}/>
            })}
            <AddTask id={task.id_task} add={createSubTask} isTaskOrSubTask={false}/>
            <br/>
        </div>
    )
}
