import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from "./AddNewItemForm";


class App extends React.Component {
                                                   
  state = {
      todoList:[
           {id:1, title: "1todo"}, 
             ]
    }

       componentDidMount() {
      this.restoreState()
       }

    nextTodoListId=2;
       AddTodoList= (newTitle)=> {
        let newTodo = {
            id: this.nextTodoListId,
            title: newTitle,
        };
        this.nextTodoListId++;
        this.setState({todoList:[...this.state.todoList, newTodo]}, this.saveState);
           console.log (newTodo);
    }

       saveState= ()=> {
          let stateAsString=JSON.stringify(this.state);
          localStorage.setItem('todoList', stateAsString);
                };

    restoreState = () => {
        let state= this.state;
        let stateAsString = localStorage.getItem('todoList');
        if (stateAsString !== null) {
            state = JSON.parse(stateAsString);
        }
            this.setState(state, () => {
                    this.state.todoList.forEach((elem) => {
                        if (elem.id >= this.nextTodoListId) {
                            this.nextTodoListId = elem.id + 1
                        }   })    }     )        }

       render = () => {

        let todoList = this.state.todoList.map (elem => {
            return <TodoList id={elem.id} title={elem.title} key={elem.id} />
        })


        return (

            <div className="App">

              <AddNewItemForm addItems={this.AddTodoList}/>

             {todoList}

             </div>     
      )
   }
}

export default App;
