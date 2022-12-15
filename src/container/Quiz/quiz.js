import React, { Component } from "react";
import classes from './quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {

    state = {
        quiz: [
            {
                question: 'Sky color?',
                rightAnswer: 1,
                answers: [
                    {text: 'blue', id: 1},
                    {text: 'red', id: 2},
                    {text: 'yellow', id: 3},
                    {text: 'black', id: 4},
                    {text: 'wieht', id: 5}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log(answerId)
    }

    render(){
        return(
            <div className={classes.Quiz}>
                <h1>Quiz</h1>
                <div className={classes.QuizWrapper}>
                    <ActiveQuiz question={this.state.quiz[0].question} answers={this.state.quiz[0].answers} onAnswerClickHandler={this.onAnswerClickHandler} />
                </div>
            </div>
        )
    }
}

export default Quiz
