import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import Select from 'react-select';
import TaskInSchedule from '../Components/Page_parts/TaskInSchedule';
import { periodsSelect, statusOrDateSortTaskSelect, statusOrDateSortSubTaskSelect } from '../Components/variables';
import { getCoursesAndTasks } from '../http/userAPI';

export default function SchedulePage() {
    const [tasks, setTasks] = useState([]);
    const [periodTasks, setPeriodTasks] = useState([]);
    const [period, setPeriod] = useState(0);
    const [sortTaskType, setSortTaskType] = useState(0);
    const [sortSubTaskType, setSortSubTaskType] = useState(0);

    const getData = async () => {
        try {
        const response = await getCoursesAndTasks();
        let arrayTask = response.data.flatMap((course) => {
            return course.tasks.map((task) => {
                return {...task, name_course: course.name};
            });
        });
        console.log(arrayTask);
        setTasks(arrayTask);

        let date = new Date().setHours(0, 0, 0, 0);
        let buffDate;
        arrayTask = arrayTask.filter((task) => {
            buffDate = new Date(task.date).setHours(0, 0, 0, 0);;
            return ((date <= buffDate) && (buffDate <= date));
        })
        arrayTask = arrayTask.sort((a, b) => a.date < b.date ? 1 : -1);
        arrayTask = arrayTask.map((task) => {
            return {...task, subTasks: task.subTasks.sort((a, b) => a.priority < b.priority ? 1 : -1)};
        })
        console.log(arrayTask);
        setPeriodTasks(arrayTask);
        } catch (error) {
        console.log("Ошибка: " + error.response.data.error);
        }
    };
  
    useLayoutEffect( () => {
        getData();
    }, []);

    const changePeriodTasks = (startDate, endDate) => {
        console.log(tasks);
        
        let buffDate = 0;
        setPeriodTasks(tasks.filter((task) => {
            buffDate = new Date(task.date).setHours(0, 0, 0, 0);;
            return ((startDate <= buffDate) && (buffDate <= endDate));
        }));
    };

    useEffect(() => {
        console.log("date");
        const date = new Date();
        // const year = date.getFullYear();
        // const month = String(date.getMonth());// + 1
        // const day = String(date.getDate());

        let startDate = date.setHours(0, 0, 0, 0);
        let endDate = date.setHours(0, 0, 0, 0);

        switch (period) {
            // case 0:// Сегодня
            //     startDate = date;
            //     endDate = date;
            //     break;
            case 1:// Завтра
                startDate += (24*3600*1000);
                endDate += (24*3600*1000);
                break;
            case 2:// Неделя
                endDate += (6*24*3600*1000); // 6 т.к. укитывается и сегодняшний день
                break;
            case 3:// До конца текущей недели
                let week = 7;
                let days = date.getDay();
                if(days == 0) {
                    days = 7;
                }
                endDate += ((week - days)*24*3600*1000);
                break;
            case 4:// Месяц(30 дней)
            endDate += (30*24*3600*1000);
                break;
            case 5:// До конца текущего месяца
                let currentDays = date.getDate();
                let daysOfWeek = new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate();
                endDate += ((daysOfWeek - currentDays)*30*24*3600*1000);
                break;       
            default:
                break;
        }
        changePeriodTasks(startDate, endDate);
    },[period]);

    // const changeSortTasks = (sortFunction) => {
    //     setPeriodTasks(periodTasks.sort(sortFunction));
    // };

    // useEffect(() =>{
        
    // },[sortTaskType]);

    // const changeSortSubTasks = (sortFunction) => {
    //     setPeriodTasks(periodTasks.map((task) => {
    //         return {...task, subTasks: task.subTasks.sort(sortFunction)};
    //     }));
    // };

    useEffect(() =>{
        console.log("sort");
        console.log(sortTaskType);
        let sortFunction;
        switch (sortTaskType) {
            case 0:// Дата(Сперва раньше)
                sortFunction = (a, b) => { return a.date >= b.date ? 1 : -1};
                break;
            case 1:// Дата(Сперва позже)
                sortFunction = (a, b) => { return a.date <= b.date ? 1 : -1};
                break;
            case 2:// Статус(По возрастанию)
                sortFunction = (a, b) => { return a.priority <= b.priority ? 1 : -1};
                break;    
            case 3:// Статус(По уменьшению)
                sortFunction = (a, b) => { return a.priority >= b.priority ? 1 : -1};
                break;
            default:
                sortFunction = (a, b) => { return a.date <= b.date ? 1 : -1};
                break; 
        }
        console.log(periodTasks);
        let newArrayTasks = periodTasks.sort(sortFunction);
        //setPeriodTasks(newArrayTasks);

        console.log("sortSub");
        console.log(sortSubTaskType);
        //let sortFunction;
        switch (sortSubTaskType) {
            case 0:// Статус(По возрастанию)
                sortFunction = (a, b) => a.priority <= b.priority ? 1 : -1;
                break;    
            case 1:// Статус(По уменьшению)
                sortFunction = (a, b) => a.priority >= b.priority ? 1 : -1;
                break;
            default:
                sortFunction = (a, b) => a.priority <= b.priority ? 1 : -1;
                break; 
        }
        console.log(newArrayTasks);
        setPeriodTasks(newArrayTasks.map((task) => {
            return {...task, subTasks: task.subTasks.sort(sortFunction)};
        }));
    },[sortTaskType, sortSubTaskType]);

    // .css-1fdsijx-ValueContainer { text-align: center } ---> Чтобы оцентровать текст внутри <Select/>    

    return (
        <div className='schedule_page'>
            <div className='schedule_selectors'>
                <div>
                    <span className='period_select_title'>Выбор периода: </span>
                    <Select className='period_select_component' options={periodsSelect} defaultValue={periodsSelect[period]} onChange={(selectedOption) => setPeriod(selectedOption.value) }/>
                </div>
                <div>
                    <span className='period_select_title'>Выбор сортировки задач: </span>
                    <Select className='sort_select_component' options={statusOrDateSortTaskSelect} defaultValue={statusOrDateSortTaskSelect[sortTaskType]} onChange={(selectedOption) => setSortTaskType(selectedOption.value) }/>
                </div>
                <div>
                    <span className='period_select_title'>Выбор сортировки подзадач: </span>
                    <Select className='sort_select_component' options={statusOrDateSortSubTaskSelect} defaultValue={statusOrDateSortSubTaskSelect[sortSubTaskType]} onChange={(selectedOption) => setSortSubTaskType(selectedOption.value) }/>    
                </div>
            </div>
            <br/>
            "Сделать АККОРДЕОН чтобы скрывать и показывать ПОДзадачи"
            <div className='schedule_tasks'>
                {periodTasks.map((task) => {
                    return <TaskInSchedule key={task.id_task} task={task}/>  })
                }
            </div>
        </div>
    )
}
