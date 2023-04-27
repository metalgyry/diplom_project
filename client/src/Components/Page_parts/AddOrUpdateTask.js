import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { optionsSelect } from '../variables';

export default function AddOrUpdateTask({task, setIsUpdating, methodTask, isTaskOrSubTask, isAddOrUpdate}) {
    const [clickAddOrUpdateButton, setClickAddOrUpdateButton] = useState(false);
    const [submitButton, setSubmitButton] = useState(true);
    const [content, setContent] = useState(() => {return (isAddOrUpdate ? '' : task.content)});
    const [date, setDate] = useState(() => {return (isAddOrUpdate ? '' : task.date)});
    const [priority, setPriority] = useState(() => {return (isAddOrUpdate ? 2 : task.priority)});
    let textAddOrUpdateButton = '';
    let textCreateOrChangeButton = '';

    if(isAddOrUpdate) {
        textAddOrUpdateButton = "Создать";
        textCreateOrChangeButton = "СОЗДАТЬ ";
        if(isTaskOrSubTask) {
            textCreateOrChangeButton += "ЗАДАЧУ";
        }else {
            textCreateOrChangeButton += "ПОДЗАДАЧУ";
        }
    }else {
        textAddOrUpdateButton = "Изменить";
    }

    useEffect(() => {
        if((isTaskOrSubTask && content.length > 0 && date.length > 0) || (!isTaskOrSubTask && content.length > 0)) {
            setSubmitButton(false);
        }else {
            setSubmitButton(true);
        }
    }, [content, date]);

    const cancelButton = () => {
        if(!isAddOrUpdate) {
            setIsUpdating(false);
        }
        setClickAddOrUpdateButton(false); 
    };

    const createOrUpdateTask = () => {
        let currentTask = {content: content, priority: priority};
        if(isTaskOrSubTask) {
            currentTask = {...currentTask, date: date};
            if (!isAddOrUpdate) {
                currentTask = {...currentTask, id_task: task.id_task};
            }
        }else {
            currentTask = {...currentTask, id_task: task.id_task};
            if (!isAddOrUpdate) {
                currentTask = {...currentTask, id_subtask: task.id_subtask};
            }
        }
        console.log(currentTask);
        methodTask(currentTask);
        setContent("");
        setDate("");
        setPriority(2);
        cancelButton();
    }

    //  <-----contenteditable='true'---->

    return (
        <div className='add_or_update_task'>
            {
                clickAddOrUpdateButton ?
                <div>
                    <textarea value={content} className='task_content' wrap='soft' cols={50} rows={8} autoFocus={true} required onChange={e => setContent(e.target.value)}></textarea>
                    <div className='choice_date_priority'>
                        {
                            isTaskOrSubTask ?
                                <input value={date} type='date' min={''} max={''} className='task_date' required onChange={e => setDate(e.target.value)}/>
                            :
                            ''
                        }
                        <div className='choice_priority'>
                            Priority: 
                            <Select className='priority_select' options={optionsSelect} defaultValue={optionsSelect[priority - 1]} onChange={(selectedOption) => setPriority(selectedOption.value) }/>
                        </div>
                    </div>
                    
                    <button type="button" className='add_or_update_button' onClick={createOrUpdateTask} disabled={submitButton}>{textAddOrUpdateButton}</button>
                    <button type="button" className='cancel_button' onClick={cancelButton}>Отмена</button>
                </div>
                :
                isAddOrUpdate ?
                <button type="button" className='create_or_change_button' onClick={() => setClickAddOrUpdateButton(true)}>{textCreateOrChangeButton}</button>
                :
                setClickAddOrUpdateButton(true)
            }
        </div>
    )
    // <select size="1" name="priority"> // не доделан до активного элемента onChange...
    //     <option value={1}>Низкий</option>
    //     <option selected value={2}>Обычный</option>
    //     <option value={3}>Высокий</option>
    // </select>
}
