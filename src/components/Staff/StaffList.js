import React from "react";
import StaffContext from "../../Context/Context";
import Spinner from "../Spinner";

const StaffList = () => {
	const [staff, setStaff] = React.useState([]);
	const [error, setError] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const context = React.useContext(StaffContext);

	const getStaff = React.useCallback(async () => {
		setIsLoading(true);
		try {
			const data = await fetch("http://localhost:5000/staff/staff", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: context.token,
				},
			});
			const result = await data.json();
			setStaff(result.staff);
			setIsLoading(false);
		} catch (err) {
			setError(err.message);
		}
	}, [context]);

	React.useEffect(() => {
		getStaff();
	}, [getStaff]);

	let spinner = <Spinner />;
	if (!isLoading) {
		return (
			<React.Fragment>
				{error && (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				)}

				{!isLoading && (
					<table className="table table-hover table-bordered table-dark mr-5 mt-5">
						<thead>
							<tr>
								<th scope="col">S/N</th>
								<th scope="col">First Name</th>
								<th scope="col">Last Name</th>
								<th scope="col">Email</th>
								<th scope="col">Role</th>
							</tr>
						</thead>
						<tbody>
							{staff.map((person, index) => {
								return (
									<tr key={person.id}>
										<td>{index + 1}</td>
										<td>{person.firstName}</td>
										<td>{person.lastName}</td>
										<td>{person.email}</td>
										<td>{person.role}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</React.Fragment>
		);
	}
	return <React.Fragment>{spinner}</React.Fragment>;
};

export default StaffList;
