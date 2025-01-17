import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, About, SignIn, SignUp, Project } from "./Pages";
import Dashboard from "./Components/Dashboard";

import Header from "./Components/Header";
import FooterCom from "./Components/Footer";
import Verification from "./Pages/Verification";
import Success from "./Pages/Success";
import Public from "./Components/Public";
import Protected from "./Components/Protected";
import useAuth from "./hooks/useAuth";
import "./App.scss";

function App() {
  const isLoggin = useAuth();
  return !isLoggin ? (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/success" element={<Success />} />
        <Route path="/protected" element={<Protected />} />
        {/* <Route path="/new-map" element={<NewMap />} /> */}
      </Routes>
      {/* <FooterCom /> */}
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
