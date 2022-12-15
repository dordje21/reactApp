import React from "react";
import classes from './AnswersList.module.css';
import AnswerItem from "./AnswerItem/AnswerItem";

const ActiveList = props => (
    <ul className={classes.AnswerList}>
        { props.answers.map((answer, index) => {
            return(
            <AnswerItem key={index} answer={answer} 
            onAnswerClickHandler={props.onAnswerClickHandler}
            />
            )
        }) }
    </ul>
)

export default ActiveList