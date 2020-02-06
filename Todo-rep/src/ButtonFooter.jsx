import React from 'react';



class ButtonFooter extends React.Component {

    render = () => {



        return (

                <button onClick={this.props.onClickFunction} className={this.props.BtnClass}>{this.props.title}</button>


        );
    }
}

export default ButtonFooter;
