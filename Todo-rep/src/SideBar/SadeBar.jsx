import React from 'react';
import styles from './SideBar.module.css';
import preloader from "./picture/preloader.gif"

class SadeBar extends React.Component {


    render = () => {
        let titleList = this.props.titleList.map(elem => {
            if (elem.id == this.props.activeTodoListId) {
                return <p className={styles.activeTask}
                          onClick={() => this.props.changeActiveTask(elem.id)}
                          key={elem.id}>
                    {elem.title} </p>
            } else {
                return <p className={styles.passiveTask}
                          onClick={() => this.props.changeActiveTask(elem.id)}
                          key={elem.id}>
                    {elem.title} </p>
            }
        })

        return (
            <div className={styles.SideBar}>

                 <h1 className={""}>List of tasks:</h1>
                 {this.props.statusPreloader ? <img src={preloader}/> : <h2> {titleList}  </h2> }



            </div>
        );
    }

}

export default SadeBar;

















