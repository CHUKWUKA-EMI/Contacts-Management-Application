import React from "react";
import Spinner from "./Spinner";
import CustomersContext from "../Context/Context";

const Home = () => {
  const [query, setQuery] = React.useState("");
  const [customers, setCustomers] = React.useState([]);
  const [display, setDisplay] = React.useState(false);
  const [error, setError] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { REACT_APP_API_URL } = process.env;
  const context = React.useContext(CustomersContext);

  const handleSearch = async () => {
    setIsLoading(true);
    const requestBody = {
      query: query,
    };

    try {
      const data = await fetch(REACT_APP_API_URL + "customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: context.token,
        },
        body: JSON.stringify(requestBody),
      });
      const result = await data.json();

      setCustomers(result.customer.rows);
      setIsLoading(false);
      setDisplay(true);
      setInfo(
        `You have a total of ${result.customer.count} customers that match your search`
      );
    } catch (err) {
      setError(err.message);
    }
  };

  let spinner = <Spinner />;
  if (!isLoading) {
    return (
      <React.Fragment>
        {info && (
          <div className="alert alert-info" role="alert">
            {info}
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {!info && !error && (
          <div className="jumbotron text-center">
            <h1 className="display-4">WELCOME TO OUR CUSTOMERS PORTAL</h1>
            <p className="lead">
              This is a simple application for managing our customers' contact
              details.
            </p>
            <hr className="my-4" />
            <p>
              You can add customers to the database and also get the details of
              all customers by clicking the apprioaprate link on the Navbar
            </p>
            <p>
              You can also search for a customer by entering a key word
              associted with him/her in the search box below...
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              style={{ marginLeft: "30%" }}
              className="form-inline mt-2 mt-md-0 mr-0"
            >
              <input
                className="form-control md-col-10  mr-md-2"
                type="text"
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a key word ..."
                aria-label="Search"
              />

              <button className="btn btn-success my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        )}
        {display && !isLoading && (
          <table className="table table-hover table-bordered table-dark mr-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Email</th>
                <th scope="col">Home Address</th>
                <th scope="col">Nationality</th>
                <th scope="col">State</th>
                <th scope="col">Local Govt</th>
                <th scope="col">
                  <button
                    onClick={() => {
                      setDisplay(false);
                      setError("");
                      setInfo("");
                    }}
                    className="btn btn-primary"
                  >
                    close
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.gender}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.email}</td>
                    <td>{customer.homeAddress}</td>
                    <td>{customer.nationality}</td>
                    <td>{customer.state}</td>
                    <td>{customer.local_govt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
  return !error && <React.Fragment>{spinner}</React.Fragment>;
};

export default Home;
