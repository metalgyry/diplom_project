import React, { useEffect, useState } from 'react'
import Course from '../Components/Page_parts/Course';
import { getCoursesAndTasks } from '../http/userAPI';

export default function TasksPage() {
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

  return (
    <div className='tasks_page'>
      ПРИ ПЕРЕХОДЕ НА "/" ЛИБО ВООБЩЕ БЕЗ НЕЕ, ПОЯВЛЯЕТСЯ HEADER, НО А ВООБЩЕ ДОЛЖЕН ПРОИСХОДИТЬ ПЕРЕХОД НА "/TASKS"
      {coursesAndTasks.map((obj) => {
        return <Course key={obj.id_course} course={obj}/>  })
      }
    </div>
  )
}

//alt для того чтобы писать в нескольких строках