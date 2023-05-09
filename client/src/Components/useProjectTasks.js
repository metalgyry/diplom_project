import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

let socket;

export const useProjectTasks = (id_project) => {
    console.log('useProjectTasks(id_project): ',id_project);

  if (!socket) {
    socket = io(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_SERVER_SOCKET_PROJECT_PORT}/one-project`, {
      auth: {
        id_group_project: String(id_project),
      },
      path: '/project/',
    });
  }
  
  const [projectName, setProjectName] = useState('');
  const [projectIdCreator, setProjectIdCreator] = useState(0);
  const [projectStudents, setProjectStudents] = useState([]);
  const [projectTasks, setProjectTasks] = useState([[]]);
  //const [projectTasksQ, setProjectTasksQ] = useState([[]]);
  

  useEffect(() => {
    socket.connect();
    console.log("session: ", projectTasks, projectStudents);

    socket.emit("projectInfoAndTasks:get");

    return () => {
        // вроде как РАБОТАЕТ
        socket.offAny();
        socket.disconnect();
        socket = null;
    }
  }, []);

  useEffect(() => {
    socket.on("projectInfo:get", (projectInfo) => {
      console.log("projectInfo:get", projectTasks);
      console.log(projectName);
        setProjectName(projectInfo.name);
        setProjectIdCreator(projectInfo.id_creator);
        setProjectStudents(projectInfo.students);
    });

    socket.on("projectTasks:get", (projectListTasks) => {
      console.log("projectTasks:get: ", projectListTasks);

      let array = [0,1,2,3];
      let newArray = array.map((element, index) => {
        return projectListTasks.filter((task) => {
          return task.status == index;
        });
      });
      console.log("newArray: ", newArray);

      setProjectTasks(newArray);
    });

    socket.on("projectTasks:post", (projectNewTask) => {
      console.log('projectTasks: ', projectTasks);
      console.log('projectNewTask: ', projectNewTask);

      const addTaskinArrayProject = projectTasks.map((arrayTasks, index) => {
        if(index == projectNewTask.status){
          return [...arrayTasks, projectNewTask];
        }else {
          return arrayTasks;
        }
      });
      console.log("addTaskinArrayProject: ", addTaskinArrayProject);
      setProjectTasks(addTaskinArrayProject);
    });

    socket.on("projectTasks:patch", (projectUpdateTask) => {
      console.log("projectTasks:patch", projectUpdateTask);
      
      const updateContentTaskinArrayProject = projectTasks.map((arrayTasks, index) => {
        if(projectUpdateTask.status == index) {
          return arrayTasks.map((task) => {
            if(task.id_task == projectUpdateTask.id_task) {
              return {...task, content: projectUpdateTask.content,
                  student_name: projectUpdateTask.student_name,
                  // id_creator: projectUpdateTask.id_creator,
              };
            }else {
              return task;
            }
          });
        }else {
          return arrayTasks;
        }
      });
      console.log("updateContentTaskinArrayProject: ", updateContentTaskinArrayProject);

      setProjectTasks();
    });

    socket.on("projectTasksStatus:patch", (projectUpdateTask) => {

      // тут сперва удаление задачи с прошлым статусом
      const newArray = projectTasks.map((arrayTasks) => {
        return projectTasks.filter(task => task.id_task != projectUpdateTask.id_task);
      });
      // после вставка задачи с обновленным статусом
      setProjectTasks(newArray.map((arrayTasks, index) => {
        if(projectUpdateTask.status == index) {
          return arrayTasks.map((task) => {
            if(task.id_task == projectUpdateTask.id_task) {
              return {...task, status: projectUpdateTask.status};
            }else {
              return task;
            }
          });
        }else {
          return arrayTasks;
        }
      }));
    });

    socket.on( "projectTasks:delete", (id) => {
      console.log('ID_DELETE: ',id);
      setProjectTasks(projectTasks.map((arrayTasks) => {
        return projectTasks.filter(task => task.id_task != id);
      }));
    });
  },[socket]);



  const addTask = useCallback((newTask) => {
    const addNewTask = {...newTask, id_group_project: id_project};
    socket.emit("projectTasks:post", addNewTask);
  }, []);
  
  const updateTask = useCallback((updateTask) => {
    socket.emit("projectTasks:patch", updateTask);
  }, []);

  const updateTaskStatus = useCallback((updateTaskStatus) => {
    socket.emit("projectTasksStatus:patch", updateTaskStatus);
  }, []);

  const deleteTask = useCallback((idDeleteTask) => {
    socket.emit("projectTasks:delete", idDeleteTask);
  }, []);

  const projectTasksActions = useMemo(
    () => ({
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
    }),
    []
  );

  return {projectName, projectIdCreator, projectTasks, projectStudents, projectTasksActions };
};