import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import { evaluate } from 'mathjs';

// Componente principal, responsável por renderizar os outros
export default function App() {
  const [input, setInput] = useState("");
  const operators = ['+', '-', '*', '/']

  // Função para inserir e limitar números no 'input'
  const insertNum = (val) => {
    if (input.length > 14) return;
    // Incomplete logic *to repair*
    if (input.split("").includes(".") && val === ".") return;
    setInput(input + val);
  }

  // Função para inserir operadores
  const insertOperator = (val) => {
    if (input.length > 14) return;
    if (input === "" || (operators.includes(input[input.length - 1]) && operators.includes(val))) {
      return;
    } else {
      setInput(input + val);
    }
  }

  // Função para calcular a expressão usando a biblioteca mathjs
  const calc = () => {
    const lIndex = input[input.length - 1]
    if (input === "" || operators.includes(lIndex)) {
      return input;
    } else {
      setInput(evaluate(input));
    }
  }

  return (
    <>
    <div className="app">
    <h1>Calculadora React</h1>
      <div className="main-content">
        <Input>{input}</Input>
        <div className="buttons">
          <Button onClick={insertNum}>7</Button>
          <Button onClick={insertNum}>8</Button>
          <Button onClick={insertNum}>9</Button>
          <Button onClick={insertOperator}>*</Button>
        </div>
        <div className="buttons">
          <Button onClick={insertNum}>4</Button>
          <Button onClick={insertNum}>5</Button>
          <Button onClick={insertNum}>6</Button>
          <Button onClick={insertOperator}>/</Button>
        </div>
        <div className="buttons">
          <Button onClick={insertNum}>1</Button>
          <Button onClick={insertNum}>2</Button>
          <Button onClick={insertNum}>3</Button>
          <Button onClick={insertOperator}>+</Button>
        </div>
        <div className="buttons">
          <Button onClick={insertNum}>0</Button>
          <Button onClick={insertNum}>.</Button>
          <Button onClick={() => setInput("")}>C</Button>
          <Button onClick={insertNum}>-</Button>
        </div>
        <div className="buttons">
          <Button onClick={() => calc()}>=</Button>
        </div>
      </div>
    </div>
    </>
  );
}

// Componente que recebe e exibe as expressões
function Input({ children }) {
  return (
    <div className="input">{children}</div>
  )
}

// Componente responsável pelos botões. Retorna o botão com base nas 'props'.
function Button({ children, onClick }) {
  const isNum = (val) => (!isNaN(val) || val === 'C' || val === '.') ? true : false;
  const isEqSign = (val) => (val === "=") ? true : false;

  const c = {color: "red"}

  return (
    // Facilita estilizações diferentes por criar 'className's diferentes
    <>
      <div
        className={`btn ${isEqSign(children) ? "equal" : null}
        ${isNum(children) ? null : "operator"}`}
        onClick={() => onClick(children)}
        style={children === 'C' ? c : null}
      >
        {children}
      </div>  
    </>
  )
}
