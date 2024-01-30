import AuthForm from "./components/AuthForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/profileForm";
import { AuthProvider } from "./components/store/AuthContext";
import Header from "./components/navbar/header";
import Expense from "./components/Expense/Expense";

function App() {
  
  
  return (
    <AuthProvider>
    <Header></Header>
      <div className="App">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<AuthForm />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path='/Expense' element={<Expense/>} />
          
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
