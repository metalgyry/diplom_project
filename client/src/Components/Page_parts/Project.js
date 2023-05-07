import React, { useEffect, useState } from 'react'
import { useProjectTasks } from '../useProjectTasks'
import '../../styles/all_style.css';
import ProjectColumn from './ProjectColumn';

export default function Project({id_project, setIsProjectSelected}) {
  const [projectTasks, setProjectTasks] = useState([[]]);
    const {projectName, projectIdCreator, projectStudents, projectTasksActions } = useProjectTasks(id_project,projectTasks, setProjectTasks);
    const [arr, setArr] = useState([5,5,5,5]);

    const columnNames = ['Все задачи','Необходимо выполнить','В процессе','Выполнены'];

    return (
      <div>
        <div className='in_project_header'>
          <span className='in_project_name'>
            {arr.map(el => el)}
            ВЕРНУТЬ SOCKET = NULL В useProjectTasks
            <br/>
            {`Проект: ${projectName }`} 
          </span>
          <span className='in_project_exit_button_span'>
            <button type="button" className='in_project_exit_button' onClick={() => setIsProjectSelected(false)}>Выйти из проекта</button>
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
        <div className='in_project_tasks_table'>
          {
            columnNames.map((column, index) => {
              return <ProjectColumn key={column} columnStatus={index} columnNames={column} projectIdCreator={projectIdCreator}
                  tasks={projectTasks[index]} projectTasksActions={projectTasksActions}/>
            })
          }
        </div>
      </div>
    )
}
