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
    deleteTodoListAC
} from "./reducer";



class TodoList extends React.Component {

    newTaskTitleRef = React.createRef();

    nextTaskId = 0;

    state = {
        tasks: [ ],
        filterValue: "All"
    };

    changeTask = (taskId, obj) => {
        this.props.changeTask (taskId, obj, this.props.id)
    };


    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    };


    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
    };

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, this.saveState)
    }

    addTask = (newTitle) => {
        let newTask = {
            id: this.nextTaskId,
            title: newTitle,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        this.props.addTask(this.props.id,newTask)    // сперва ID передаем затем, новую таску !!!

        // let newTasks = [...this.state.tasks, newTask];
        // this.setState({tasks: newTasks}, this.saveState);                               //всегда!!! передает объект

    };

    deleteTodoList = () => {
         this.props.deleteTodoList(this.props.id)
         };

    deleteTask = (taskId) => {
         this.props.deleteTask(taskId, this.props.id)
    };


    render = () => {
     
        return (
            <div className="App">
                <div className="todoList">

                    <div>
                        <TodoListTitle title={this.props.title} id={this.props.id}/>
                        <AddNewItemForm addItems={this.addTask}/>
                        <button onClick={this.deleteTodoList}>x</button>
                    </div>


                    <TodoListTasks
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        key={this.props.key}
                        deleteTask={this.deleteTask}
                        tasks={this.props.tasks.filter(t => {
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
        addTask: (todoId, newTask) => {
            dispatch(addTaskAC(todoId, newTask))
            // const action = {
            //     type: ADD_TASK,
            //     todoId,
            //     newTask
            // };
            // dispatch(action)
        },
        
        changeTask: (taskId, obj, todoId)=> {
              dispatch (changeTaskAC(taskId, obj, todoId))
            // const action = {
            //     type: CHANGE_TASK,
            //     taskId,
            //     obj,
            //     todoId
            // };
            // dispatch(action)
        },

        deleteTodoList: (todoId) => {
          dispatch(deleteTodoListAC(todoId))
            //  const action = {
            //     type: DELETE_TODOLIST,
            //     todoId
            // };
            // dispatch (action)
        },


        deleteTask: (taskId, todoId) => {
            dispatch (deleteTaskAC(taskId, todoId))
            // const action = {
            //     type: DELETE_TASK,
            //     taskId,
            //     todoId
            // };
            // dispatch (action)
        }

    }
};


let connectedTodo = connect(null, mapDispatchToProps)(TodoList);
export default connectedTodo;















