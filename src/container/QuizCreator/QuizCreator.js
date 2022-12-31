import React, {Component} from "react";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/button";
import {creatControl, validate, validateForm} from '../../form/FormFramework'
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import axios from '../../components/axios-quiz/axios-quiz';
import {connect} from "react-redux";
import {newQuestionHandler, finishCreatQuiz} from "../../store/actions/creat";

class QuizCreator extends Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        quiz: [],
        formControls: this.createFormControls()
    }

    createOptionControl(number) {
        return creatControl({
            label: `Option ${number}`,
            errorMessage: 'can not be blank',
            id: number
        }, {
            required: true
        })
    }

    createFormControls() {
        return {
            question: creatControl({
                    label: 'add your question',
                    errorMessage: 'can not be blank'
                },
                {
                    required: true
                }),
            option1: this.createOptionControl(1),
            option2: this.createOptionControl(2),
            option3: this.createOptionControl(3),
            option4: this.createOptionControl(4)
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
    }

    addQuestionHandler(event) {
        event.preventDefault();

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answerState: [
                {
                    text: option1.value, id: option1.id
                },
                {
                    text: option2.value, id: option2.id
                },
                {
                    text: option3.value, id: option3.id
                },
                {
                    text: option4.value, id: option4.id
                }
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: this.createFormControls()
        })
    }

    creatQuizHandler = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('/quizs.json', this.state.quiz);
            console.log(res.data)
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: this.createFormControls()
            })
        } catch (e){
            console.log(e)
        }

        // axios.post('https://quizreactapp-c62a9-default-rtdb.europe-west1.firebasedatabase.app/quizs.json', this.state.quiz)
        //     .then(res=>{
        //         console.log(res)
        //     })
        //     .catch(error=>{
        //         console.log(error)
        //     })
        // console.log(this.state.quiz)
        // // TODO: SERVER
    }

    changeHandler = (value, name) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[name]}

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)

        formControls[name] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((name, index) => {
            const input = this.state.formControls[name]
            return (
                <div key={index}>
                    <Input
                        label={input.label}
                        value={input.value}
                        valid={input.valid}
                        shouldValidate={!!input.validation}
                        touched={input.touched}
                        errorMessage={input.errorMessage}
                        placeholder={input.label}
                        onChange={event => this.changeHandler(event.target.value, name)}
                    />
                    {index === 0 ? <hr/> : null}
                </div>
            )
        })
    }

    selectChangeHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>
                        Quiz Creator
                    </h1>
                </div>
                <form onSubmit={this.onSubmitHandler}>

                    {this.renderInputs()}

                    <Select
                        label="Choose right answer"
                        value={this.state.rightAnswerId}
                        onChange={this.selectChangeHandler}
                        options={[
                            {text: 1, value: 1},
                            {text: 2, value: 2},
                            {text: 3, value: 3},
                            {text: 4, value: 4}
                        ]}
                    />

                    <Button type="primary"
                            onClick={this.addQuestionHandler.bind(this)}
                            disabled={!this.state.isFormValid}
                    >
                        Add question
                    </Button>

                    <Button type="success"
                            onClick={this.creatQuizHandler.bind(this)}
                            disabled={this.state.quiz.length < 1}
                    >
                        Creat Quiz
                    </Button>
                </form>

            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return{
        newQuestionHandler: (item) => dispatch(newQuestionHandler(item)),
        finishCreatQuiz: () => dispatch(finishCreatQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)