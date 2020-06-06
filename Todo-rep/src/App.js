import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoTC, getTodoListTC} from "./reducer";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
import SideBar from "./SideBar/SadeBar"


class App extends React.Component {

    nextTodoListId=2;
    AddTodoList= (title)=> {
        this.props.AddTodoList(title)
    };

    componentDidMount () {
        this._restoreState()
    }

    saveState= ()=> {
        let StateAsString=JSON.stringify(this.state);
        localStorage.setItem("todolists-state", StateAsString);
    };

    _restoreState = () => {
        this.props.getTodoList()
    };


    render = () => {
            let todoList = this.props.todoList.map (elem => {
            return <TodoList id={elem.id} title={elem.title} key={elem.id} tasks={elem.tasks} />
        });


        return (
            <div className="App-container">

                <PageHeader/>

                <AddNewItemForm addItems={this.AddTodoList} />

                <SideBar todoList={this.props.todoList} />

                <div className="todoContainer">
                    <h1> Current taskList </h1>
                     {todoList}
                </div>

                <PageFooter/>

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
            getTodoList: ()=> {
            dispatch (getTodoListTC())
        },


        AddTodoList: (title)=> {
           dispatch (addTodoTC(title))
        },

    }
};



const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

// export default App;  больше ненужно

