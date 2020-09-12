import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) =>{
    const result = props.show?<div className={classes.Backdrop} onClick={props.clicked}></div>:null;
    return result;
}
export default backdrop;