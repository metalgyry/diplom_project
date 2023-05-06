import React from 'react'
import { useProjectTasks } from '../useProjectTasks'

export default function Project({id_project, setIsProjectSelected}) {
    const { projectName, projectStudents, projectTasks, projectTasksActions } = useProjectTasks(id_project);
    if(projectName && projectStudents && projectTasks) {
      console.log(projectName);
      console.log(projectStudents);
      console.log(projectTasks);
    }
    

    return (
      <div>
        <div className='in_project_header'>
          <span className='in_project_name'>
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
            console.log(arrayName);
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

        </div>
      </div>
    )
}
