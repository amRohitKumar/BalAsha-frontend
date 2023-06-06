import React from "react";
import Header from "../components/header/header";
import "./parents_investigation.css";

const ParentsInvestigation = () => {
  return (
    <div className="page">
      <Header />
      <section className="view"> View</section>
      <div className="outer">
        <select className="dropdown">
          <option value="complete">Complete</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="search-div">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by child name"
        />
        <button className="search-btn" type="submit">
          Go
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Child Name</th>
              <th>Date</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123</td>
              <td>John Doe</td>
              <td>2023-06-05</td>
              <td>Download Link</td>
            </tr>
            <tr>
              <td>456</td>
              <td>Jane Smith</td>
              <td>2023-06-06</td>
              <td>Download Link</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      <div className="buttons">
        <button className="back-button">Back</button>
        <button className="next-button">Next</button>
      </div>
    </div>
  );
};

export default ParentsInvestigation;
