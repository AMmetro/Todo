import React from 'react';


class TodoListTitle extends React.Component {

        state = {
        editMode: false,
        title: this.props.title
    };

        activateEditMode = ()=> {this.setState( {editMode: true} ) };

        deactivateEditMode = ()=> {
        this.props.changeTodoTitle (this.props.todoId,this.state.title)
        this.setState({editMode: false})
    };

    changeTodoTitle= (e)=> {
        this.setState({title: e.currentTarget.value})
    };

    render = () => {
        return (
            <div className="todoList-header">

            {this.state.editMode
                    ? <input
                        value={this.state.title}
                        autoFocus={true}
                        onBlur={this.deactivateEditMode}
                        onChange={this.changeTodoTitle}
                    />
                    :  <span onClick={this.activateEditMode}> {this.state.title},</span>
                       }
                <button onClick={this.props.deleteTodoList}>x</button>
                 </div>
         );
    }
}

export default TodoListTitle;