import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

let socket;

export const useProjectTasks = (id_project, projectStore) => {
    console.log('useProjectTasks(id_project): ',id_project);

  if (!socket) {
    socket = io(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_SERVER_SOCKET_PROJECT_PORT}/one-project`, {
      auth: {
        id_group_project: String(id_project),
      },
      path: '/project/',
    });
  }
  
  const [projectChange, setProjectChange] = useState(0);

  useEffect(() => {
    socket.connect();
    socket.emit("projectInfoAndTasks:get");

    return () => {
        socket.offAny();
        socket.disconnect();
        socket = null;
    }
  }, []);

  useEffect(() => {
    socket.on("projectInfo:get", (projectInfo) => {
      console.log("projectInfo:get: ", projectInfo);

      setProjectChange(projectChange => projectChange + 1);
      projectStore.projectInfo = projectInfo;
    });

    socket.on("projectTasks:get", (projectListTasks) => {
      console.log("projectTasks:get: ", projectListTasks);

      let projectTasks = projectListTasks.reverse();
      let array = [0,1,2,3];
      let newArray = array.map((element, index) => {
        return projectTasks.filter((task) => {
          return task.status == index;
        });
      });
      console.log("newArray: ", newArray);

      setProjectChange(projectChange => projectChange + 1);
      projectStore.projectTasks = newArray;
    });

    socket.on("projectTasks:post", (projectNewTask) => {
      console.log('projectNewTask: ', projectNewTask);

      setProjectChange(projectChange => projectChange + 1);
      projectStore.addProjectTask(projectNewTask);
    });

    socket.on("projectTasks:patch", (projectUpdateTask) => {
      console.log("projectTasks:patch", projectUpdateTask);

      setProjectChange(projectChange => projectChange + 1);
      projectStore.updateProjectTask(projectUpdateTask);

    });

    socket.on("projectTasksStatus:patch", (projectUpdateTask) => {
      console.log("projectTasksStatus:patch", projectUpdateTask);

      setProjectChange(projectChange => projectChange + 1);
      projectStore.updateProjectTaskStatus(projectUpdateTask);

    });

    socket.on( "projectTasks:delete", (id) => {
      console.log('projectTasks:delete: ',id);

      setProjectChange(projectChange => projectChange + 1);
      projectStore.deleteProjectTask(id);
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

  return { projectTasksActions };
};