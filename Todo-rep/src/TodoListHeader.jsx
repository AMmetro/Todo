import React from 'react';


class TodoListHeader extends React.Component {

    // constructor() {
    //     super();
    //     this.newTaskTitleRef = React.createRef();
    // }


    state = {
        error: true,
        title: ""
    }

    pressEnter = (e)=> {

        if (e.key === "Enter") {
            this.onAddTaskClick();
        }
    }


  onAddTaskClick = ()=> {
      // let newTitle=this.newTaskTitleRef.current.value;
      let newTitle=this.state.title;
      this.state.title = "";

      if (newTitle === "") {
          this.setState({error: true});
      } else {
          this.setState({error: false});
          // this.newTaskTitleRef.current.value="";
          this.props.addTask(newTitle);
      }
  }

    onTitleChanged =(e)=> {
          this.setState({error: false,
          title:e.currentTarget.value}
          )
                }



    render = () => {

        let classForInput = (this.state.error) === true ? "error" : "";


        return (

                <div className="todoList-header">
                     <h3 className="todoList-header__title">What to Learn</h3>
                      <div className="todoList-newTaskForm">

                          <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"
                                 className={classForInput} onChange={this.onTitleChanged}
                                 onKeyPress={this.pressEnter} value={this.state.title}/>

                            <button onClick={this.onAddTaskClick} >Add</button>

                      </div>
                 </div>
         );
    }
}

export default TodoListHeader;

