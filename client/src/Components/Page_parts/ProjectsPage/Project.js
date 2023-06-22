import React, { useContext } from 'react'
import { useProjectTasks } from '../../useProjectTasks'
import '../../../styles/all_style.css';
import ProjectColumn from './ProjectColumn';
import { Context } from '../../../index';

export default function Project({id_project, setIsProjectSelected}) {
    const { projectStore } = useContext(Context);
    const { projectTasksActions } = useProjectTasks(id_project, projectStore);

    const columnNames = ['Все задачи','Необходимо выполнить','В процессе','Выполнены'];

    return (
      <div>
        <div className='in_project_title'>
          <div className='in_project_header'>
            <span className='in_project_name'>
              {`Проект: ${projectStore.projectInfo.name }`} 
            </span>
            <span className='in_project_exit_button_span'>
              <button type="button" className='in_project_exit_button' onClick={() => setIsProjectSelected(false)}>Выйти</button>
            </span>
          </div>
          <div className='in_project_list_students'>
            {'Участники: '}
            {projectStore.projectInfo.students && projectStore.projectInfo.students.map((student, index) => {
              let arrayName = student.full_name.split(' ');
              let end = '';
              if(index == (projectStore.projectInfo.students.length - 1) ) {
                end = '.';
              }else {
                end = '; ';
              }
              return <span key={student.id_student} className='in_project_student_name'>
                  {`${arrayName[0]} ${arrayName[1][0]}. ${arrayName[2][0]}.${end}`}
                </span>
            })}
          </div>
        </div>
        <div className='in_project_tasks_table'>
          {
            columnNames.map((column, index) => {
              return <ProjectColumn key={column} columnStatus={index} columnNames={column} projectIdCreator={projectStore.projectInfo.id_creator}
                  tasks={projectStore.projectTasks[index] ? projectStore.projectTasks[index] : []} projectTasksActions={projectTasksActions}/>
            })
          }
        </div>
      </div>
    )
}
