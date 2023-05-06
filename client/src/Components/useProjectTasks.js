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
  console.log(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_SERVER_SOCKET_PROJECT_PORT}`);

  const [projectName, setProjectName] = useState('');
  const [projectStudents, setProjectStudents] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("projectInfo:get", (projectInfo) => {
        setProjectName(projectInfo.name);
        setProjectStudents(projectInfo.students);
    });

    socket.on("projectTasks:get", (projectListTasks) => {
        setProjectTasks(projectListTasks);
    });

    socket.on("projectTasks:post", (projectNewTask) => {
        setProjectTasks(...projectTasks, projectNewTask);
    });

    socket.on("projectTasks:patch", (projectUpdateTask) => {
        setProjectTasks(projectTasks.map((task) => {
            if(task.id_task == projectUpdateTask.id_task) {
                return {...task, content: projectUpdateTask.content,
                    student_name: projectUpdateTask.student_name,
                    // id_creator: projectUpdateTask.id_creator,
                };
            }else {
                return task;
            }
          }));
    });

    socket.on("projectTasksStatus:patch", (projectUpdateTask) => {
        setProjectTasks(projectTasks.map((task) => {
            if(task.id_task == projectUpdateTask.id_task) {
                return {...task, status: projectUpdateTask.status,
                };
            }else {
                return task;
            }
          }));
    });

    socket.on( "projectTasks:delete", (id) => {
        setProjectTasks(projectTasks.filter(task => task.id_task != id));
    });

    socket.emit("projectInfoAndTasks:get");

    return () => {
        // вроде как РАБОТАЕТ
        socket.offAny();
        socket.disconnect();
        //socket = null;
    }
  }, []);


  const addTask = useCallback((newTask) => {
    socket.emit("projectTasks:post", newTask);
  }, []);
  
  const updateTask = useCallback((updateTask) => {
    socket.emit("projectTasks:patch", updateTask);
  }, []);

  const updateTaskStatus = useCallback((updateTaskStatus) => {
    socket.emit("projectTasksStatus:patch", updateTaskStatus);
  }, []);

  const deleteTask = useCallback((deleteTask) => {
    socket.emit("projectTasks:delete", deleteTask);
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

  return { projectName, projectStudents, projectTasks, projectTasksActions };
};