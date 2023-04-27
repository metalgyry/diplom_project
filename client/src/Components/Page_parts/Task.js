import React, { useState } from 'react'
import AddOrUpdateTask from './AddOrUpdateTask';
import SubTask from './SubTask';
import TaskData from './TaskData';
import { createNewTask, updateCurrentTask, deleteCurrentTask } from '../methodTask';

export default function Task({task, updateTask, deleteTask}) { // использование isTask(Boolean) нельзя по правилам React т.к. нарушится логика работы хуков, поэтому создан SubTask
    const [arraySubTasks, setArraySubTasks] = useState(task.subTasks);
    const [isUpdating, setIsUpdating] = useState(false);

    const createSubTask = (subTask) => {
        createNewTask(subTask, setArraySubTasks, arraySubTasks, task.id_student, task.id_course, false);
    };

    const updateSubTask = (subTask) => {
        updateCurrentTask(subTask, setArraySubTasks, arraySubTasks, false);
    };

    const deleteSubTask = (id_subtask) => {
        deleteCurrentTask(id_subtask, setArraySubTasks, arraySubTasks, false);
    };

    return (
        <div className='task'>
            {
                isUpdating ?
                <AddOrUpdateTask task={task} setIsUpdating={setIsUpdating} methodTask={updateTask} isTaskOrSubTask={true} isAddOrUpdate={false}/>
                :
                <TaskData task={task} setIsUpdating={setIsUpdating} deleteСurrentTask={deleteTask} isTaskOrSubTask={true} isScheduleTask={false}/>
            }
            {arraySubTasks.map((subTask) => {
                return <SubTask key={subTask.id_subtask} subTask={subTask} updateSubTask={updateSubTask} deleteSubTask={deleteSubTask}/>
            })}
            <AddOrUpdateTask task={task} setIsUpdating={null} methodTask={createSubTask} isTaskOrSubTask={false} isAddOrUpdate={true}/>
            <br/>
        </div>
    )
}
