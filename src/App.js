import './App.css';
import { useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const handleInputChange = (e) => {
    if (/\D/.test(e.target.value.replace(/\s+/g, ''))) {
      setAlert(true);
    } else {
      setAlert(false);
    }
    setData(e.target.value);
  }

  console.log(alert);

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
          body: JSON.stringify(Array.from(data.trim().replace(/\s+/g, ' ').split(' ')))
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
      setMessage("Введите цифры");
      setResult("");
    }
  };

  return (
      <div className="App">
        <div className="message"><h1>Введите цифры для игры в Fizz Buzz</h1></div>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={data}
              placeholder="Введите числа"
              onChange={handleInputChange}
          />
          {alert && <div>Введите только цифры через пробел</div>}
          <button
              type="submit"
              disabled={alert}
          >Play</button>
          <div className="message">{message ? <h3>{message}</h3> : null}</div>
        </form>
        <h1>{result}</h1>
      </div>
  );
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default App;
