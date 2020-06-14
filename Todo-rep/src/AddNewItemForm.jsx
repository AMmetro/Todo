import React from 'react';
import styles from './Header.module.css'


class AddNewItemForm extends React.Component {

       state = {
        error: true,
        title: ""
    }

    pressEnter = (e)=> {
        if (e.key === "Enter") {
            this.onAddItemClick();
        }
    };

  onAddItemClick = ()=> {
      let newTitle=this.state.title;
      this.setState({title:""});

      if (newTitle === "") {
          this.setState({error: true});
      } else {
          this.setState({error: false});
          // this.newTaskTitleRef.current.value="";
          this.props.addItems(newTitle);
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
                <div className={styles.header}>
                     <h1 className="todoList-header__title">{this.props.title}</h1>
                    <div className="todoList-newTaskForm">
                                <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"
                                 className={classForInput} onChange={this.onTitleChanged}
                                 onKeyPress={this.pressEnter} value={this.state.title}/>
                            <button onClick={this.onAddItemClick} >Add</button>
                      </div>


                 </div>
         );
    }
}

export default AddNewItemForm;

