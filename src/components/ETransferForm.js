// ETransferForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ETransferForm = ({ contacts, onSubmit }) => {
  const [fromAccount, setFromAccount] = useState('checking');
  const [toContact, setToContact] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setShowModal(true);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!toContact) errors.toContact = 'Please select a contact.';
    if (!amount.trim() || isNaN(amount) || amount <= 0) errors.amount = 'Enter a valid amount.';
    return errors;
  };

  const handleConfirm = () => {
    const transferData = {
      fromAccount,
      toContact,
      amount: parseFloat(amount.trim()),
      type: 'etransfer',
      accountNumber: localStorage.getItem('accountNumber'), // Use account number from local storage
    };
    onSubmit(transferData);
    setFromAccount('checking');
    setToContact('');
    setAmount('');
    navigate('/');
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-lg border-0" style={{ borderRadius: '10px' }}>
        <div className="text-center mb-4">
          <h1 className="text-danger fw-bold">CIBC <span className="text-black">Bank</span></h1>
          <p className="text-muted">Secure and Fast E-Transfer Service</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold">Transfer From</label>
            <div className="d-flex justify-content-center">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${fromAccount === 'checking' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setFromAccount('checking')}
                >
                  Checking
                </button>
                <button
                  type="button"
                  className={`btn ${fromAccount === 'savings' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setFromAccount('savings')}
                >
                  Savings
                </button>
                <button
                  type="button"
                  className={`btn ${fromAccount === 'creditCard' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setFromAccount('creditCard')}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  className={`btn ${fromAccount === 'investment' ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setFromAccount('investment')}
                >
                  Investment
                </button>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="toContact" className="form-label fw-bold">Recipient Contact</label>
            <select
              id="toContact"
              className={`form-select ${formErrors.toContact ? 'is-invalid' : ''}`}
              value={toContact}
              onChange={(e) => setToContact(e.target.value)}
              required
            >
              <option value="" disabled>Select contact</option>
              {contacts.map((contact, index) => (
                <option key={index} value={contact}>{contact}</option>
              ))}
            </select>
            {formErrors.toContact && <div className="invalid-feedback">{formErrors.toContact}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="form-label fw-bold">Amount to Transfer ($)</label>
            <input
              type="number"
              id="amount"
              className={`form-control ${formErrors.amount ? 'is-invalid' : ''}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            {formErrors.amount && <div className="invalid-feedback">{formErrors.amount}</div>}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-danger btn-lg px-5">Transfer Funds</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="#!" className="text-danger text-decoration-none me-2 custom-link">Terms of Use</a>
          <span className="text-muted">|</span>
          <a href="#!" className="text-danger text-decoration-none ms-2 custom-link">Privacy Policy</a>
        </div>
      </div>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Transfer</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to transfer funds?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETransferForm;
