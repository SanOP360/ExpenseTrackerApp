import AuthForm from "./components/AuthForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/profileForm";
import { AuthProvider } from "./components/store/AuthContext";
import Header from "./components/navbar/header";

function App() {
  return (
    <AuthProvider>

    <Header></Header>
      <div className="App">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<AuthForm />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
