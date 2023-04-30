import React, { useState } from 'react'
import AddOrUpdateProject from './AddOrUpdateProject';
import ProjectData from './ProjectData'

export default function ProjectItem({project, selectProject, id_creator, updateProject, deleteProject, exitProject}) {
    const [isUpdating, setIsUpdating] = useState(false);

    return (
        <div className='project'>
            {
                isUpdating ? 
                    <AddOrUpdateProject id_creator={project.id_creator} name_creator={project.full_name}
                        modifiedProject={project} setIsCreatingOrUpdating={setIsUpdating} methodProject={updateProject} isAddOrUpdate={false} />
                :
                    <ProjectData project={project} selectProject={selectProject} setIsUpdating={setIsUpdating}
                    isMyProject={(id_creator == project.id_creator) ? true : false}
                     deleteProject={deleteProject} exitProject={exitProject}
                    />
            }
        </div>
    )
}
