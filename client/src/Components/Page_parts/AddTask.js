import React, { useState } from 'react'

export default function AddTask({id, Add, isTaskOrSubTask}) {
    const [clickAddButton, setClickAddButton] = useState(false);

    //               В ЗАВИСИМОСТИ ОТ isTaskOrSubTask БУДЕТ РАЗНЫЕ ВОЗМОЖНЫЕ ПОЛЯ И ПО КНОПКЕ "создать" БУДТ ЛИБО ОТПРАВКА ЗАДАЧИ ЛИБО ПОДЗАДАЧИ
    //                          ... ВОЗМОЖНО ИЗ-ЗА РАСПИСАНИЯ ПРИДЕТСЯ РАЗДЕЛИТЬ ЭТОТ КОМПОНЕНТ

    //             !!!!!!!                 id       Add                     !!!!!!!

    return (
        <div className='add_task'>
            {
                clickAddButton ?
                <div>
                    Поля создания задач
                    <button type="button" className='add_button' >создать</button>
                </div>
                :
                <button type="button" className='create_button' onClick={() => setClickAddButton(true)}>СОЗДАТЬ ЗАДАЧУ</button>
            }
        </div>
    )
}
