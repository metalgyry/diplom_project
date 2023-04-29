import React, { useState } from 'react'
import Project from '../Components/Page_parts/Project';
import ProjectList from '../Components/Page_parts/ProjectList';

export default function ProjectsPage() {
    const [isProjectSelected, setIsProjectSelected] = useState(false);
    const [idCurrentProject, setIdCurrentProject] = useState(0);

    const selectedButton = (id_project) => {
      setIdCurrentProject(id_project);
      setIsProjectSelected(true);
    };
    
    return (
      <div className='project_page'>
        {
          isProjectSelected ?
          <Project setIsProjectSelected={setIsProjectSelected} id_project={idCurrentProject} />
          :
          <ProjectList setSelectProject={selectedButton} />
        }
      </div>
    )
}
