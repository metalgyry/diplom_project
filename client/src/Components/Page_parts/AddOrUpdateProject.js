import React, { useEffect, useState } from 'react'
import { allGroupStudents, allStudentsInGroupProject } from '../../http/userAPI';
import Select from 'react-select';
import '../../styles/all_style.css';
import StudentListData from './StudentListData';

export default function AddProject({id_creator, name_creator, modifiedProject, setIsCreatingOrUpdating, methodProject, isAddOrUpdate}) {
    const [groupStudents, setGroupStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);
    //
    const [submitButton, setSubmitButton] = useState(true);
    const [submitStudentButton, setSubmitStudentButton] = useState(false);
    const [projectName, setProjectName] = useState(isAddOrUpdate ? '' : modifiedProject.name);
    let textAddButton = isAddOrUpdate ? 'Создать' : 'Изменить';
    let textCancelButton = 'Отмена';

    const addStudentsList = () => {
        if(currentStudent) {
            setSelectedStudents([...selectedStudents, currentStudent]);
            setGroupStudents(groupStudents.filter(studentElement => studentElement.value != currentStudent.value));
            setCurrentStudent(null);
        }
    };

    const deleteStudentsList = (student) => {
        setSelectedStudents(selectedStudents.filter(studentElement => studentElement.value != student.value ));
        setGroupStudents([...groupStudents, student]);
    };
    
    const getGroupStudents = async () => {
        try {
            const response = await allGroupStudents();
            if(response.status === 200) {
                const data = response.data;
                console.log(data);

                let selectStudents = data.map((student) => {
                    return {value: student.id_student, label: student.full_name};
                });
                // let selectStudents = students.filter(student => student.value != id_creator);
                // console.log(selectStudents);

                let listSelectedStudents = [{value: id_creator, label: name_creator}];
                if(!isAddOrUpdate) {
                    const response = await allStudentsInGroupProject(modifiedProject.id_group_project);
                    console.log(response.data);
                    listSelectedStudents = response.data.map((student) => {
                        return {value: student.id_student, label: student.full_name}
                    });
                    if(response.status === 200) {
                        setSelectedStudents(listSelectedStudents);//[...selectedStudents, listStudents]
                    } else {
                        alert("Ошибка: " + response.data.error);
                        setIsCreatingOrUpdating(false);
                    } 
                }
                const listIdSelectedStudents = listSelectedStudents.map((student) => student.value);
                const setListIdStudents = new Set(listIdSelectedStudents);
                selectStudents = selectStudents.filter(student => !setListIdStudents.has(student.value));;

                setGroupStudents(selectStudents);

            } else {
                alert("Ошибка: " + response.data.error);
                setIsCreatingOrUpdating(false);
            }

        } catch (error) {
          console.log(error);
          alert("Ошибка: " + error.response.data.error);
          setIsCreatingOrUpdating(false);
        }
      };

    //   const listStudentInProject = async () => {
        
    //   } 

    //   useEffect( () => {
    //     listStudentInProject();
    //   }, []);

      useEffect( () => {
        if(isAddOrUpdate) {
            setSelectedStudents([{value: id_creator, label: name_creator}]);
        }
        getGroupStudents();
      }, []);

      useEffect(() => {
        if(selectedStudents.length > 0 && selectedStudents.length < 5) {
            setSubmitStudentButton(false);  
        }else {
            setSubmitStudentButton(true);
        }
      }, [selectedStudents]);

    useEffect(() => {
        if( projectName.length > 0 && selectedStudents.length >= 1 && selectedStudents.length < 6 ) {
            setSubmitButton(false);
        }else {
            setSubmitButton(true);
        }
    }, [projectName, selectedStudents]);

    const cancelButton = () => {
        setIsCreatingOrUpdating(false);
    };

    const methodCurrentProject = () => {
        let project = {name: projectName, id_creator: id_creator, name_creator: name_creator, students: selectedStudents.map((student) => {return student.value})}; //full_name: student.label, 
        if(!isAddOrUpdate) {
            project = {...project, id_group_project: modifiedProject.id_group_project};
        }
        console.log(project);
        methodProject(project);
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
                <textarea value={projectName} className='project_name_change' wrap='soft' cols={50} rows={5} autoFocus={true} required onChange={e => setProjectName(e.target.value)}></textarea>
                <div className='add_select_students'>
                    <div className='name_select_student'>
                        Выберите студента(ов):
                    </div>
                    <div className='student_select'>
                        <Select className='student_select_component' options={groupStudents} onChange={(selectedOption) => setCurrentStudent(selectedOption) }/>
                    </div>
                    <div className='project_add_student_button'>
                        <button type="button" className='add_student_button' disabled={submitStudentButton} onClick={addStudentsList}>Добавить студента</button>
                    </div>
                </div>
                <div className='list_selected_student'>
                    <div className='name_list_selected_student'>
                        Студенты(Максимум 5):
                    </div>
                    {
                        selectedStudents.map((student) => {
                            return <StudentListData key={student.value} isCreator={(id_creator == student.value ? true : false)} student={student} deleteSelectedStudent={deleteStudentsList}/>;
                        })
                    }
                </div>
                <div className='add_project_button'>
                    <button type="button" className='add_or_update_button' onClick={methodCurrentProject} disabled={submitButton}>{textAddButton}</button>
                    <button type="button" className='cancel_button' onClick={cancelButton}>{textCancelButton}</button>
                </div>
            </div>
        </div>
    )
}