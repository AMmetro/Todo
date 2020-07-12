import React from 'react';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import styles from './PageHeader.module.css';

class PageHeader extends React.Component {


    render = () => {

        return (


            <div className={styles.header}>
                <div className={styles.nameHeader}><h1> T O D O L I S T </h1></div>

                <div className={styles.btnMenuWrapper}>
                    <span>Menu</span>
                    <div className={styles.dropdownContentCSS}>
                        <nav>
                            <div>
                                <NavLink to="Login"> Login / Logout </NavLink>
                                <NavLink to="Todo">Todo </NavLink>
                                <NavLink to="Settings">Settings </NavLink>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageHeader;

















