import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";
import routes from "./routes";
import ReactLoading from "react-loading"
import "./App.css";

function App() {
  return (
    <Router>
      <Header />

      <Suspense fallback={<ReactLoading type={"spin"}
        color={"#163C40"}
        height={500}
        width={500} />}>
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
