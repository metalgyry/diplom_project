import React, { useEffect, useState } from 'react'

export default function AddOrUpdateProjectTask({task, idCreator, nameCreator, setIsUpdating, methodTask, isAddOrUpdate}) {
    const [clickAddOrUpdateButton, setClickAddOrUpdateButton] = useState(false);
    const [submitButton, setSubmitButton] = useState(true);
    const [content, setContent] = useState(() => {return (isAddOrUpdate ? '' : task.content)});
    let textAddOrUpdateButton = '';
    let textCreateOrChangeButton = '';

    if(isAddOrUpdate) {
        textAddOrUpdateButton = "Создать";
        textCreateOrChangeButton = "СОЗДАТЬ ЗАДАЧУ";
    }else {
        textAddOrUpdateButton = "Изменить";
    }

    useEffect(() => {
        if(content.length > 0) {
            setSubmitButton(false);
        }else {
            setSubmitButton(true);
        }
    }, [content]);

    const cancelButton = () => {
        if(!isAddOrUpdate) {
            setIsUpdating(false);
        }
        setClickAddOrUpdateButton(false); 
    };

    const createOrUpdateTask = () => {
        let currentTask = {content: content};
        if (isAddOrUpdate) {
            currentTask = {...currentTask, id_creator: idCreator, creator_name: nameCreator};
        }else {
            currentTask = {...currentTask, id_task: task.id_task, id_creator: task.id_creator, creator_name: task.creator_name};
        }
        console.log(currentTask);
        methodTask(currentTask);
        setContent("");
        cancelButton();
    }

    //  <-----contenteditable='true'---->

    return (
        <div className='add_or_update_project_task'>
            {
                clickAddOrUpdateButton ?
                <div>
                    <textarea value={content} className='project_task_content' wrap='soft' rows={5} autoFocus={true} required onChange={e => setContent(e.target.value)}></textarea>                  
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
}
