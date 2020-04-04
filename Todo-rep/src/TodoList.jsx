import React from 'react';
import './TodoList.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import {
    ADD_TASK,
    addTaskAC,
    CHANGE_TASK,
    changeTaskAC,
    DELETE_TASK,
    DELETE_TODOLIST,
    deleteTaskAC,
    changeTodoTitleAC,
    deleteTodoListAC, setTaskAC
} from "./reducer";
import axios from "axios";
import {api} from "./api/api";


class TodoList extends React.Component {


    componentDidMount() {
        this._restoreState2()
    }

    _restoreState2 = () => {




        // let todolistId = this.props.id;
        // api._restoreState2(todolistId)
        //     .then(res => {
        //         let tasks = res.data.items;
        //         this.props.setTasks(todolistId, tasks);
        //     });
        };


    newTaskTitleRef = React.createRef();

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: "All"
    };


    changeTask = (task, obj) => {
        let updateTask = {...task, ...obj };
        let todoId=this.props.id
        api.changeTask (task, updateTask, todoId)
             .then(res => {
                    if (res.data.resultCode === 0){
                    let task = res.data.data.item;
                    this.props.changeTask(task)
                };
            });
    };

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone === true ? 2 : 0})
    };

    changeTitle = (task, title) => {
        this.changeTask(task, {title: title})
    };

                  changeTodoTitle = (todoId, title) => {
                   api.changeTodoTitle(todoId, title)
                       .then(res => {
                    this.props.changeTodoTitle(todoId, title);
                              });
                    };


    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    };


    addTask = (newText) => {
        api.createTask (newText, this.props.id)
            .then (res => {
            let newTask = res.data.data.item;
            this.props.addTask (this.props.id, newTask);
        });
    };


    deleteTodoList = () => {
        let todolistId = this.props.id;
        api.deleteTodolist(todolistId)
         .then(res => {
          if (res.data.resultCode === 0)
          this.props.deleteTodoList(todolistId)
        })
        };



    deleteTask = (taskId) => {
        let todoId = this.props.id;
        api.deleteTask(taskId,todoId)
        .then(res => {
         if (res.data.resultCode === 0)
         this.props.deleteTask(taskId, todoId)
        });
    };




    render = () => {

        const {tasks = []} = this.props;
        return (
            <div className="App">
                <div className="todoList">

                    <div>
                        <TodoListTitle title={this.props.title}
                                       changeTodoTitle={this.changeTodoTitle}
                                       todoId={this.props.id}  />
                        <AddNewItemForm addItems={this.addTask} />
                        <button onClick={this.deleteTodoList}>x</button>
                    </div>

                    <TodoListTasks
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        key={this.props.key}
                        deleteTask={this.deleteTask}

                        tasks={tasks.filter(t => {
                            if (this.state.filterValue === "All") {
                                return true;
                            }
                            if (this.state.filterValue === "Active") {
                                return t.isDone === false;
                            }
                            if (this.state.filterValue === "Completed") {
                                return t.isDone === true;
                            }
                        })
                        }
                    />


                    <TodoListFooter filterValue={this.state.filterValue}
                                    changeFilter={this.changeFilter}/>

                </div>

            </div>
        );
    }
}

//-----------------------------------------------------------------------------ent


// const mapStateToProps = (state) => {
//     return {
//         tasks: state.todoList.tasks   - так передает сразу массив и его нужо MAПить
//     }
// };


const mapDispatchToProps = (dispatch) => {
    return {

        setTasks: (todoListId, tasks) => {
            dispatch(setTaskAC(todoListId, tasks))
        },


        addTask: (todoId, newTask) => {
            dispatch(addTaskAC(todoId, newTask))
            // const action = {
            //     type: ADD_TASK,
            //     todoId,
            //     newTask
            // };
            // dispatch(action)
        },

        // changeTask: (task, obj, todoId) => {
        //     dispatch(changeTaskAC(task, obj, todoId))
        //     debugger
        // },


        changeTask: (task) => {
            dispatch(changeTaskAC(task))
                    },

        deleteTodoList: (todoId) => {
            dispatch(deleteTodoListAC(todoId))
            //  const action = {
            //             //     type: DELETE_TODOLIST,
            //             //     todoId
            //             // };
            //             // dispatch (action)
        },

        deleteTask: (taskId, todoId) => {
            dispatch(deleteTaskAC(taskId, todoId))
                 },

        changeTodoTitle: (todoId,title) => {
            debugger
           dispatch(changeTodoTitleAC(todoId, title))
                 },


    }
};


let connectedTodo = connect(null, mapDispatchToProps)(TodoList);
export default connectedTodo;















