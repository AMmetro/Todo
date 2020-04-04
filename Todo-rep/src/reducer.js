import {api} from "./api/api";

export const ADD_TASK = "Todo list/reducers/ADD-TASK";
export const ADD_TODO = "Todo list/reducers/ADD-TODO";
export const CHANGE_TASK = "Todo list/reducers/CHANGE-TASK";
export const DELETE_TODOLIST = "Todo list/reducers/DELETE-TODOLIST";
export const DELETE_TASK = "Todo list/reducers/DELETE-TASK";
export const SET_TODOLISTS = "Todo list/reducers/SET-TODOLISTS";
export const SET_TASKS = "Todo list/reducers/SET-TASKS";
export const SHANGE_TODOTITLE = "Todo list/reducers/SHANGE-TODOTITLE";


const initialState = {
    todoList: [
        // {
            // "id": 1, "title": "11111",
            // tasks: [
            //     {"id": 0, "title": "ччччччччч", "isDone": false, "priority": "low"},
            //     {"id": 1, "title": "мсч ", "isDone": false, "priority": "low"},
            //     {"id": 2, "title": "лол", "isDone": false, "priority": "low"}
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
            // filterValue: "All"
    //     }
    ]
};


const reducer = (state = initialState, action) => {

    switch (action.type)   {

        case SET_TODOLISTS:
            return {
                ...state, todoList: action.todoLists
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


const addTodoAC = (newTodoList) => ({type: ADD_TODO, newTodoList: newTodoList});
export const addTaskAC = (todoId, newTask) => ({type: ADD_TASK, todoId, newTask});
export const changeTaskAC = (task) => ({type: CHANGE_TASK, task});
export const deleteTodoListAC = (todoId) => ({type: DELETE_TODOLIST, todoId});
export const deleteTaskAC = (taskId, todoId) => ({type: DELETE_TASK, taskId, todoId});
export const setTaskAC = (todoListId, tasks) => ({type: SET_TASKS, todoListId, tasks});
export const changeTodoTitleAC = (todoId, title) => ({type: SHANGE_TODOTITLE, todoId, title});

const setTodoListsAC = (todoLists) => { return {type: SET_TODOLISTS, todoLists}};

export const getTodoListTC = () => (dispatch)=> {
    api.getTodoList().then(res => {dispatch(setTodoListsAC(res.data))    })};

export const addTodoTC = (title) => (dispatch)=> {
    api.createTodoList(title).then(res => {dispatch(addTodoAC(res.data.data.item))    })};


export default reducer;







