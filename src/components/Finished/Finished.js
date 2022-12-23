import React from "react";
import classes from './Finished.module.css'
import Button from "../UI/Button/button";
import { Link } from "react-router-dom";

const Finished = props => {
    const countSuccess = Object.keys(props.results).reduce((total, key)=>{
        if(props.results[key] === 'success'){
            total++;
        }
        return total;
    }, 0)
    return (
        <div className={classes.Finished}>
            <h2>Finished</h2>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    // debugger

                    return (
                        <li key={index}>
                            <b>{index + 1}.</b>
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })
                }
            </ul>
            <div>
                {countSuccess} from {props.quiz.length}
            </div>
            {/* <button onClick={props.onRetry}>Retry</button> */}

            <Button
            onClick={props.onRetry}
            type='primary'
            >
                Retry
            </Button>
            <Link to="/about">
                <Button type="success">
                    Get home page
                </Button>
            </Link>
        </div>
    )
}

export default Finished