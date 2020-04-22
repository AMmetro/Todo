import React from 'react';
import './TodoList.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import { changeTaskAC, changeTodoTitleAC, deleteTodoListAC, setTaskAC, setTaskTC, deleteTaskTC, deleteTodoListTC, addTaskTC, changeTodoTitleTC,
    changeTaskTC} from "./reducer";


class TodoList extends React.Component {


    componentDidMount() {
        this._restoreState2()
    }

    _restoreState2 = () => {
        let todolistId = this.props.id;
        this.props.setTasks(todolistId);

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
        this.props.changeTask(task.id, updateTask, todoId)

        // let updateTask = {...task, ...obj };
        // let todoId=this.props.id
        // api.changeTask (task, updateTask, todoId)
        //      .then(res => {
        //             if (res.data.resultCode === 0){
        //             let task = res.data.data.item;
        //             this.props.changeTask(task)
        //         };
        //     });
    };

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone === true ? 2 : 0})
    };

    changeTitle = (task, title) => {
        this.changeTask(task, {title: title})
    };

                  changeTodoTitle = (todoId, title) => {
                      this.props.changeTodoTitle(todoId, title);
                    //   api.changeTodoTitle(todoId, title)
                    //    .then(res => {
                    // this.props.changeTodoTitle(todoId, title);
                    //           });
                    };


    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    };


    addTask = (newText) => {
        let todoId = this.props.id;
        this.props.addTask (newText,todoId);


        // api.createTask (newText, this.props.id)
        //     .then (res => {
        //     let newTask = res.data.data.item;
        //     this.props.addTask (this.props.id, newTask);
        // });

    };


    deleteTodoList = () => {
        let todolistId = this.props.id;
        this.props.deleteTodoList(todolistId)

        // let todolistId = this.props.id;
        // api.deleteTodolist(todolistId)
        //  .then(res => {
        //   if (res.data.resultCode === 0)
        //   this.props.deleteTodoList(todolistId)
        // })

    };


    deleteTask = (taskId) => {
        let todoId = this.props.id;
        this.props.deleteTask(taskId, todoId)
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

         setTasks: (todolistId) => {
            dispatch(setTaskTC(todolistId))
        },

        // setTasks: (todoListId, tasks) => {
        //     dispatch(setTaskAC(todoListId, tasks))
        // },

        addTask: (newText,todoId) => {
                   dispatch(addTaskTC(newText,todoId))
               },

        // changeTask: (task, obj, todoId) => {
        //     dispatch(changeTaskAC(task, obj, todoId))
        //     debugger
        // },

//-------------------------------------

        changeTask: (taskId, updateTask, todoId) => {
            dispatch(changeTaskTC(taskId, updateTask, todoId))
        },

        deleteTodoList: (todoId) => {
            dispatch(deleteTodoListTC(todoId))
        },


        deleteTask: (taskId, todoId) => {
            dispatch(deleteTaskTC(taskId, todoId))
        },


        changeTodoTitle: (todoId,title) => {
           dispatch(changeTodoTitleTC(todoId, title))
                 },

    }
};


let connectedTodo = connect(null, mapDispatchToProps)(TodoList);
export default connectedTodo;















