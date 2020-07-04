import {api} from "./api/api";
import {TaskType, TodoListType} from "./types/entities";
export const ADD_TASK = "Todo list/reducers/ADD-TASK";
export const ADD_TODO = "Todo list/reducers/ADD-TODO";
export const CHANGE_TASK = "Todo list/reducers/CHANGE-TASK";
export const DELETE_TODOLIST = "Todo list/reducers/DELETE-TODOLIST";
export const DELETE_TASK = "Todo list/reducers/DELETE-TASK";
export const SET_TODOLISTS = "Todo list/reducers/SET-TODOLISTS";
export const SET_TASKS = "Todo list/reducers/SET-TASKS";
export const SHANGE_TODOTITLE = "Todo list/reducers/SHANGE-TODOTITLE";


type InitialStateType = {todoList: Array<TodoListType>, statusPreloader: boolean}

const initialState: InitialStateType = {
    statusPreloader: true,
    todoList: [
        // {
        //     "id": 1, "title": "11111",
        //     tasks: [
        //         {"id": 0, "title": "ччччччччч", "isDone": false, "priority": "low"},
        //         {"id": 1, "title": "мсч ", "isDone": false, "priority": "low"},
        //         {"id": 2, "title": "лол", "isDone": false, "priority": "low"}
        //     ],
        //     filterValue: "All"
        // },
        // {
        //     "id": 2, "title": "222",
        //     tasks: [
        //         // {"id": 0, "title": "ччччччччч", "isDone": false, "priority": "low"},
        //         // {"id": 1, "title": "мсч ", "isDone": false, "priority": "low"},
        //         // {"id": 2, "title": "лол", "isDone": false, "priority": "low"}
        //     ],
        //     filterValue: "All"
        // }
    ]

};


const reducer = (state: InitialStateType = initialState, action:TodoActionTypes): InitialStateType => {

    switch (action.type)   {

        case SET_TODOLISTS:


            return  {

                ...state, todoList: action.todoLists,
                statusPreloader: false
            };


            case SHANGE_TODOTITLE:

               return { ...state, todoList: state.todoList.map((td) => {
                       if (td.id === action.todoId) {
                        return {
                        ...td, title: action.title
                                            }
                             } else {
                           return td
                                 }
                                       })
                                       };

        case ADD_TODO:

            return {
                ...state, todoList: [...state.todoList, action.newTodoList]
            };


        case SET_TASKS:
                      return {
                ...state,
                         todoList: state.todoList.map (tdl => {

                            if (tdl.id === action.todoListId) {
                                return {...tdl, tasks: action.tasks}
                             } else {
                                return tdl
                            }

                         })};


        case ADD_TASK:
            return {
                ...state, todoList: state.todoList.map((td) => {
                    if (td.id === action.todoId) {
                        return {
                            ...td,
                            tasks: [...td.tasks, action.newTask]
                        }
                    } else {
                        return td
                    }
                })
            };

        case CHANGE_TASK:

            return {
                ...state,
                         todoList: state.todoList.map(tl => {
                             if (tl.id === action.task.todoListId) {
                        return {
                            ...tl, tasks: tl.tasks.map(t => {
                                if (t.id == action.task.id) {
                                    return action.task;
                                } else {
                                            return t
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            };

        case DELETE_TODOLIST:

            return {
                ...state,
                todoList: state.todoList.filter(tl => tl.id !== action.todoId)
            };

        case DELETE_TASK:
            return {
                ...state,
                todoList: state.todoList.map(tl => {
                    if (tl.id === action.todoId) {
                        return {
                            ...tl, tasks: tl.tasks.filter(tasks => tasks.id !== action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }

    }

    return state;
};

type TodoActionTypes = SetTodoListsACType | SetTaskACType | AddTodoACType |addTaskACType | changeTaskACType |deleteTodoListACType | deleteTaskACtACType | changeTodoTitleACType


type SetTodoListsACType={type: typeof  SET_TODOLISTS, todoLists: Array<TodoListType> }
const setTodoListsAC = (todoLists: Array<TodoListType>):SetTodoListsACType => { return {type: SET_TODOLISTS, todoLists}};

type SetTaskACType = {type: typeof SET_TASKS, todoListId:string, tasks:Array<TaskType>}
const setTaskAC = (todoListId:string, tasks:Array<TaskType>):SetTaskACType => ({type: SET_TASKS, todoListId, tasks});

type AddTodoACType = {type: typeof  ADD_TODO, newTodoList: TodoListType }
const addTodoAC = (newTodoList:any):AddTodoACType => ({type: ADD_TODO, newTodoList: newTodoList});

type addTaskACType = {type: typeof  ADD_TASK, todoId:string, newTask: TaskType }
export const addTaskAC = (todoId:string, newTask:TaskType):addTaskACType => ({type: ADD_TASK, todoId, newTask});

type changeTaskACType = {type: typeof  CHANGE_TASK, task: TaskType }
const changeTaskAC = (task:TaskType):changeTaskACType=> ({type: CHANGE_TASK, task});

type deleteTodoListACType = {type: typeof  DELETE_TODOLIST, todoId: string }
const deleteTodoListAC = (todoId:string):deleteTodoListACType => ({type: DELETE_TODOLIST, todoId});

type deleteTaskACtACType = {type: typeof  DELETE_TASK, taskId:string, todoId: string }
export const deleteTaskAC = (taskId:string, todoId:string):deleteTaskACtACType => ({type: DELETE_TASK, taskId, todoId});

type changeTodoTitleACType = {type: typeof  SHANGE_TODOTITLE, todoId:string, title: string }
const changeTodoTitleAC = (todoId:string, title:string):changeTodoTitleACType => ({type: SHANGE_TODOTITLE, todoId, title});

export const getTodoListTC = () => (dispatch:any)=> {
    api.getTodoList().then(res => {dispatch(setTodoListsAC(res.data))    })};

export const addTodoTC = (title: string) => (dispatch:any)=> {
       api.createTodoList(title).then(res => {dispatch(addTodoAC(res.data.data.item))    })};

export const setTaskTC = (todoListId:string) => (dispatch:any) => {api._restoreState2(todoListId)
        .then(res => {let tasks = res.data.items; dispatch(setTaskAC(todoListId, tasks))  }) };

export const deleteTaskTC = (taskId:string, todoId:string) => (dispatch:any) => {api.deleteTask(taskId,todoId)
      .then(res => {if (res.data.resultCode === 0) dispatch(deleteTaskAC(taskId, todoId)) }) };

export const deleteTodoListTC = (todolistId:string) => (dispatch:any) => {api.deleteTodolist(todolistId)
    .then(res => {if (res.data.resultCode === 0) dispatch(deleteTodoListAC(todolistId)) }) };

export const addTaskTC = (newText:any,todoId:string) => (dispatch:any) => {api.createTask(newText,todoId)
    .then(res => { let newTask = res.data.data.item; dispatch(addTaskAC(todoId, newTask)) })
};

export const changeTodoTitleTC = (todoId:string, title: string) => (dispatch:any) => {api.changeTodoTitle(todoId, title)
    .then(res => { dispatch(changeTodoTitleAC(todoId, title)) })
};


export const changeTaskTC = (taskId:string, updateTask:any, todoId:string) => (dispatch:any) => {api.changeTask(taskId, updateTask, todoId)
    .then(res => {   if (res.data.resultCode === 0){
                    let task = res.data.data.item;
                  { dispatch(changeTaskAC(task)) }}
})};


export default reducer;







