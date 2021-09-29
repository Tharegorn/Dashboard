import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header/header";
import Home from "./routes/home/home";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import Admin from "./routes/admin/admin"
import Account from "./routes/account/account";
import Dashboard from "./routes/dashboard/dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
      <Header />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/account" component={Account} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
