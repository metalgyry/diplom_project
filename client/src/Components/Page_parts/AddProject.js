import React, { useEffect, useState } from 'react'
import { allGroupStudents } from '../../http/userAPI';
import Select from 'react-select';
import '../../styles/all_style.css';
import StudentListData from './StudentListData';

export default function AddProject({id_creator, name_creator, setIsCreating, addProject}) {
    const [groupStudents, setGroupStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([{value: id_creator, label: name_creator + ' (Создатель)'},]);
    const [currentStudent, setCurrentStudent] = useState(null);
    //
    const [submitButton, setSubmitButton] = useState(true);
    const [projectName, setProjectName] = useState('');
    let textAddButton = 'Создать';
    let textCancelButton = 'Отмена';

    const addStudentsList = () => {
        if(currentStudent) {
            setSelectedStudents([...selectedStudents, currentStudent]);
            setGroupStudents(groupStudents.filter(studentElement => studentElement.value != currentStudent.value));
            setCurrentStudent(null);
        }
    };

    const deleteStudentsList = (student) => { // нужен ли тут student?????
        setSelectedStudents(selectedStudents.filter(studentElement => studentElement.value != student.value ));
        setGroupStudents([...groupStudents, student]);
    };
    
    const getGroupStudents = async () => {
        try {
          const response = await allGroupStudents();
          if(response.status === 200) {
            const data = response.data;
            console.log(data);

            const students = data.map((student) => {
                return {value: student.id_student, label: student.full_name};
            });
            const selectStudents = students.filter(student => student.value != id_creator);
            console.log(selectStudents);

            setGroupStudents(selectStudents);
          } else {
            alert("Ошибка: " + response.data.error);
            setIsCreating(false);
          }
        } catch (error) {
          console.log(error);
          alert("Ошибка: " + error.response.data.error);
          setIsCreating(false);
        }
      };
    
      useEffect( () => {
        getGroupStudents();
      }, []);

    useEffect(() => {
        if( projectName.length > 0 && selectedStudents.length > 1 && selectedStudents.length < 5 ) {
            setSubmitButton(false);
        }else {
            setSubmitButton(true);
        }
    }, [projectName, selectedStudents]);

    const cancelButton = () => {
        setIsCreating(false);
    };

    const createProject = () => {
        let newProject = {name: projectName, id_creator: id_creator, students: selectedStudents.map((student) => {return student.value})}; //full_name: student.label, 
        console.log(newProject);
        addProject(newProject);
        //setProjectName("");
        // Вроде как все очищается т.к. при нажатии закрытия модального окна и после его открытия все поял чистые
        cancelButton();
    }

    //  <-----contenteditable='true'---->

    return (
        <div className='add_project'>
            <div className='add_project_window'>
                <div className='name_project'>
                    Название проекта:
                </div>
                <textarea value={projectName} className='project_name_change' wrap='soft' cols={50} rows={3} autoFocus={true} required onChange={e => setProjectName(e.target.value)}></textarea>
                <div className='add_select_students'>
                    <br/>
                    <div className='name_select_student'>
                        Выберите студента(ов):
                    </div>
                    НУЖНО ПОЧИТАТЬ И СДЕЛАТЬ ОЧИЩЕНИЕ SELECTа ПОСЛЕ ВЫБОРА(НАЖАТИЯ КНОПКИ)
                    <Select className='student_select_component' options={groupStudents} onChange={(selectedOption) => setCurrentStudent(selectedOption) }/>
                    <button type="button" className='add_student_button' onClick={addStudentsList}>Добавить</button>
                    <br/>
                </div>
                <div className='list_selected_student'>
                    <div className='name_list_selected_student'>
                        Студенты:
                    </div>
                    {
                        selectedStudents.map((student) => {
                            return <StudentListData key={student.value} isCreator={(id_creator == student.value ? true : false)} student={student} deleteSelectedStudent={deleteStudentsList}/>;
                        })
                    }
                </div>
                <br/>
                <div className='add_project_button'>
                    <button type="button" className='add_button' onClick={createProject} disabled={submitButton}>{textAddButton}</button>
                    <button type="button" className='cancel_button' onClick={cancelButton}>{textCancelButton}</button>
                </div>
            </div>
        </div>
    )
}