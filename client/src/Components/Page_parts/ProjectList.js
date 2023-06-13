import React, { useContext, useEffect, useState } from 'react'
import { allProjects, createProject, deleteProject, exitStudentProject, updateProject } from '../../http/userAPI';
import { Context } from '../../index';
import AddOrUpdateProject from './AddOrUpdateProject';
import ProjectItem from './ProjectItem';

export default function ProjectList({setSelectProject}) {
  const { userStore } = useContext(Context);
  const [arrayProjects, setArrayProjects] = useState([]);
  const [isEmptyListProjects, setIsEmptyListProjects] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const getData = async () => {
    try {
      const response = await allProjects();
      if(response.status === 200) {
        const data = response.data;
        console.log(data);
        if(data.length > 0) {
          setIsEmptyListProjects(false);
        }
        setArrayProjects(data.reverse());
        setIsLoading(true);
      } else {
        alert("Ошибка: " + response.data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Ошибка: " + error.response.data.error);
    }
  };

  useEffect( () => {
    getData();
  }, []);
    
    const methodCreateProject = async (project) => {
      console.log("CREATE NEW Project");
      try {
          //let newProject = {...project, id_creator: userStore.user.id_student};
          console.log(project);
          const response = await createProject(project);
          console.log(response.data);
          if(response.status === 200) {
            setArrayProjects([response.data, ...arrayProjects]);
            setIsEmptyListProjects(false);
          }else {
              alert("Не удалось создать проект!"); // измениить вывод из response ошибки по моему стандарту
          }
      } catch (error) {
          alert("Ошибка: " + error.response.data.error);
      }
    };

    const methodUpdateProject = async (project) => {
      console.log("UPDATE Project");
      try {
          const response = await updateProject(project);
          console.log(response.data);
          if(response.status === 200) {
            setArrayProjects(arrayProjects.map((project) => {
              if(project.id_group_project == response.data.id_group_project) {
                  return {...project, name: response.data.name};
              }else {
                  return project;
              }
            }));
          }else {
            alert("Ошибка: " + response.data.error);
          }
      } catch (error) {
          alert("Ошибка: " + error.response.data.error);
      }
    };


    const methodDeleteProject = async (id) => {
      console.log("DELETE Project");
      try {
          const response = await deleteProject(id);
          console.log(response.data);
          if(response.status === 200) {
            setArrayProjects(arrayProjects.filter(project => project.id_group_project != id));
            if((arrayProjects.length - 1) == 0) {
              setIsEmptyListProjects(true);
            }
          }else {
            alert("Ошибка: " + response.data.error);
          }
      } catch (error) {
          alert("Ошибка: " + error.response.data.error);
      }
    };

    const methodExitProject = async (id) => {
      console.log("Exit Project");
      try {
          const response = await exitStudentProject(id);
          console.log(response.data);
          if(response.status === 200) {
            setArrayProjects(arrayProjects.filter(project => project.id_group_project != id));
          }else {
              alert("Не удалось выйти из проекта!"); // измениить вывод из response ошибки по моему стандарту
          }
      } catch (error) {
          alert("Ошибка: " + error.response.data.error);
      }
    };

    // TODO: сделать только подумать сперва т.к. придется также сделать функционал добавления ДО заполнения новых студентов и также
    // метод (наверно сделать) исключения студента создателем проекта
    //
    // сделать кнопку выйти из проекта с последующим окном подтверждения, также
    //  сделать это и на сервере
    // ВЫЙТИ МОЖЕТ ТОЛЬКО !!! ____НЕ____ СОЗДАТЕЛЬ!!!
    
    return (
      <div className='projects'>
        <div className='title_project_list_page'>
          { isLoading && <b>{'Проекты: '}</b> }
          {
            isCreating ?
              <AddOrUpdateProject id_creator={userStore.user.id_student} name_creator={userStore.user.full_name}
                modifiedProject={null} setIsCreatingOrUpdating={setIsCreating} methodProject={methodCreateProject} isAddOrUpdate={true} /> 
            :
            isLoading && <button type='button' className='create_button' onClick={() => setIsCreating(true)}>СОЗДАТЬ ПРОЕКТ</button>
          }
        </div>
        {
          isEmptyListProjects ?
            <div className='empty_list_projects'>
              {
                isLoading && 'Пока нет ни одного проекта.'
              }
            </div>
          :
            <div className='projects_list'>
              {arrayProjects.map((projectItem) => {
                return <ProjectItem key={projectItem.id_group_project} project={projectItem} selectProject={setSelectProject}
                        id_creator={userStore.user.id_student} updateProject={methodUpdateProject}
                        deleteProject={methodDeleteProject} exitProject={methodExitProject}
                        />
              })}
            </div> 
        }
      </div>
    )
}
