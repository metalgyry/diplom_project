import {makeAutoObservable} from "mobx"

export default class Project {
    constructor(){
        this._projectInfo = {};
        this._projectTasks = [[]];
        makeAutoObservable(this);
    }

    addProjectTask(projectNewTask){
        console.log(this._projectTasks);
        this._projectTasks = this._projectTasks.map((arrayTasks, index) => {
            if(index == projectNewTask.status){
              return [projectNewTask, ...arrayTasks];
            }else {
              return arrayTasks;
            }
          });
    }

    updateProjectTask(projectUpdateTask){
        this._projectTasks = this._projectTasks.map((arrayTasks, index) => {
            if(projectUpdateTask.status == index) {
              return arrayTasks.map((task) => {
                if(task.id_task == projectUpdateTask.id_task) {
                  return {...task, content: projectUpdateTask.content,
                      student_name: projectUpdateTask.student_name,
                  };
                }else {
                  return task;
                }
              });
            }else {
              return arrayTasks;
            }
          });
    }

    updateProjectTaskStatus(projectUpdateTask){
        // тут сперва удаление задачи с прошлым статусом
        const newArray = this._projectTasks.map((arrayTasks) => {
          return arrayTasks.filter(task => task.id_task != projectUpdateTask.id_task);
        });
        // после вставка задачи с обновленным статусом
        this._projectTasks = newArray.map((arrayTasks, index) => {
          if(projectUpdateTask.status == index) {
            return [projectUpdateTask, ...arrayTasks];
          }else {
            return arrayTasks;
          }
        });
    }

    deleteProjectTask(id){
        this._projectTasks = this._projectTasks.map((arrayTasks) => {
            return arrayTasks.filter(task => task.id_task != id);
          });
    }

    set projectInfo(projectInfo){
        this._projectInfo = projectInfo;
    }

    get projectInfo(){
        return this._projectInfo;
    }

    set projectTasks(projectTasks){
        this._projectTasks = projectTasks;
    }

    get projectTasks(){
        return this._projectTasks;
    }

}