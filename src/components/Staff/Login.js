import React from "react";
import CustomerContext from "../../Context/Context";
import dotenv from "dotenv";

dotenv.config();

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const context = React.useContext(CustomerContext);

  const handleSignin = async () => {
    setIsLoading(true);
    const requestBody = {
      email: email,
      password: password,
    };
    if (email.trim() === null || password === null) {
      setError("Input fields cannot be empty!");
      return;
    }
    const { REACT_APP_API_URL } = process.env;
    try {
      const loginData = await fetch(REACT_APP_API_URL + "staff/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const result = await loginData.json();
      setIsLoading(false);
      setSuccess("You have successfully Logged in.");
      context.login(
        result.id,
        result.name,
        result.token,
        result.tokenExpiration
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <center>
        <h3>{isLoading ? "Authenticating..." : ""}</h3>
      </center>
      <form
        style={{ marginLeft: "25%" }}
        className="form-signin mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignin();
        }}
      >
        <div className="form-group col-md-8 mb-3">
          <label htmlFor="inputEmail">Email address</label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group col-md-8 mb-3">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-lg btn-secondary col-md-8" type="submit">
          {isLoading ? "Authenticating..." : "Sign in"}
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;
