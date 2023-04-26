import React, { useEffect, useState } from 'react'
import { getCoursesAndTasks } from '../http/userAPI';

export default function Schedule () {
    const [coursesAndTasks, setCoursesAndTasks] = useState([]);

    const getData = async () => {
        try {
        const response = await getCoursesAndTasks();
        const data = response.data;
        console.log(data);

        const arrayTask = response.data.flatMap((course) => {
            return course.tasks.map((task) => {
                return {...task, name_course: course.name};
            });
        });
        console.log(arrayTask);

        setCoursesAndTasks(arrayTask);
        } catch (error) {
        console.log("Ошибка: " + error.response.data.error);
        }
    };
  
    useEffect( () => {
        getData();
    }, []);


    return (
        <div>
            Schedule
        </div>
    )
}
