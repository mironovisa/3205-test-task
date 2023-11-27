import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import "./App.css";

const App = () => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [results, setResults] = useState({});
  const [searching, setSearching] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidNumber = (number) => {
    const numberRegex = /^\d{2}-\d{2}-\d{2}$/;
    return numberRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (number && !isValidNumber(number)) {
      alert("Please enter a valid number in the format XX-XX-XX");
      return;
    }

    setSearching(true);

    try {
      const response = await axios.post("http://localhost:3001/search", {
        email,
        number,
      });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setResults(response.data.data[0]);
      }
    } catch (error) {
      alert("Error occurred while searching. Please try again.");
    } finally {
      setSearching(false);
      setEmail("");
      setNumber("");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Check data</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="emailInput" className="label">
            Email
          </label>
          <input
            type="email"
            id="emailInput"
            className="input"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="numberInput" className="label">
            Number
          </label>
          <InputMask
            mask="99-99-99"
            maskChar="_"
            id="numberInput"
            className="input"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter a number (XX-XX-XX)"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {searching && (
        <div className="searching-message">
          Searching for data you entered: {email} and{" "}
          {number ? number : "no number"}
        </div>
      )}
      <div className="results">
        <h2 className="results-title">Results:</h2>
        <ul className="results-list">
          <li>Email: {results.email}</li>
          <li>Number: {results.number}</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
