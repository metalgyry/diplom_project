import React from 'react'

export default function StudentListData({isCreator, student, deleteSelectedStudent}) {
  return (
    <div className='selected_student'>
        <div className='selected_name_student'>
            {student.label}
            { 
              isCreator ?
              " (Создатель)"
              :
              ''
            }
        </div>
        {
            isCreator ?
                ''
            :
                <button type="button" className='delete_selected_student_button' onClick={() => deleteSelectedStudent(student)}>Убрать</button>
        }
        <br/>
    </div>
  )
}
