import React, { useEffect, useState } from 'react'
import TaskInSchedule from '../Components/Page_parts/TaskInSchedule';
import { getCoursesAndTasks } from '../http/userAPI';

export default function SchedulePage() {
    const [Tasks, setTasks] = useState([]);

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

        setTasks(arrayTask);
        } catch (error) {
        console.log("Ошибка: " + error.response.data.error);
        }
    };
  
    useEffect( () => {
        getData();
    }, []);


    return (
        <div className='schedule_page'>
            <div className='period_selection'>
                ТУТ SELECT ДЛЯ ВЫБОРА ПЕРИОДА
                "Сделать АККОРДЕОН чтобы скрывать и показывать ПОДзадачи"
            </div>
            <br/>
            <div className='schedule_tasks'>
                {Tasks.map((task) => {
                    return <TaskInSchedule key={task.id_task} task={task}/>  })
                }
            </div>
        </div>
    )
}
