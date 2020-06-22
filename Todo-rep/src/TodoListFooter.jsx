import React from 'react';

import ButtonFooter from "./ButtonFooter"


class TodoListFooter extends React.Component {

    state = {
        isHidden: false
    };


    onAllFilterClick = () => {this.props.changeFilter("All")}
    onCompletedFilterClick = () => {this.props.changeFilter("Completed")}
    onActiveFilterClick = () => {this.props.changeFilter("Active")}
    onShowFiltersClick = () => {this.setState({isHidden:true})}
    onHideFiltersClick = () => {this.setState({isHidden:false})}



    render = () => {

        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";


       return (


            <div className="todoList-footer">

                {!this.state.isHidden &&
                <>
                 <ButtonFooter title={"All"} BtnClass={classForAll} onClickFunction={ this.onAllFilterClick  }/>
                 <ButtonFooter title={"Completed"} BtnClass={classForCompleted} onClickFunction={ this.onCompletedFilterClick }/>
                 <ButtonFooter title={"Active"} BtnClass={classForActive} onClickFunction={ this.onActiveFilterClick    }/>

                  </>}


                {!this.state.isHidden && <span onClick={ this.onShowFiltersClick }>hide</span>}
                {this.state.isHidden && <span onClick={ this.onHideFiltersClick }>show</span>}

            </div>
        );
    }
}

export default TodoListFooter;
