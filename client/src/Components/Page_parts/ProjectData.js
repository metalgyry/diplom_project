import React from 'react'
import DeleteButton from './DeleteButton';

export default function ProjectData({project, selectProject, setIsUpdating, isMyProject, deleteProject, exitProject}) {
    let name_creator = project.name_creator.split(' ');
    name_creator = `${name_creator[0]} ${name_creator[1][0]}. ${name_creator[2][0]}.`

    return (
        <div className='project_data'>
            <div className='project_name' >
                Название: {project.name}
            </div>
            {
                project.name_creator ?
                    <div className='project_name_creator' >
                        Создатель: {name_creator}
                    </div>
                :
                    <></>
            }
            <div className='project_change_button'>
                {
                    isMyProject ?
                        <>
                        <button type='button' className='update_project_button' onClick={() => setIsUpdating(true)}>Изменить</button>
                        <DeleteButton textButton={'Удалить'} deleteMethod={deleteProject} id={project.id_group_project}/>
                        </>
                    :
                        <DeleteButton textButton={'Выйти из проекта'} deleteMethod={exitProject} id={project.id_group_project}/>
                }
            </div>
            <div className='project_enter_button'>
                <button type='button' className='enter_button' onClick={() => selectProject(project.id_group_project)}>Войти</button>
            </div>
        </div>
    )
}