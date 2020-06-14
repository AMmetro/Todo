import React from 'react';
import TodoListTask from "./TodoListTask";



class TodoListTasks extends React.Component {

    render = () => {

        // здесь получаем массив компонентов

         let tasksEls = this.props.tasks.map( t=> <TodoListTask
             task={t}
             // title={t.title}
             // isDone={t.isDone}
             // priority={t.priority}
             changeStatus={this.props.changeStatus}
             changeTitle={this.props.changeTitle}
             key={this.props.key}
             deleteTask={this.props.deleteTask}

         />
         );

        // запись  аналогична сокращенной
        // let tasksEls = this.props.tasks.map(t=> <TodoListTask title={t.title} isDone={t.isDone}/>);


        return (
            <div className="todoList-tasks">


                {tasksEls}

                {/* обекты класса todoListTask*}*/}
                {/*/!*<TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[1].title} isDone={this.props.tasks[1].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[2].title} isDone={this.props.tasks[2].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[3].title} isDone={this.props.tasks[3].isDone}/>*/}

            </div>

        );
    }
}

export default TodoListTasks;
