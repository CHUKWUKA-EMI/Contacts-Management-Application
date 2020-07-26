import React from "react";

const EditCustomer = (props) => {
  return (
    <div style={{ marginTop: "15%" }} className="container ">
      <form onSubmit={props.onSubmit}>
        <div className="form-row">
          <div className="col-md-3 mb-3">
            <label className="h5" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={props.nameValue}
              onChange={(e) => props.onChangeName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="h5" htmlFor="gender">
              Gender
            </label>
            <select
              className="custom-select my-1 mr-sm-2"
              name="gender"
              value={props.genderValue}
              onChange={(e) => props.onChangeGender(e.target.value)}
              id="gender"
            >
              <option>Choose...</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label className="h5" htmlFor="Phone Number">
              Phone Number
            </label>
            <input
              className="form-control"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={props.phoneNumberValue}
              onChange={props.onChangePhoneNumber}
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-3 mb-3">
            <label className="h5" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={props.emailValue}
              onChange={props.onChangeEmail}
              placeholder="Email"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="h5" htmlFor="homeAddress">
              Home Address
            </label>
            <input
              className="form-control"
              type="text"
              id="homeAddress"
              name="homeAddress"
              value={props.homeAddressValue}
              onChange={props.onChangeHomeAddress}
              placeholder="Home Address"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label className="h5" htmlFor="nationality">
              Nationality
            </label>
            <input
              className="form-control"
              type="text"
              id="nationality"
              name="nationality"
              value={props.nationalityValue}
              onChange={props.onChangeNationality}
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
              value={props.stateValue}
              onChange={props.onChangeState}
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
              value={props.local_govtValue}
              onChange={props.onChangeLocal_Govt}
              placeholder="Local Govt"
            />
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
