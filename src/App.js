import logo from "./logo.svg";
import "./App.css";
import { QuizApp } from "./components/QuizApp";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <QuizApp />
      </header>
    </div>
  );
}

export default App;
