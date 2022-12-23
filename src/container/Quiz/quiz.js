import React, { Component } from "react";
import classes from './quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Finished from '../../components/Finished/Finished'


class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
        quiz: [
            {
                id: 1,
                question: 'Sky color?',
                rightAnswer: 1,
                answers: [
                    { text: 'blue', id: 1 },
                    { text: 'red', id: 2 },
                    { text: 'yellow', id: 3 },
                    { text: 'black', id: 4 },
                    { text: 'wieht', id: 5 }
                ]
            },
            {
                id: 2,
                question: 'Sun color?',
                rightAnswer: 3,
                answers: [
                    { text: 'blue', id: 1 },
                    { text: 'red', id: 2 },
                    { text: 'yellow', id: 3 },
                    { text: 'black', id: 4 },
                    { text: 'wieht', id: 5 }
                ]
            },
            {
                id: 3,
                question: 'Car color?',
                rightAnswer: 2,
                answers: [
                    { text: 'blue', id: 1 },
                    { text: 'red', id: 2 },
                    { text: 'yellow', id: 3 },
                    { text: 'black', id: 4 },
                    { text: 'wieht', id: 5 }
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                console.log('success' + key)
                return
            }
        }
        console.log('Answer id: ' + answerId)

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results;

        if (question.rightAnswer === answerId) {
            results[question.id] = 'success';
            this.setState({
                answerState: { [answerId]: 'success' },
                results: results
            })
            const timeout = window.setTimeout(() => {
                if (this.quizFinished()) {
                    console.log('Finished quiz!')
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: { [answerId]: 'error' },
                results: results
            })
            const timeout = window.setTimeout(() => {
                if (this.quizFinished()) {
                    console.log('Finished quiz!')
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 300)
        }





    }

    quizFinished = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    onRetry = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <h1>Quiz</h1>
                <div className={classes.QuizWrapper}>
                    {
                        this.state.isFinished ?
                            <Finished
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.onRetry}
                            /> :

                            <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClickHandler={this.onAnswerClickHandler}
                                activeQuestionNum={this.state.activeQuestion + 1}
                                quizLength={this.state.quiz.length}
                                answerState={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz
