import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/Customers";
import AddCustomer from "./components/AddCustomer";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignUp from "./components/Staff/Register";
import SignIn from "./components/Staff/Login";
import StaffList from "./components/Staff/StaffList";
import "./App.css";
import CustomersContext from "./Context/Context";

function App() {
  const [count, setCount] = React.useState("");
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");
  const [id, setId] = React.useState(null);
  const [name, setName] = React.useState(localStorage.getItem("name" || ""));

  const login = (id, name, token, tokenExpiration) => {
    setToken(token);
    setId(id);
    setName(name);
  };
  const logout = () => {
    setToken("");
    setId("");
    setName("");
    localStorage.removeItem("token", "");
  };

  const addCustomer = (count) => {
    setCount(count);
  };

  React.useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    addCustomer();
  }, [token, name]);

  return (
    <BrowserRouter>
      <CustomersContext.Provider
        value={{
          customerCount: count,
          addCustomer: addCustomer,
          login: login,
          logout: logout,
          token: token,
          id: id,
          name: name,
        }}
      >
        <div className="container-fluid justify-content-center">
          <NavBar logout={logout} count={count} />
          <main
            style={{ paddingRight: "15%" }}
            role="main"
            className="container"
          >
            <Switch>
              <Route exact path="/" component={Home} />
              {token && <Redirect from="/signin" to="/" />}
              <Redirect from="/signout" to="/" />
              {token && <Route path="/customers" component={Customers} />}
              {token && <Route path="/add-customer" component={AddCustomer} />}
              <Route path="/signup" component={SignUp} />
              {token && <Route path="/staff" component={StaffList} />}
              <Route path="/signin" component={SignIn} />

              {!token && <Redirect from="/customers" to="/signin" />}
              {!token && <Redirect from="/add-customer" to="/signin" />}
            </Switch>
          </main>
        </div>
      </CustomersContext.Provider>
    </BrowserRouter>
  );
}

export default App;
