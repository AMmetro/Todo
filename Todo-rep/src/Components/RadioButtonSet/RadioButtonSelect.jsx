import React from 'react';
import styles from './RadioButtonSelect.css'


class RadioButtonSelect extends React.Component {

     radioChosen=(id)=> {
        let chosenButtonList = this.props.stateButtonList.map(element => {
            if (element.id === id) {return {...element,  selected:!element.selected}}
            else return element
        })
        this.props.updateState(chosenButtonList)
    }

    render = () => {
         let arrOptions=this.props.stateButtonList.map ((element) =>
            <div>
                <input
                    checked={element.selected}
                    type={"radio"}
                    onClick={()=>this.radioChosen(element.id)}
                />
                <span className={element.selected ? styles.active : styles.passive}>
                    {element.name}
                </span>

            </div>
        )


        return (
            <div>
                {arrOptions}
            </div>
                   );
    }
}

export default RadioButtonSelect;

















