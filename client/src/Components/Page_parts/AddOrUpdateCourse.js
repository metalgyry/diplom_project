import React, { useEffect, useState } from 'react'

export default function AddOrUpdateCourse({course, setIsUpdating, methodCourse, isAddOrUpdate}) {
    const [clickAddButton, setClickAddOrUpdateButton] = useState(false);
    const [submitButton, setSubmitButton] = useState(true);
    const [name, setContent] = useState(() => {return (isAddOrUpdate ? '' : course.name)});
    let textAddOrUpdateButton = 'Создать';
    let textCreateOrChangeButton = 'СОЗДАТЬ ПРОЕКТ';

    if(isAddOrUpdate) {
        textAddOrUpdateButton = "Создать";
        textCreateOrChangeButton = "СОЗДАТЬ ";
    }else {
        textAddOrUpdateButton = "Изменить";
    }

    useEffect(() => {
        if(name.length > 0) {
            setSubmitButton(false);
        }else {
            setSubmitButton(true);
        }
    }, [name]);

    const createOrUpdateCourse = () => {
        let currentCourse = {};
        if(isAddOrUpdate){
            currentCourse = {name: name};
        }else {
            currentCourse = {...course ,name: name};
        }
        console.log(currentCourse);
        methodCourse(currentCourse);
        setContent("");
        cancelButton();
    }

    const cancelButton = () => {
        if(!isAddOrUpdate) {
            setIsUpdating(false);
        }
        setClickAddOrUpdateButton(false); 
    };

    return (
        <div className='add_course'>
            {
                clickAddButton ?
                    <div className='add_course_area'>
                        <textarea value={name} className='course_content_edit' wrap='soft' cols={50} rows={5} autoFocus={true} required onChange={e => setContent(e.target.value)}></textarea>                  
                        <button type="button" className='add_course_button' onClick={createOrUpdateCourse} disabled={submitButton}>{textAddOrUpdateButton}</button>
                        <button type="button" className='cancel_button' onClick={cancelButton}>Отмена</button>
                    </div>
                :
                    isAddOrUpdate ?
                        <button type="button" className='create_button' onClick={() => setClickAddOrUpdateButton(true)}>{textCreateOrChangeButton}</button>
                    :
                        setClickAddOrUpdateButton(true)
            }
        </div>
    )
}
