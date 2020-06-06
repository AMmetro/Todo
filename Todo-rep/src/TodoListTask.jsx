import React from 'react';

class TodoListTask extends React.Component {


 state = {
    editMode: false,
    title: this.props.task.title
 };

    activateEditMode = ()=> {this.setState( {editMode: true} ) };

    deactivateEditMode = ()=> {
    this.props.changeTitle (this.props.task, this.state.title)
    this.setState({editMode: false})
    };

    onIsDoneChanged = (e)=> {
           this.props.changeStatus (this.props.task, e.currentTarget.checked)
    };

     onTitleChange = (e) => {
               this.setState({title: e.currentTarget.value})
             // this.props.changeTitle (this.props.task.id, e.currentTarget.value)
     };

    onDeleteTask = ()=> {
          this.props.deleteTask(this.props.task.id)
    };


    render = () => {

        let classForTask = (this.props.task.status===2) ? "todoList-task done" : "todoList-task";

        return (
                <div className="todoList-task">
                                    <input
                        className={classForTask}
                        type="checkbox"
                        // checked={this.props.task.isDone}
                        checked={this.props.task.status=== 2 ? true: false }
                        onChange={this.onIsDoneChanged}
                          />

                    <span> taskId={this.props.task.id}  </span>
                 {this.state.editMode
                     ? <input
                       value={this.state.title}
                       autoFocus={true}
                       onBlur={this.deactivateEditMode}
                       onChange={this.onTitleChange}
                        />
                     :  <span onClick={this.activateEditMode}> {this.props.task.title},</span>
                 }
                    <span> priority- {this.props.task.priority}</span>
                    <button onClick={this.onDeleteTask}>x</button>
                </div>
        );
    }
}

export default TodoListTask;
