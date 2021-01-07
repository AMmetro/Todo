import React from 'react';
import styles from './CSSstyles.module.css';



class CSSstyles extends React.Component {




    render = () => {


        return (
            <div className={styles.header}>

                <div className={styles[this.props.style1]}> div1 </div>
                <div className={styles[this.props.style2]}> div2 </div>
                <div className={styles[this.props.style3]}> div3 </div>

             </div>

                   );
    }
}

export default CSSstyles;

















