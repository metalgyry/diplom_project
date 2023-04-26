import React, { useEffect, useState } from 'react'
import Course from '../Components/Page_parts/Course';
import { getCoursesAndTasks } from '../http/userAPI';

export default function Tasks() {
  const [coursesAndTasks, setCoursesAndTasks] = useState([]);

  const getData = async () => {
    try {
      const response = await getCoursesAndTasks();
      if(response.status === 200) {
        const data = response.data;
        console.log(data);
        setCoursesAndTasks(data);
      } else {
        alert("Ошибка: " + response.data.error);
      }
    } catch (error) {
      console.log(error.response.data.error);
      alert("Ошибка: " + error.response.data.error);
    }
  };

  useEffect( () => {
    getData();
  }, []);

  /*
  {coursesAndTasks.map((obj) => {
    return <div key={obj.id_course}>{obj.name}
      <div>
        { obj.tasks.map((task) => {return <div key={task.id_task}>{task.content} - <b>{obj.name}</b></div>}) }
      </div>
    </div>
  })
  }
  */

  return (
    <div className='tasks_page'>
      {coursesAndTasks.map((obj) => {
        return <Course key={obj.id_course} course={obj}/>  })
      }
    </div>
  )
}

//alt для того чтобы писать в нескольких строках