import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz";

class QuizList extends Component {

    QuizList() {
        return this.props.quizes.map((quiz, index) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        Test {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <>
                <h1>
                    QuizList
                </h1>
                {this.props.loading ? <Loader/> : <ul> {this.QuizList()} </ul>}
            </>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch){
 return{
     fetchQuizes: () => dispatch(fetchQuizes())
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)


