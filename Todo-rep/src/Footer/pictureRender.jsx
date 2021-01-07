import React from 'react';
import home from './pictures/home.png'
import work from './pictures/work.png'
import general from './pictures/general.png'
import styles from './picture.module.css';


class PictureRender extends React.Component {

    render = () => {

        let radio1=<img src={home} style={{width: "100px"}}  />
        let radio2=<img src={work} style={{width: "100px", border: "50px"}}  />
        let radio3=<img src={general} style={{width: "100px"}} />


        return (
            <div className={styles.footerImg}>
                {/*<button onClick={()=>console.log("state= " + boolean1)}>press</button>*/}
                {this.props.renderItems[0].selected && radio1 }
                {this.props.renderItems[1].selected && radio2 }
                {this.props.renderItems[2].selected && radio3 }
            </div>
               );
    }
}

export default PictureRender;

















