import React, {Component} from "react";
import classes from "./Input.module.css";

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

export default class Input extends Component {
    render() {
        const iputType = this.props.inputType || 'text';
        return (
            <div className={classes.Input}>
                <input
                    placeholder={this.props.placeholder}
                    type={iputType}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />

                {isInvalid(this.props) ? <span>
                    {this.props.errorMessage}
                </span> : null}
            </div>
        )
    }
}