import React, { useEffect, useState } from 'react'
import { getCoursesAndTasks } from '../http/userAPI';

export default function Tasks() {
  const [coursesAndTasks, setCoursesAndTasks] = useState([]);

  const getData = async () => {
    try {
      const response = await getCoursesAndTasks();
      const data = response.data;
      console.log(data);
      setCoursesAndTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect( () => {
    getData();
  }, []);


  return (
    <div className='tasks_page'>
      {coursesAndTasks.map((obj) => {
        return <div key={obj.id_course}>{obj.name}
          <div>
            { obj.tasks.map((task) => {return <div key={task.id_task}>{task.content} - <b>{obj.name}</b></div>}) }
          </div>
        </div>
      })
      }
    </div>
  )
}

//alt для того чтобы писать в нескольких строках