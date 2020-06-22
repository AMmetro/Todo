import React from 'react';
import './TodoList.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import { changeTaskAC, changeTodoTitleAC, deleteTodoListAC, setTaskAC, setTaskTC, deleteTaskTC, deleteTodoListTC, addTaskTC, changeTodoTitleTC,
    changeTaskTC} from "./reducer";
import preloader from "./SideBar/picture/preloader.gif";


class TodoList extends React.Component {


    componentDidMount() {
        this._restoreState2()
    }

    _restoreState2 = () => {
        let todolistId = this.props.id;
        this.props.setTasks(todolistId);
        };


    newTaskTitleRef = React.createRef();

    nextTaskId = 0;
    state = {
        tasks: [],
        filterValue: "All",
        statusPreloader: true
    };


    changeTask = (task, obj) => {
        let updateTask = {...task, ...obj };
        let todoId=this.props.id
        this.props.changeTask(task.id, updateTask, todoId)
    };

    changeStatus = (task, isDone) => {
        this.changeTask(task, {status: isDone === true ? 2 : 0})
    };

    changeTitle = (task, title) => {
        this.changeTask(task, {title: title})
    };

                  changeTodoTitle = (todoId, title) => {
                      this.props.changeTodoTitle(todoId, title);
                                    };


    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    };


    addTask = (newText) => {

        let todoId = this.props.id;
        this.props.addTask (newText,todoId);
    };


    deleteTodoList = () => {
        let todolistId = this.props.id;
        this.props.deleteTodoList(todolistId)
    };


    deleteTask = (taskId) => {
        let todoId = this.props.id;
        this.props.deleteTask(taskId, todoId)
    };


    render = () => {


        const {tasks = []} = this.props;

         return (

                <div className="TodoList">
                    <div>


                                      <TodoListTitle title={this.props.title}
                                       changeTodoTitle={this.changeTodoTitle}
                                       todoId={this.props.id}
                                       deleteTodoList={this.deleteTodoList}
                        />
                        <AddNewItemForm addItems={this.addTask} />
                     </div>




                    {!this.props.tasks ? <img src={preloader}/>  : <h2>  </h2> }




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
                                return t.status!=2;
                            }
                            if (this.state.filterValue === "Completed") {
                                return t.status===2;
                            }
                        })
                        }
                    />
                    <TodoListFooter filterValue={this.state.filterValue}
                                    changeFilter={this.changeFilter}/>





                </div>
        );
    }
}


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















