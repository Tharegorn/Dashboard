import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";
import routes from "./routes";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading... please wait</div>}>
        <Switch>
          {routes.map((route) => (
            <Route
              path={route.path}
              component={route.component}
              key={route.path}
            />
          ))}
        </Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
