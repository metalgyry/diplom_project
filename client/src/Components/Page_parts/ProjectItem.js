import React, { useState } from 'react'
import AddOrUpdateProject from './AddOrUpdateProject';
import ProjectData from './ProjectData'

export default function ProjectItem({project, selectProject, id_creator, updateProject, deleteProject}) {
    const [isUpdating, setIsUpdating] = useState(false);

    return (
        <div className='project'>
            {
                isUpdating ? 
                    <AddOrUpdateProject project={project} setIsUpdating={setIsUpdating} methodProject={updateProject} isAddOrUpdate={false}/>
                :
                    <ProjectData selectProject={selectProject} setIsUpdating={setIsUpdating}
                    isMyProject={(id_creator == project.id_creator) ? true : false}
                    project={project} deleteProject={deleteProject}
                    />
            }
        </div>
    )
}
