import React, { useState } from "react";
import "./changeDecimal.css";

function ChangeDecimal() {
  const [decimal, setDecimal] = useState(""); // Initial state as empty string
  const [binary, setBinary] = useState("");

  const handleDecimal = (e) => {
    const value = e.target.value;
    if (value === "") {
      setDecimal(""); // Clear the decimal state if the input is empty
    } else {
      const intValue = parseInt(value, 10); // Convert to integer
      if (!isNaN(intValue)) {
        setDecimal(intValue); // Update state if the value is valid
      } else {
        alert("Invalid input: Not a number");
      }
    }
  };

  const change = (number) => {
    let result = [];
    while (number >= 1) {
      if (number % 2 === 0) {
        result.push(0);
        number = number / 2;
      } else {
        result.push(1);
        number = (number - 1) / 2;
      }
    }
    result.reverse();
    return result.join("");
  };

  const handleConvert = () => {
    setBinary(change(decimal));
  };

  return (
    <div className="container">
      <h1>Convert Decimal to Binary</h1>
      <div className="binary-to-decimal-container">
        <div>
          <input
            className="input-number"
            type="number"
            value={decimal}
            onChange={handleDecimal}
          />
          <button onClick={handleConvert}>Convert</button>
        </div>
        <p>{binary}</p>
      </div>
    </div>
  );
}

export default ChangeDecimal;
