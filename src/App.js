import AuthForm from "./components/AuthForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </div>
  );
}

export default App;
