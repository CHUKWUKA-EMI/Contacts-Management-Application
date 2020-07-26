import React from "react";
import CustomerContext from "../Context/Context";

const AddCustomer = () => {
	const [name, setName] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [gender, setGender] = React.useState("");
	const [homeAddress, setHomeAddress] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [nationality, setNationality] = React.useState("");
	const [state, setState] = React.useState("");
	const [local_govt, setLocal_Govt] = React.useState("");

	const [success, setSuccess] = React.useState("");
	const [error, setError] = React.useState("");

	const context = React.useContext(CustomerContext);

	const handleSubmit = async () => {
		const requestBody = {
			name: name,
			phone_number: phoneNumber,
			gender: gender,
			home_address: homeAddress,
			email: email,
			nationality: nationality,
			state: state,
			local_govt: local_govt,
		};

		try {
			const data = await fetch("http://localhost:5000/customers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: context.token,
				},
				body: JSON.stringify(requestBody),
			});
			await data.json();
			const count = context.customerCount + 1;
			context.addCustomer(count);
			setSuccess(
				`Customer with Name: ${name} and Email: ${email} has been successfully saved to your database.`
			);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="container mt-4">
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
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>
				<div className="form-row">
					<div className="col-md-3 mb-3">
						<label className="h5" htmlFor="name">
							<span className="material-icons">person_outline</span> Name
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Name"
							required
						/>
					</div>
					<div className="col-md-3 mb-3">
						<label className="h5" htmlFor="gender">
							<span className="material-icons">face</span> Gender
						</label>
						<select
							className="custom-select my-1 mr-sm-2"
							name="gender"
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							id="gender">
							<option>Choose...</option>
							<option value="male">male</option>
							<option value="female">female</option>
						</select>
					</div>
					<div className="col-md-3 mb-3">
						<label className="h5" htmlFor="Phone Number">
							<span className="material-icons">phone</span> Phone Number
						</label>
						<input
							className="form-control"
							type="tel"
							id="phoneNumber"
							name="phoneNumber"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							placeholder="Phone Number"
							required
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-3 mb-3">
						<label className="h5" htmlFor="email">
							<span className="material-icons">mail_outline</span> Email
						</label>
						<input
							className="form-control"
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
						/>
					</div>
					<div className="col-md-3 mb-3">
						<label className="h5" htmlFor="homeAddress">
							<span className="material-icons">my_location</span> Home Address
						</label>
						<input
							className="form-control"
							type="text"
							id="homeAddress"
							name="homeAddress"
							value={homeAddress}
							onChange={(e) => setHomeAddress(e.target.value)}
							placeholder="Home Address"
						/>
					</div>
					<div className="col-md-3 mb-3">
						<label className="h5" htmlFor="nationality">
							<span className="material-icons">language</span> Nationality
						</label>
						<input
							className="form-control"
							type="text"
							id="nationality"
							name="nationality"
							value={nationality}
							onChange={(e) => setNationality(e.target.value)}
							placeholder="Nationality"
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="col-md-3 mb-3">
						<label className="h5" htmlFor="state">
							State
						</label>
						<input
							className="form-control"
							type="text"
							id="state"
							name="state"
							value={state}
							onChange={(e) => setState(e.target.value)}
							placeholder="State"
						/>
					</div>
					<div className="col-md-3 mb-3">
						<label className="h5" htmlFor="local govt">
							Local Govt
						</label>
						<input
							className="form-control"
							type="text"
							id="local_govt"
							name="local_govt"
							value={local_govt}
							onChange={(e) => setLocal_Govt(e.target.value)}
							placeholder="Local Govt"
						/>
					</div>
				</div>
				<button className="btn btn-primary" type="submit">
					Submit form
				</button>
			</form>
		</div>
	);
};
export default AddCustomer;
