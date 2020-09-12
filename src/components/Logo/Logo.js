import React from 'react';
import images from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo=(props)=>{
    return(
        <div className={classes.Logo}>
            <img src={images} alt="my burger"/>
        </div>
    );
}
export default logo;