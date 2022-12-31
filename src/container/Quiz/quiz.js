import React, { Component } from "react";
import classes from './quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import Finished from '../../components/Finished/Finished'
import Loader from "../../components/UI/Loader/Loader";
import axios from '../../components/axios-quiz/axios-quiz';

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
        quiz: [],
        loading: true
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

    async componentDidMount() {
        // console.log('quiz id = ' + this.props.match.params.id)
        try {
            const res = await axios.get('/quizs/-NK1VFpTQ8GTPTe0L__I.json')
            const quiz = res.data;

            this.setState({
                quiz: quiz,
                loading: false
            })
        }catch (e){
            console.log(e)
        }

    }

    render() {
        return (
            <div className={classes.Quiz}>
                <h1>Quiz</h1>
                <div className={classes.QuizWrapper}>
                    { this.state.loading ? <Loader/> :
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
