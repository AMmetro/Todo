import React from 'react';
import styles from './PageHeader.module.css';

class PageHeader extends React.Component {


    state = {
        filterCss: "red",
    };

    render = () => {

              let changeColor = () => {
          this.setState({filterCss: "blue"})
        }

        return (

            <div className={styles.header}>
                <div className={styles.nameHeader}><h1> T O D O L I S T </h1></div>

                <div className={styles.btnMenuWrapper}>
                    <span>Menu</span>
                    <div className={styles.dropdownContentCSS}>
                        <a onClick={changeColor} href="#">Change colors</a>
                        <a href="#">Mobile Version</a>
                        <a href="#">About Program</a>
                    </div>

                    <div className={styles[this.state.filterCss]} > test items </div>

                </div>



            </div>

        );
    }
}

export default PageHeader;

















