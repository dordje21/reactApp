import './App.css';
import Layout from './hoc/Layout/Layout';
import Quiz from './container/Quiz/quiz';
import { Route, Routes, Navigate } from 'react-router-dom'
import { Component } from 'react';
import NotFoundPage from './container/404/404'
import Auth from './container/Auth/Auth';
import QuizList from './container/QuizList/QuizList';
import QuizCreator from './container/QuizCreator/QuizCreator';
import {connect} from 'react-redux'
import {LOG_OUT} from "./store/actions/actionTypes";
import {logout} from "./store/actions/auth";

class App extends Component {

  // state = {
  //   login: false
  // }

  render() {

    let routs = (
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz-creator" exact element={<Auth />} />
          <Route path="/quiz/:id"  element={<Quiz />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route
              path="*"
              element={<Navigate to="/404" replace />}
          />
        </Routes>
    )

    if(this.props.isAuth){
      routs = (
          <>
              <div>
                  <button className="login" onClick={this.props.outLogin}>
                      {this.props.isAuth ? 'Exit' : 'Login'}
                  </button>
              </div>

          <Routes>
            <Route path="/" element={<QuizList />} />
            <Route path="/quiz-creator" exact element={<QuizCreator />} />
            <Route path="/quiz/:id"  element={<Quiz />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route
                path="*"
                element={<Navigate to="/404" replace />}
            />
          </Routes>
          </>
      )
    }
    return (
      <div className="App">
        <Layout>
          {routs}
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    login: state.login.login,
    isAuth: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch){
  return{
    outLogin: () => dispatch(logout())
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(App);

// export default App
