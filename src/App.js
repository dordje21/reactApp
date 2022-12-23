import './App.css';
import Layout from './hoc/Layout/Layout';
import Quiz from './container/Quiz/quiz';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import { Component } from 'react';
import About from './container/About/about';
import AboutDetails from './components/AboutDetail/AboutDetail';
import NotFoundPage from './container/404/404'

class App extends Component {

  state = {
    login: false
  }

  render() {

    const aboutLinks = {
      links: [
        {
          name: 'link1'
        },
        {
          name: 'link2'
        },
        {
          name: 'link3'
        }
      ]
    }

  

    return (
      <div className="App">
        <Layout>
          <div>
            <button class="login" onClick={() => { this.state.login ? this.setState({ login: false }) : this.setState({ login: true }) }}>
              { this.state.login ? 'Exit' : 'Login' }
            </button>
          </div>
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/quiz-creator" element={<Quiz />} />
            { this.state.login ? <Route path="/about" exact element={<About aboutLinks={aboutLinks.links} />} /> : null }
            
            <Route path="/quiz/:id"  element={<AboutDetails />} />
              
            {/* <Route
              path="/about/:name"
              element={<AboutDetails />} /> */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route
              path="*"
              element={<Navigate to="/404" replace />}
            />
          </Routes>
        </Layout>
      </div>
    );
  }
}

export default App;
