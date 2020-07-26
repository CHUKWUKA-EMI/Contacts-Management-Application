import React from "react";
import CustomerContext from "../../Context/Context";

const Login = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");
	const [success, setSuccess] = React.useState("");

	const context = React.useContext(CustomerContext);

	const handleSignin = async () => {
		const requestBody = {
			email: email,
			password: password,
		};
		if (email.trim() === null || password === null) {
			setError("Input fields cannot be empty!");
			return;
		}

		try {
			const loginData = await fetch("http://localhost:5000/staff/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestBody),
			});
			const result = await loginData.json();
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
			<form
				style={{ marginLeft: "25%" }}
				className="form-signin mt-5"
				onSubmit={(e) => {
					e.preventDefault();
					handleSignin();
				}}>
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
					Sign in
				</button>
			</form>
		</React.Fragment>
	);
};

export default Login;
