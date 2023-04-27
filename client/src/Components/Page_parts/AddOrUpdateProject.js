import React, { useEffect, useState } from 'react'

export default function AddOrUpdateProject({project, setIsUpdating, methodProject, isAddOrUpdate}) {
    const [clickAddOrUpdateButton, setClickAddOrUpdateButton] = useState(false);
    const [submitButton, setSubmitButton] = useState(true);
    const [projectName, setProjectName] = useState(() => {return (isAddOrUpdate ? '' : project.name)});
    let textAddOrUpdateButton = '';
    let textCreateOrChangeButton = '';

    if(isAddOrUpdate) {
        textAddOrUpdateButton = "Создать";
        textCreateOrChangeButton = "СОЗДАТЬ ";
    }else {
        textAddOrUpdateButton = "Изменить";
    }

    useEffect(() => {
        if( projectName.length > 0 ) {
            setSubmitButton(false);
        }else {
            setSubmitButton(true);
        }
    }, [projectName]);

    const cancelButton = () => {
        if(!isAddOrUpdate) {
            setIsUpdating(false);
        }
        setClickAddOrUpdateButton(false); 
    };

    const createOrUpdateProject = () => {
        let currentProject = {name: projectName};
        if (!isAddOrUpdate) {
            currentProject = {...currentProject, id_group_project: project.id_group_project};
        }
        console.log(currentProject);
        methodProject(currentProject);
        setProjectName("");
        cancelButton();
    }

    //  <-----contenteditable='true'---->

    return (
        <div className='add_or_update_task'>
            {
                clickAddOrUpdateButton ?
                <div>
                    <textarea value={projectName} className='project_name' wrap='soft' cols={50} rows={8} autoFocus={true} required onChange={e => setProjectName(e.target.value)}></textarea>
                    <button type="button" className='add_or_update_button' onClick={createOrUpdateProject} disabled={submitButton}>{textAddOrUpdateButton}</button>
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