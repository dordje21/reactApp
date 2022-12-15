import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Quiz from './container/Quiz/quiz';

function App() {
  return (
    <div className="App">
       <Layout>
          <Quiz/>
       </Layout>
    </div>
  );
}

export default App;
