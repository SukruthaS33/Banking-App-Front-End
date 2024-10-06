import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function AdminCustomerDetails() {
  const { customerId } = useParams();
  useEffect(() => {
    // Make an API call to get customer data
    axios
      .get(`http://localhost:8081/bankingapp/api/v1/admin/${customerId}`)
      .then((response) => {
        console.log("customer related data");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer data!", error);
      });
  }, []); // Empty array means this effect runs only once when the component mounts

  return <div>Customer for Admin</div>;
}
