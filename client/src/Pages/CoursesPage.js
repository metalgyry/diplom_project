import React, { useEffect, useState, useContext } from 'react'
import AddOrUpdateCourse from '../Components/Page_parts/CoursesPage/AddOrUpdateCourse';
import Course from '../Components/Page_parts/CoursesPage/Course';
import { getCoursesAndTasks, createCourse, updateCourse, deleteCourse } from '../http/userAPI';
import { Context } from '../index';

export default function CoursesPage() {
  const { userStore } = useContext(Context);
  const [coursesAndTasks, setCoursesAndTasks] = useState([]);
  const [isEmptyListCourses, setIsEmptyListCourses] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      const response = await getCoursesAndTasks();
      if(response.status === 200) {
        const data = response.data;
        console.log(data);
        if(data.length > 0) {
          setIsEmptyListCourses(false);
        }
        setCoursesAndTasks(data.reverse());
        setIsLoading(true);
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
        setCoursesAndTasks([data, ...coursesAndTasks]);
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
    <div className='courses_page'>
      <div className='title_courses_page'>
        { isLoading && <b>{'Курсы: '}</b> }
        {
          isLoading && <AddOrUpdateCourse course={null} setIsUpdating={null} methodCourse={methodCreateCourse} isAddOrUpdate={true} />
        }
      </div>
      {
        isEmptyListCourses ?
        <div className='empty_list_courses'>
          {
            isLoading && 'Нет курсов'
          }
        </div>
        :
          <div className='list_courses'>
            {
              coursesAndTasks.map((obj) => {
                return <Course key={obj.id_course} course={obj} updateCourse={methodUpdateCourse} deleteCourse={methodDeleteCourse}/>  })
            }
          </div>
      }
    </div>
  )
}