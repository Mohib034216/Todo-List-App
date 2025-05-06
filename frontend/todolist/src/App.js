import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Todo from './components/Todo';
import Signin from './components/Signin';
import Signup from './components/Signup';
import OtpInput from './components/OtpInput';

function App() {
  return (
    <div className="App">
       <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifying" element={<OtpInput />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
