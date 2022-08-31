import './App.css';
import styled from 'styled-components';

import "./App.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  const StyledInput = styled.input`
  display: block;
  margin: 10px 90px;
  border: 1px solid lightblue;
`;

  const StyledButton = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = data.trim().replace(/\s+/g, ' ').split(' ').every(item => isNumber(item));
    console.log(valid);
    if (valid) {
      try {
        const res = await fetch("http://localhost:8080/", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Credentials': 'true'
          },
          body: data
        });
        const da = await res.text();

        if (res.status === 200) {
          setData("");
          setMessage("");
          setResult(da);
        } else {
          setMessage("Some error occured");
        }
      } catch (err) {
        console.log(err);
        setMessage("Some error occured");
      }
    } else {
      setMessage("Введите, пожалуйста, числа через пробел. Буквенные значения не принимаются");
      setResult("");
    }
  };

  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={data}
              placeholder="Введите число"
              onChange={(e) => setData(e.target.value)}
          />
          <button type="submit">Send</button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
        <h1>{result}</h1>
      </div>
  );
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default App;
