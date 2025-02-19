import React, { useState } from "react";
import "./StarPattern.css";

function StarPattern() {
  const [count, setCount] = useState(5);
  const pattern = [];

  for (let i = 1; i <= count; i++) pattern.push("*".repeat(i));
  for (let i = count - 1; i >= 1; i--) pattern.push("*".repeat(i));

  return (
    <div className="star-pattern-container">
      <h2>Star Pattern</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="star-pattern-input"
      />
      <pre className="star-pattern-output">{pattern.join("\n")}</pre>
    </div>
  );
}

export default StarPattern;