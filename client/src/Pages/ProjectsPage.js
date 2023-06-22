import React, { useState } from 'react'
import Project from '../Components/Page_parts/ProjectsPage/Project';
import ProjectList from '../Components/Page_parts/ProjectsPage/ProjectList';

export default function ProjectsPage() {
    const [isProjectSelected, setIsProjectSelected] = useState(false);
    const [idCurrentProject, setIdCurrentProject] = useState(0);

    const selectedButton = (id_project) => {
      setIdCurrentProject(id_project);
      setIsProjectSelected(true);
    };

    const exitButton = () => {
      setIdCurrentProject(0);
      setIsProjectSelected(false);
    };
    
    return (
      <div className='project_page'>
        {
          isProjectSelected ?
          <Project setIsProjectSelected={exitButton} id_project={idCurrentProject} />
          :
          <ProjectList setSelectProject={selectedButton} />
        }
      </div>
    )
}
