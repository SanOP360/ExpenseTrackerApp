import AuthForm from "./components/AuthForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/profileForm";
import Header from "./components/navbar/header";
import Expense from "./components/Expense/Expense";
import { useSelector } from "react-redux";

function App() {
  
  const isAuth=useSelector((state)=>state.auth.isAuthenticated)
  return (
    <>
      
      <Header></Header>
      <div className="App">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<AuthForm />} />
          <Route path="/Profile" element={<Profile />} />
         {isAuth && <Route path="/Expense" element={<Expense />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
