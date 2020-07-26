import React from "react";

export default React.createContext({
	customerCount: null,
	addCustomer: () => {},
	id: null,
	name: "",
	token: "",
	login: () => {},
	logout: () => {},
});
