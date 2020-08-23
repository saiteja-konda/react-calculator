import React, { Component } from "react";
class Calculator extends Component {
  state = {
    value: null,
    display: "0",
    waitingForOperand: false,
    operator: null,
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }


  addDigit = (button) => {
    const { display, waitingForOperand } = this.state;
    if (waitingForOperand) {
      this.setState({
        display: String(button),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        display: display === "0" ? String(button) : display + button,
      });
    }
  };

  addDot = () => {
    const { display, waitingForOperand } = this.state;
    if (waitingForOperand) {
      this.setState({
        display: ".",
        waitingForOperand: false,
      });
    } else if (display.indexOf(".") === -1) {
      this.setState({
        display: display + ".",
        waitingForOperand: false,
      });
    }
  };

  clearDisplay = () => {
    this.setState({
      display: "0",
      waitingForOperand: false,
      operator: null,
      value: null,
    });
  };
  
  backSpace = () =>{
    const{display} = this.state;
    this.setState({
      display: display.substring(0, display.length - 1) || '0'
    })  
  }

  inputPercent = () => {
    const { display } = this.state;
    const value = parseInt(display);
    this.setState({ display: String(value / 100) });
  };

  toggleMinus = () => {
    const { display } = this.state;
    this.setState({
      display: display.charAt(0) === "-" ? display.substr(1) : "-" + display,
    });
  };
  perfromOperation(nextOperator) {
    const { display, operator, value } = this.state;
    const calculatorOperations = {
      "/": (prevValue, nextValue) => prevValue / nextValue,
      "*": (prevValue, nextValue) => prevValue * nextValue,
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "=": (prevValue, nextValue) => nextValue,
    };
    const nextValue = parseFloat(display);
    if (value === null) {
      this.setState({ value: nextValue });
    } else if (operator) {
      const currentValue = value || 0;
      const calcuclatedValue = calculatorOperations[operator](
        currentValue,
        nextValue
      );
      this.setState({
        value: calcuclatedValue,
        display: String(calcuclatedValue),
      });
    }
    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
    
  }
  handleKeyDown = (event) => {

    const calculatorOperations = {
      "/": (prevValue, nextValue) => prevValue / nextValue,
      "*": (prevValue, nextValue) => prevValue * nextValue,
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "=": (prevValue, nextValue) => nextValue,
    };
    let { key } = event;

    if (key === "Enter") key = "=";

    if (/\d/.test(key)) {
      event.preventDefault();
      this.addDigit(parseInt(key, 10));
    } else if (key in calculatorOperations) {
      event.preventDefault();
      this.perfromOperation(key);
    } else if (key === ".") {
      event.preventDefault();
      this.addDot();
    } else if (key === "%") {
      event.preventDefault();
      this.inputPercent();
    } else if (key === "Backspace") {
      event.preventDefault();
      this.backSpace();
    } else if (key === "C" || 'c') {
      event.preventDefault();

      if (this.state.displayValue !== "0") {
        this.clearDisplay();
      } else {
        this.clearAll();
      }
    }
  };

  render() {
    const numbers1 = [7, 8, 9];
    const numbers2 = [4, 5, 6];
    const numbers3 = [1, 2, 3];
    const zero = 0;

    const renderNumber1 = numbers1.map((button, index) => (
      <button
        className="span"
        key={index}
        onClick={() => this.addDigit(button)}
      >
        {button}
      </button>
    ));
    const renderNumber2 = numbers2.map((button, index) => (
      <button
        className="span"
        key={index}
        onClick={() => this.addDigit(button)}
      >
        {button}
      </button>
    ));
    const renderNumber3 = numbers3.map((button, index) => (
      <button
        className="span"
        key={index}
        onClick={() => this.addDigit(button)}
      >
        {button}
      </button>
    ));
    const renderZero = (
      <button className="span double" key={0} onClick={() => this.addDigit(0)}>
        {zero}
      </button>
    );
    let Displayclear;
    if (this.state.display === "0") {
      Displayclear = "AC";
    } else {
      Displayclear = "C";
    }

    return (
      <React.Fragment>
        {/*     <h7 className="state">State</h7>
    <pre className="state"> {JSON.stringify(this.state, null)}</pre> */}
        <div className="calculator" id="calculator">
          <div className="input">
            <input
              type="text"
              onChange={this.changeHandler}
              value={this.state.display}
              disabled={true}
            />
          </div>

          <button className="span gray" onClick={this.clearDisplay}>
            {Displayclear}
          </button>
          <button className="span gray" onClick={this.toggleMinus}>
            +/-
          </button>
          <button className="span gray" onClick={this.inputPercent}>
            %
          </button>
          <button
            className="span fun"
            onClick={() => this.perfromOperation("/")}
          >
            ÷
          </button>
          {renderNumber1}
          <button
            className="span fun"
            onClick={() => this.perfromOperation("*")}
          >
            x
          </button>
          {renderNumber2}
          <button
            className="span fun"
            onClick={() => this.perfromOperation("-")}
          >
            -
          </button>
          {renderNumber3}
          <button
            className="span fun"
            onClick={() => this.perfromOperation("+")}
          >
            +
          </button>
          {renderZero}
          <button className="span" onClick={this.addDot}>
            •
          </button>
          <button
            className="span fun"
            onClick={() => this.perfromOperation("+")}
          >
            =
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Calculator;
