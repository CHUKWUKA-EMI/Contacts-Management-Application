import React from "react";
import EditCustomer from "./editCustomer";
import Spinner from "./Spinner";
import CustomerContext from "../Context/Context";

const CustomersList = (props) => {
  const [customers, setCustomers] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);
  const [customer, setCustomer] = React.useState({});
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { REACT_APP_API_URL } = process.env;

  const context = React.useContext(CustomerContext);

  //edit state
  const [name, setName] = React.useState(customer.name);
  const [phoneNumber, setPhoneNumber] = React.useState(customer.phoneNumber);
  const [gender, setGender] = React.useState(customer.gender);
  const [homeAddress, setHomeAddress] = React.useState(customer.homeAddress);
  const [email, setEmail] = React.useState(customer.email);
  const [nationality, setNationality] = React.useState(customer.nationality);
  const [state, setState] = React.useState(customer.state);
  const [local_govt, setLocal_Govt] = React.useState(customer.local_govt);

  const getCustomers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetch(REACT_APP_API_URL, RE + "customers", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: context.token,
        },
      });

      const result = await data.json();
      setCustomers(result.customers.rows);
      setIsLoading(false);
      context.addCustomer(result.customers.count);
      setSuccess(
        `There are a total of ${result.customers.count} customers in your database`
      );
    } catch (err) {
      setError(err);
    }
  }, [context, REACT_APP_API_URL]);

  React.useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const enableEdit = (customerId) => {
    setIsEdit(true);
    const selectedCustomer = customers.find((c) => c.id === customerId);
    setCustomer(selectedCustomer);
  };
  const handleUpdate = async () => {
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
      const data = await fetch(
        REACT_APP_API_URL,
        RE + `customer/${customer.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: context.token,
          },
          body: JSON.stringify(requestBody),
        }
      );
      await data.json();
      const updatedCustomerList = customers.map((person) => {
        if (person.id === customer.id) {
          return Object.assign({}, customer);
        } else {
          return person;
        }
      });
      setCustomers(updatedCustomerList);
      setSuccess(`Successfully updated customer with id ${customer.id}`);
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await fetch(REACT_APP_API_URL, RE + `customer/${customerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: context.token,
        },
      });
      const newCustomerList = customers.filter((c) => c.id !== customerId);
      setCustomers(newCustomerList);
      setSuccess(`Customer with id ${customerId} deleted successfully`);
    } catch (err) {
      setError(err);
    }
  };

  let content = <Spinner />;
  if (!isLoading) {
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
        {isEdit && (
          <EditCustomer
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
              setIsEdit(false);
            }}
            nameValue={name}
            onChangeName={(inp) => setName(inp)}
            genderValue={gender}
            onChangeGender={(inp) => setGender(inp)}
            phoneNumberValue={phoneNumber}
            onChangePhoneNumber={(e) => setPhoneNumber(e.target.value)}
            emailValue={email}
            onChangeEmail={(e) => setEmail(e.target.value)}
            homeAddressValue={homeAddress}
            onChangeHomeAddress={(e) => setHomeAddress(e.target.value)}
            nationalityValue={nationality}
            onChangeNationality={(e) => setNationality(e.target.value)}
            stateValue={state}
            onChangeState={(e) => setState(e.target.value)}
            local_govtValue={local_govt}
            onChangeLocal_Govt={(e) => setLocal_Govt(e.target.value)}
          />
        )}

        {!isEdit && !isLoading && (
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
                <th scope="col"></th>
                <th scope="col"></th>
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
                    <td>
                      <button
                        onClick={() => enableEdit(customer.id)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
  return <React.Fragment>{content}</React.Fragment>;
};

export default CustomersList;
