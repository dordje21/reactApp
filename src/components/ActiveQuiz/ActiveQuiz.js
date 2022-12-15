import React, { Component } from "react";
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList.js'

const ActiveQuiz = props => (
            <div className={classes.ActiveQuiz}>
                <p className={classes.Question}> 
                    <strong>1 { props.question }</strong>
                    <small>1 from 5</small>
                </p>

                <AnswersList answers={props.answers} onAnswerClickHandler={props.onAnswerClickHandler} />
            </div>
)

export default ActiveQuiz