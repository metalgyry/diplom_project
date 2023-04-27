import React from 'react'

export default function ProjectData({project, selectProject, setIsUpdating, isMyProject, deleteProject}) {

    const deleteCurrentProject = () => {
        deleteProject(project.id_group_project);
    };

    return (
        <div className='project_data'>
            <div className='project_name' >
                {project.name}
            </div>
            <div className='project_change_button'>
                {
                    isMyProject ?
                    ''
                    :
                     <>
                    <button type='button' className='update_button' onClick={() => setIsUpdating(true)}>Изменить</button>
                    <button type='button' className='delete_button' onClick={deleteCurrentProject}>Удалить</button>
                    </>
                }
            </div>
            <div className='project_enter_button'>
                <button type='button' className='enter_button' onClick={() => selectProject(project.id_group_project)}>Изменить</button>
            </div>
        </div>
    )
}
