import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoTC, getTodoListTC} from "./reducer";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
import SideBar from "./SideBar/SadeBar"
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./Login/Login";
import Invitation from "./Invitation/Invitation";
import Settings from "./Settings/Settings";


class App extends React.Component {

    state = {
        activeTodoListId: null,
        logged: false,
        userName: null,

        // statusTask: "activeTask",
    };

    changeActiveTask = (id) => {
        this.setState({activeTodoListId: id});
    };


     nextTodoListId = 2;
    AddTodoList = (title) => {
        this.props.AddTodoList(title)
    };

    componentDidMount() {

        this._restoreState()
    }

    saveState = () => {
        let StateAsString = JSON.stringify(this.state);
        localStorage.setItem("todolists-state", StateAsString);
    };

    _restoreState = () => {
        this.props.getTodoList()
    };

    inputName = (newName) => {
        this.setState({userName: newName});
    };

    toggleLogged=()=> {
       this.setState({logged: true})
    };



    render = () => {


          let todoList = this.props.todoList.map(elem => {
            if (elem.id == this.state.activeTodoListId) {
                return <TodoList id={elem.id}
                                 title={elem.title}
                                 key={elem.id}
                                 tasks={elem.tasks}
                />    }       });

        return (
            <BrowserRouter>
                <div className="App-container">
                    <PageHeader/>



                      <AddNewItemForm addItems={this.AddTodoList}/>

                        <Route path='/Todo' render={() =>
                            <SideBar titleList={this.props.todoList}
                                     changeActiveTask={this.changeActiveTask}
                                     activeTodoListId={this.state.activeTodoListId}
                                     statusPreloader={this.props.statusPreloader}    /> }/>




                    <div className="todoContainer">
                        <Route path='/Todo' render={() =>
                            <Invitation userName={this.state.userName}
                                            />}/>
                            <Route path='/Login' render={() => <Login
                                   userName={this.state.userName}
                                   inputName={this.inputName}
                                   toggleLogged={this.toggleLogged}
                                   logged={this.state.logged} />}/>
                        <Route exact path='/Settings' component={Settings}/>

                        {this.props.statusPreloader ? <p> Loading </p> : false}


                        <Route path='/Todo' render={() => <div> {todoList} </div>     }/>


                        {this.props.statusPreloader ? <p> Loading </p> : false}



                    </div>
                    <PageFooter/>
                </div>
            </BrowserRouter>
        )
    }
}

// -------------------------------- отдельная компонента--------------------------------------

const mapStateToProps = (state) => {


    return {
        todoList: state.todoList.todoList,
        statusPreloader: state.todoList.statusPreloader

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTodoList: () => {
            dispatch(getTodoListTC())
        },


        AddTodoList: (title) => {
            dispatch(addTodoTC(title))
        },

    }
};


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

// export default App;  больше ненужно

