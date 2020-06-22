import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "dfa3df07-6fe1-42ec-85cb-0092d073f5e2"}
});

export const api = {

     createTask (newTaskTitle, todoListId) {
     return instance.post(`/${todoListId}/tasks`,
         {title: newTaskTitle});
                 },

      getTodoList () {    return instance.get("") },

      _restoreState2 (todolistId) {
        return instance.get(`/${todolistId}/tasks` )
      },

       createTodoList (title) {
           return instance.post("",
            {title: title},
                   )},

    deleteTodolist(todolistId) {
        return instance.delete(`/${todolistId}`)
    },



//----------------------// как тут изменить IP  на 1.1-----------------------------------------------------------------
      changeTask(taskId, updateTask, todoId) {
           return instance.put (`${todoId}/tasks/${taskId}`,
           updateTask
        )
    },



       // changeTask(task, updateTask, todoId) {
       //   return  axios.put(
       //       `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}/tasks/${task.id}`,
       //        updateTask,
       //       { withCredentials: true,
       //         headers: {"API-KEY": "dfa3df07-6fe1-42ec-85cb-0092d073f5e2"}
       //       })
       // },



    deleteTask(taskId,todoId) {
        return  instance.delete(`/${todoId}/tasks/${taskId}`)
              },


 /*   deleteTask(taskId,todoId) {
       return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}/tasks/${taskId}`,
            { withCredentials: true,
              headers: {"API-KEY": "dfa3df07-6fe1-42ec-85cb-0092d073f5e2"}
            })
    } */



//---------------------- задание ----------------------------------------------------------

    changeTodoTitle (todoId, title) {
     return  instance.put(`/${todoId}`,
        {title: title} ) }

};



