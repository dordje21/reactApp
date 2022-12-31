import React, {Component} from "react";
import Button from "../../components/UI/Button/button";
import classes from "./Auth.module.css"
import Input from "../../components/UI/Input/Input";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter your email!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'password',
                errorMessage: 'Enter your password!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 8
                }
            }
        }
    }

    loginHandler = () => {
        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // }

        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false)

        // try {
        //     const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADQGNRpCbShbMCiDPdfqRQadE80POWkMA', authData)
        //     console.log(res.data)
        // } catch (e){
        //     console.log(e)
        // }
    }

    registerHandler = () => {
        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // }

        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)

        // try {
        //     const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADQGNRpCbShbMCiDPdfqRQadE80POWkMA', authData)
        //     console.log(res.data)
        // } catch (e){
        //     console.log(e)
        // }

    }

    submitHandler = (event) => {
        event.preventDefault();
    }


    validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    validate(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = this.validateEmail(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid

    }

    onChangeHandler = (event, formControl) => {
        // console.log(`${formControl}`, event.target.value)

        const formControls = {...this.state.formControls}
        const control = {...formControls[formControl]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validate(control.value, control.validation)

        formControls[formControl] = control

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((formControl, index) => {
            const control = this.state.formControls[formControl]
            return (
                <Input
                    key={formControl + index}
                    type={control.type}
                    placeholder={control.label}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, formControl)}
                />
            )
        })
    }

    render() {
        return (
            <>
                <h1>
                    Auth
                </h1>

                <form onSubmit={this.submitHandler} className={classes.form}>

                    {this.renderInputs()}
                    {/*<Input placeholder="email"/>*/}
                    {/* <Input placeholder="password"/>*/}

                    <Button
                        type="success"
                        onClick={this.loginHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Login
                    </Button>
                    <Button
                        type="success"
                        onClick={this.registerHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Registration
                    </Button>
                </form>
            </>
        )
    }
}

// function mapStateToProps(state){
//     return{
//
//     }
// }

function mapDispatchToProps(dispatch){
    return{
        auth: (mail, pass, isLogin) => dispatch(auth(mail, pass, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)