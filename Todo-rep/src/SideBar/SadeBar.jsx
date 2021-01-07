import React from 'react';
import styles from './SideBar.module.css';

class SadeBar extends React.Component {

    state = {
        filterCss: styles.red
    };


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


        let red = () => {
            this.setState({filterCss: styles.red})
        }
        let black = () => {
            this.setState({filterCss: styles.blue})
        }


        return (
            <div className={`${this.state.filterCss}`}>

            <button onClick={red}> red</button>
                <button onClick={black}> blue</button>

                <h1 className={this.state.filterCss}>list of tasks:</h1>

                {/*<h1 className={styles.red}>list of tasks:</h1>*/}

                <h2> {titleList}  </h2>
            </div>
        );
    }


    // Array.filter(element => {
    // if (element.id === (element-1).Id) {
    //     return element;
    //    }

}

export default SadeBar;

















