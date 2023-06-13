import React, { useEffect, useState } from 'react'
import { useProjectTasks } from '../useProjectTasks'
import '../../styles/all_style.css';
import ProjectColumn from './ProjectColumn';

export default function Project({id_project, setIsProjectSelected}) {
    const {projectName, projectIdCreator, projectStudents, projectTasks, projectTasksActions } = useProjectTasks(id_project);

    const columnNames = ['Все задачи','Необходимо выполнить','В процессе','Выполнены'];

    return (
      <div>
        <div className='in_project_title'>
          <div className='in_project_header'>
            <span className='in_project_name'>
              {`Проект: ${projectName }`} 
            </span>
            <span className='in_project_exit_button_span'>
              <button type="button" className='in_project_exit_button' onClick={() => setIsProjectSelected(false)}>Выйти</button>
            </span>
          </div>
          <div className='in_project_list_students'>
            {'Участники: '}
            {projectStudents.map((student, index) => {
              let arrayName = student.full_name.split(' ');
              let end = '';
              if(index == (projectStudents.length - 1) ) {
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
              return <ProjectColumn key={column} columnStatus={index} columnNames={column} projectIdCreator={projectIdCreator}
                  tasks={projectTasks[index] ? projectTasks[index] : []} projectTasksActions={projectTasksActions}/>
            })
          }
        </div>
      </div>
    )
}
