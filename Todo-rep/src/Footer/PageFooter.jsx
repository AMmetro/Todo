import React from 'react';
import styles from './PageFooter.module.css';
import RadioButtonSelect from "../Components/RadioButtonSet/RadioButtonSelect";
import PictureRender from "./pictureRender";


class PageFooter extends React.Component {

    componentDidMount() {
        let updBtnList = this.radioButtonList.map((element, index) => {
            return {...element, ...this.options[index]};
        });
        this.setState({...this.state, updBtnList});
      }

  // array "radioButton" (getting from remote server)
    radioButtonList =   [   { name: "Home task", id:1},
                            { name: "Work Task", id:2},
                            { name: "General Task", id:3}  ]

  // array of options for "radioButton"
    options = [  {selected: false},
                 {selected: false},
                 {selected: false}  ]

    state = {
        updBtnList:[{selected: true},
                    {selected: true},
                    {selected: true}]    };


    updateState=(st)=>{
      this.setState({...this.state,updBtnList:st})
    }

    render = () => {

        return (
            <div className={styles.footer}>
                    <RadioButtonSelect
                    stateButtonList={this.state.updBtnList}
                    updateState={this.updateState}
                    />
                    <PictureRender
                    renderItems={this.state.updBtnList}
                    />
            </div>
                   );
    }
}

export default PageFooter;

















