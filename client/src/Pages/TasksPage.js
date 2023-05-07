import React, { useEffect, useState, useContext } from 'react'
import AddOrUpdateCourse from '../Components/Page_parts/AddOrUpdateCourse';
import Course from '../Components/Page_parts/Course';
import { getCoursesAndTasks, createCourse, updateCourse, deleteCourse } from '../http/userAPI';
import { Context } from '../index';

export default function TasksPage() {
  const { userStore } = useContext(Context);
  const [coursesAndTasks, setCoursesAndTasks] = useState([]);
  const [isEmptyListCourses, setIsEmptyListCourses] = useState(true);

  const getData = async () => {
    try {
      const response = await getCoursesAndTasks();
      if(response.status === 200) {
        const data = response.data;
        console.log(data);
        if(data.length > 0) {
          setIsEmptyListCourses(false);
        }
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

  const methodCreateCourse = async (course) => {
    try {
      const newCourse = {...course, id_creator: userStore.user.id_student};
      console.log(newCourse);
      const response = await createCourse(newCourse);
      if(response.status === 200) {
        setIsEmptyListCourses(false);
        const data = response.data;
        console.log(data);
        setCoursesAndTasks([...coursesAndTasks, data]);
      } else {
        alert("Ошибка: " + response.data.error);
      }
    } catch (error) {
      console.log(error.response.data.error);
      alert("Ошибка: " + error.response.data.error);
    }
  };

  const methodUpdateCourse = async (course) => {
    try {
        const response = await updateCourse(course);
        console.log(response.data);
        if(response.status === 200) {
          setCoursesAndTasks(coursesAndTasks.map((course) => {
            if(course.id_course == response.data.id_course) {
                return {...course, name: response.data.name};
            }else {
                return course;
            }
          }));
        }else {
          alert("Ошибка: " + response.data.error);
        }
    } catch (error) {
        alert("Ошибка: " + error.response.data.error);
    }
  };

  const methodDeleteCourse = async (id) => {
    try {
        const response = await deleteCourse(id);
        console.log(response.data);
        if(response.status === 200) {
          setCoursesAndTasks(coursesAndTasks.filter(course => course.id_course != id));
          if((coursesAndTasks.length - 1) == 0) {
            setIsEmptyListCourses(true);
          }
        }else {
          alert("Ошибка: " + response.data.error);
        }
    } catch (error) {
        alert("Ошибка: " + error.response.data.error);
    }
  };

  return (
    <div className='tasks_page'>
      ПРИ ПЕРЕХОДЕ НА "/" ЛИБО ВООБЩЕ БЕЗ НЕЕ, ПОЯВЛЯЕТСЯ HEADER, НО А ВООБЩЕ ДОЛЖЕН ПРОИСХОДИТЬ ПЕРЕХОД НА "/TASKS"
      <br/><br/>СДЕЛАТЬ ПЕРВОЙ СТРАНИЦЕЙ СТРАНИЦУ С ЗАДАЧАМИ ПО !!!ПЕРИОДУ!!!<br/><br/>
      {
        isEmptyListCourses ?
        <div className='empty_list_courses'>
          {'Нет курсов'}
        </div>
        :
          coursesAndTasks.map((obj) => {
            return <Course key={obj.id_course} course={obj} updateCourse={methodUpdateCourse} deleteCourse={methodDeleteCourse}/>  })
      }
      <br/>
      <AddOrUpdateCourse course={null} setIsUpdating={null} methodCourse={methodCreateCourse} isAddOrUpdate={true} />
    </div>
  )
}

//alt для того чтобы писать в нескольких строках