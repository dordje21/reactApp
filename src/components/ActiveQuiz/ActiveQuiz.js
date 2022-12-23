import React from "react";
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList.js'
import { useNavigate } from 'react-router-dom';

const ActiveQuiz = props => {

    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <strong>{props.activeQuestionNum}. {props.question}</strong>
                <small>{props.activeQuestionNum} from {props.quizLength}</small>
            </p>

            <AnswersList
                answers={props.answers}
                onAnswerClickHandler={props.onAnswerClickHandler}
                answerState={props.answerState}
            />
        </div>
    )
}

export default ActiveQuiz