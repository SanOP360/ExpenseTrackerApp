import AuthForm from "./components/AuthForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/profileForm";
import Header from "./components/navbar/header";
import Expense from "./components/Expense/Expense";
import AuthContext from "./components/store/AuthContext";
import { useContext } from "react";

function App() {
  
  const ctx=useContext(AuthContext);
  const isLogin=ctx.loginCheck;
  return (
    <>
      
      <Header></Header>
      <div className="App">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<AuthForm />} />
          <Route path="/Profile" element={<Profile />} />
         {isLogin && <Route path="/Expense" element={<Expense />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
