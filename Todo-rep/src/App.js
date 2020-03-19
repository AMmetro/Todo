import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {ADD_TODO, addTodoAC} from "./reducer";



class App extends React.Component {
                                                   
       nextTodoListId=2;
       AddTodoList= (newTitle)=> {
        let newTodoList = {
            id: this.nextTodoListId,
            title: newTitle,
            tasks: []
        };
        this.nextTodoListId++;
        // this.setState({todoList:[...this.state.todoList, newTodoList]}, this.saveState);
           this.props.addTodo(newTodoList);   // вместо закоменченоо локального стейта теперь в пропсы передеет... (вниз страницы)
    };


       render = () => {

        let todoList = this.props.todoList.map (elem => {
            return <TodoList id={elem.id} title={elem.title} key={elem.id} tasks={elem.tasks} />

        });


        return (

            <div className="App">

              <AddNewItemForm addItems={this.AddTodoList}/>

              {todoList}

             </div>     
      )
   }
}

// -------------------------------- отдельная компонента--------------------------------------

const mapStateToProps = (state) => {
    return {
        todoList: state.todoList
    }
};


const mapDispatchToProps = (dispatch) => {
    return {

           addTodo: (newTodoList) => {
           dispatch (addTodoAC(newTodoList))

            //    const action = {
            //     type: ADD_TODO,
            //     newTodoList: newTodoList
            // };
            // dispatch(action)
        }
    }
};


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

// export default App;  больше ненужно

