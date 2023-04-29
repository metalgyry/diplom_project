import React, { useState } from 'react'
import UpdateProject from './UpdateProject';
import ProjectData from './ProjectData'

export default function ProjectItem({project, selectProject, id_creator, updateProject, deleteProject, exitProject}) {
    const [isUpdating, setIsUpdating] = useState(false);

    return (
        <div className='project'>
            {
                isUpdating ? 
                    <UpdateProject project={project} setIsUpdating={setIsUpdating} updateProject={updateProject} />
                :
                    <ProjectData selectProject={selectProject} setIsUpdating={setIsUpdating}
                    isMyProject={(id_creator == project.id_creator) ? true : false}
                    project={project} deleteProject={deleteProject} exitProject={exitProject}
                    />
            }
        </div>
    )
}
