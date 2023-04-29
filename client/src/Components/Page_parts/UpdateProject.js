import React, { useEffect, useState } from 'react'
import '../../styles/all_style.css';

export default function UpdateProject({project, setIsUpdating, updateProject}) {
    const [submitButton, setSubmitButton] = useState(true);
    const [projectName, setProjectName] = useState(project.name);
    let textUpdateButton = 'Изменить';
    let textCancelButton = 'Отмена';

    useEffect(() => {
        if( projectName.length > 0 ) {
            setSubmitButton(false);
        }else {
            setSubmitButton(true);
        }
    }, [projectName]);

    const cancelButton = () => {
        setIsUpdating(false);
    };

    const updateCurrentProject = () => {
        let currentProject = {name: projectName, id_group_project: project.id_group_project};
        console.log(currentProject);
        updateProject(currentProject);
        setProjectName("");
        cancelButton();
    }

    //  <-----contenteditable='true'---->

    return (
        <div className='update_project'>
            <div>
                <textarea value={projectName} className='project_name_change' wrap='soft' cols={50} rows={3} autoFocus={true} required onChange={e => setProjectName(e.target.value)}></textarea>
                <button type="button" className='update_button' onClick={updateCurrentProject} disabled={submitButton}>{textUpdateButton}</button>
                <button type="button" className='cancel_button' onClick={cancelButton}>{textCancelButton}</button>
            </div>
        </div>
    )
}