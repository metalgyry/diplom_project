import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import TaskInSchedule from '../Components/Page_parts/TaskInSchedule';
import { periodsSelect } from '../Components/variables';
import { getCoursesAndTasks } from '../http/userAPI';

export default function SchedulePage() {
    const [tasks, setTasks] = useState([]);
    const [period, setPeriod] = useState(0);

    useEffect(() => {
        switch (period) {
            // тут в case будет выбрал период который уже будет применяться ниже
            case 1:
                
                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;
            default:

                break;
        }
        // ТУТ СОРТИРОВАКА ПО ПЕРИОДУ (ТАКЖЕ КОНЕЧНО ЖЕ ПОЛУЧЕНИЕ ДАТЫ СЕГОДНЯШНЕЙ)
        // Разбивать строку с датой при помощи Регулярки
    },[period]);

    const getData = async () => {
        try {
        const response = await getCoursesAndTasks();
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

    // .css-1fdsijx-ValueContainer { text-align: center } ---> Чтобы оцентровать текст внутри >Select/>

    return (
        <div className='schedule_page'>
            <div className='period_selection'>
            <Select className='period_select_component' options={periodsSelect} defaultValue={periodsSelect[period]} onChange={(selectedOption) => setPeriod(selectedOption.value) }/>
                <br/>
                "Сделать АККОРДЕОН чтобы скрывать и показывать ПОДзадачи"
            </div>
            <br/>
            <div className='schedule_tasks'>
                {tasks.map((task) => {
                    return <TaskInSchedule key={task.id_task} task={task}/>  })
                }
            </div>
        </div>
    )
}
