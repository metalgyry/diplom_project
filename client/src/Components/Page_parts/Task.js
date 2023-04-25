import React, { useState } from 'react'
import AddOrUpdateTask from './AddOrUpdateTask';
import SubTask from './SubTask';
import TaskData from './TaskData';

export default function Task({task, updateTask, deleteTask}) { // использование isTask(Boolean) нельзя по правилам React т.к. нарушится логика работы хуков, поэтому создан SubTask
    const [arraySubTasks, setArraySubTasks] = useState(task.subTasks);
    const [isUpdating, setIsUpdating] = useState(false);

    // ТУТ НУЖНО ВСТАВКИ из КОДА КОТОРЫЙ Я ВЫНЕСУ ИЗ COURSE И БУДУ СЮДА EXPORTить ПЕРЕДАВ
    // ТУДА ТРИ(ЧЕТЫРЕ) ПАРАМЕТРА arraySubTasks, setArraySubTasks, task(id_task), isTaskOrSubTask(тут будет(именно здесь) false)

    return (
        <div className='task'>
            {
                isUpdating ?
                <AddOrUpdateTask task={task} setIsUpdating={setIsUpdating} methodTask={updateTask} isTaskOrSubTask={true} isAddOrUpdate={false}/>
                :
                <TaskData task={task} setIsUpdating={setIsUpdating} deleteСurrentTask={deleteTask} isTaskOrSubTask={true}/>
            }
            {arraySubTasks.map((subTask) => {
                return <SubTask key={subTask.id_subtask} subTask={subTask} updateSubTask={updateSubTask} deleteSubTask={deleteSubTask}/>
            })}
            <AddOrUpdateTask task={null} setIsUpdating={null} methodTask={createSubTask} isTaskOrSubTask={false} isAddOrUpdate={true}/>
            <br/>
        </div>
    )
}
