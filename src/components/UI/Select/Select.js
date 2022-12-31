import React from "react";
import classes from './Select.module.css'

const Select = props => {
    return(
        <div className={classes.Select}>
            <select
                onChange={props.onChange}
                value={props.value}
            >
                { props.options.map((option, index) => {
                        return (
                            <option
                                value={option.value}
                                key={option.value + index}
                            >
                                {option.text}
                            </option>
                        )
                    }) }
            </select>
        </div>
    )
}

export default Select