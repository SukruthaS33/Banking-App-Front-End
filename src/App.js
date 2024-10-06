import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/home/Home";
import Register from "./Components/register/Register";
import Login from "./Components/login/Login";
import CustomerDetails from "./Components/customerDetails/CustomerDetails";
import AccountDetails from "./Components/accountDetails/AccountDetails ";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewAccountForm from "./Components/accountDetails/NewAccountForm";
import AdminViewCustomerDetails from "./Components/Admin/AdminViewCustomerDetails";
import AdminCustomerDetails from "./Components/Admin/AdminCustomerDetails";
import AdminNewRequests from "./Components/Admin/AdminNewRequests";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/home"} element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer/:customerId" element={<CustomerDetails />} />
          <Route path="/account/:accountNumber" element={<AccountDetails />} />
          <Route
            path="/customer/newAccount/:customerId/:customerName"
            element={<NewAccountForm />}
          />
          <Route
            path="/admin/customers"
            element={<AdminViewCustomerDetails />}
          />
          <Route path="admin/:customerId" element={<AdminCustomerDetails />} />
          <Route path="/admin/requests" element={<AdminNewRequests />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/*

 <Home />
      <Register />
      <Login />
      <CustomerDetails />
      <AccountDetails />

      */
