import React, { useState } from "react";
import BeneficiaryCard from "./BeneficiaryCard";
import "./BeneficiaryModalStyle.css";
import axios from "axios";
import { useEffect } from "react";
import "./BeneficiaryListStyle.css";

const BeneficiaryList = ({
  beneficiaries,
  customerAccountNumber,
  refreshTransactionDetails,
}) => {
  // State to control the popup visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const beneficiary = {
    beneficiaryName: "",
    beneficiaryAcctNumber: "",
    beneficiaryBankName: "",
    beneficiaryIfscCode: "",
  };
  // States to capture the new beneficiary details
  const [newBeneficiary, setNewBeneficiary] = useState(beneficiary); //to get and set new beneficairy added
  const [allBeneficiaries, setAllBeneficiaries] = useState([]); //to get and set remaining beneficiaries of an account after reload (on add/delete)
  useEffect(() => {
    setAllBeneficiaries(beneficiaries);
  }, [beneficiaries]);
  // Handle the popup visibility
  const openModal = () => {
    console.log("opening modal");
    setIsModalOpen(true);
  };

  const clearBeneficiaryDetails = () => {
    setNewBeneficiary(beneficiary);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    clearBeneficiaryDetails();
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBeneficiary({
      ...newBeneficiary,
      [name]: value,
    });
  };

  // Handle form submission (add beneficiary)
  const handleAddBeneficiary = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/bankingapp/api/v1/accounts/addbeneficiary/${customerAccountNumber}`,
        {
          beneficiaryName: newBeneficiary.beneficiaryName,
          beneficiaryAcctNumber: newBeneficiary.beneficiaryAcctNumber,
          beneficiaryBankName: newBeneficiary.beneficiaryBankName,
          beneficiaryIfscCode: newBeneficiary.beneficiaryIfscCode,
        }
      );
      console.log("Beneficiary added successfully:", response.data);
      // Optionally close the modal or reset the form
      setIsModalOpen(false);
    } catch (error) {
      console.error("There was an error adding the beneficiary!", error);
      setIsModalOpen(false);
    }
  };

  const fetchBeneficiariesAfterAddsOrDelsByCust = async () => {
    console.log("inside fetchBeneficiariesAfterAddsOrDelsByCust");
    try {
      const response = await axios.get(
        `http://localhost:8081/bankingapp/api/v1/accounts/${customerAccountNumber}`
      );
      console.log(response.data);
      setAllBeneficiaries(response.data.beneficiaries); // Assuming response.data is an array of beneficiaries
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    }
  };

  const refreshAccountForTransaction = () => {
    refreshTransactionDetails();
  };

  return (
    <div className="beneficiary-list">
      {/* Header and Add Beneficiary Button */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          type="button"
          className="add-new-beneficiary"
          style={{ marginLeft: "10px" }}
          onClick={openModal}
        >
          Add Beneficiary
        </button>
        <div className="beneficiary-list">
          {/* Render a card for each beneficiary in the beneficiary array */}
          {allBeneficiaries.length > 0 ? (
            allBeneficiaries.map((beneficiary, index) => (
              <BeneficiaryCard
                key={index}
                beneficiaryId={beneficiary.beneficiaryId}
                beneficiaryName={beneficiary.beneficiaryName}
                beneficiaryAcctNumber={beneficiary.beneficiaryAcctNumber}
                beneficiaryBankName={beneficiary.beneficiaryBankName}
                beneficiaryIfscCode={beneficiary.beneficiaryIfscCode}
                customerAccountNumber={customerAccountNumber}
                refreshBeneficiaries={fetchBeneficiariesAfterAddsOrDelsByCust} // Pass the refresh function
                refreshAccountForTransaction={refreshAccountForTransaction}
              />
            ))
          ) : (
            <p>No beneficiaries available.</p>
          )}
        </div>
      </div>
      {/* Modal to add new beneficiary */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Beneficiary</h3>
            <form onSubmit={handleAddBeneficiary}>
              <div>
                <label>Beneficiary Name:</label>
                <input
                  type="text"
                  name="beneficiaryName"
                  value={newBeneficiary.beneficiaryName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Account Number:</label>
                <input
                  type="text"
                  name="beneficiaryAcctNumber"
                  value={newBeneficiary.beneficiaryAcctNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Bank Name:</label>
                <input
                  type="text"
                  name="beneficiaryBankName"
                  value={newBeneficiary.beneficiaryBankName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>IFSC Code:</label>
                <input
                  type="text"
                  name="beneficiaryIfscCode"
                  value={newBeneficiary.beneficiaryIfscCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryList;
