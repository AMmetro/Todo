import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
                                                      // два метода жизненного цикла - КОНСТРУКТОР и RENDER
    constructor (props) {                             //    <---создает объект
        super (props);                                //    <--- render вызывается (наследует свойства...)
        // this.newTaskTitleRef=React.createRef();    - можно так
    }

          newTaskTitleRef=React.createRef();

         /*массив обектов */
        /* без LET становиться не переменной а свойством этого обекта*/
    state = {
        tasks: [
            {title: "JS", isDone: true, priority: "hight"},
            {title: "HTML", isDone: true, priority: "low"},
            {title: "CSS", isDone: false, priority: "medium"},
            {title: "React", isDone: false, priority: "low"},
            {title: "Angular", isDone: true, priority: "medium"},
        ],
        filterValue: "All"
      };


    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t != task) {
                return t
            } else {
                return {...t, isDone: isDone}
            }
        });
        this.setState({tasks: newTasks})
    };


    changeFilter = (newFilterValue) => {
        this.setState ({filterValue: newFilterValue})
    }

      addTask = (newTitle) => {
        // let newTitle=this.newTaskTitleRef.current.value;
        // this.newTaskTitleRef.current.value="";
        let newTask = {
            title: newTitle,
            isDone: false,
            priority:"low"
                           };
        let newTasks=[...this.state.tasks, newTask];
        this.setState({tasks: newTasks})                      //всегда!!! передает объект
                          };



            render = () => {
        return (
            <div className="App">
                <div className="todoList">

                       <TodoListHeader addTask={this.addTask} />
                    {/*<div className="todoList-header">*/}
                    {/*    <h3 className="todoList-header__title">What to Learn</h3>*/}
                    {/*    <div className="todoList-newTaskForm">*/}
                    {/*        <input  ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>*/}
                    {/*        <button onClick={this.onAddTaskClick}>Add</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}



                    <TodoListTasks
                        changeStatus = {this.changeStatus}
                                    tasks={this.state.tasks.filter(t=> {
                                    if (this.state.filterValue ==="All") {return true;
                                    }
                                    if (this.state.filterValue ==="Active") {return t.isDone ===false;
                                    }
                                    if (this.state.filterValue ==="Completed") {return t.isDone ===true ;
                                    }
                                                                           })
                                                } />



                    <TodoListFooter filterValue={this.state.filterValue}
                                    changeFilter={this.changeFilter}     />





                </div>

            </div>
        );
    }
}

export default App;

