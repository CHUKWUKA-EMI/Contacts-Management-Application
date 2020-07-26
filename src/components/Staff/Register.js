import React from "react";
import dotenv from "dotenv";

dotenv.config();

const Register = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [passError, setPassError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const passwordCheck = (event) => {
    if (typeof password !== undefined && typeof confirmPassword !== undefined) {
      if (event.target.value !== password) {
        setDone(false);
        setPassError(true);
      } else {
        setDone(true);
        setPassError(false);
      }
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    };
    if (
      firstName.trim() === undefined ||
      lastName.trim() === undefined ||
      email.trim() === undefined ||
      password === undefined
    ) {
      setError("Input fields cannot be empty!");
      return;
    }
    const { REACT_APP_API_URL } = process.env;
    try {
      const data = await fetch(REACT_APP_API_URL + "staff/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      await data.json();
      setSuccess(
        "You have successfully registered. A confirmation message has been sent to your email for verification."
      );
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      {success && (
        <div className="alert alert-success text-primary" role="alert">
          {success}
        </div>
      )}
      {error && (
        <div className="alert alert-danger text-dark" role="alert">
          {error}
        </div>
      )}
      <center>
        <h3>{isLoading ? "Connecting..." : ""}</h3>
      </center>
      <form
        style={{ marginLeft: "25%" }}
        className="form-signup mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        <span
          style={{ marginLeft: "30%", width: "10%" }}
          className="material-icons"
        >
          account_circle
        </span>
        <div className="col-md-8 mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="col-md-8 mb-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="col-md-8 mb-3">
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

        <div className="col-md-8 mb-3">
          <label htmlFor="inputPassword">Password</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            {done && !passError && (
              <span>
                <span className="material-icons alert-success">done</span>
                Passwords matched!
              </span>
            )}
            {passError && !done && (
              <span>
                <span className="material-icons alert-danger">error</span>
                Passwords did not match!
              </span>
            )}
          </div>
        </div>
        <div className="col-md-8 mb-3">
          <label htmlFor="confirmInputPassword">Confirm Password</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              type="password"
              id="confirmInputPassword"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                passwordCheck(e);
              }}
              required
            />
            {done && !passError && (
              <span>
                <span className="material-icons alert-success">done</span>
                Passwords matched!
              </span>
            )}
            {passError && !done && (
              <span>
                <span className="material-icons alert-danger">error</span>
                Passwords did not match!
              </span>
            )}
          </div>
        </div>
        <div className="col-md-8 mb-3">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            className="form-control"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-lg btn-secondary col-md-8" type="submit">
          {isLoading ? "Connecting..." : "Sign up"}
        </button>
      </form>
    </React.Fragment>
  );
};

export default Register;
