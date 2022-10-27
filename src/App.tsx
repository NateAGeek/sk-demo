import { add, dinero } from 'dinero.js';
import './App.css'
import CalculatorButton from './components/CalculatorButton/CalculatorButton';
import { useCalculatorContext } from './state/CalculatorContext'
import { dineroBigint, ETH } from './utils/Currencies';

function App() {
  const {calculatorInputValue, setCalculatorInputValue, previousValue, setPreviousValue} = useCalculatorContext();

  const current_currency = ETH;

  return (
    <div>
      <div>
        {calculatorInputValue}
      </div>
      <div>
        <CalculatorButton textOrIcon={"CLR"} onClick={() => {
          setCalculatorInputValue("");
        }}/>

        <CalculatorButton textOrIcon={"+"} onClick={() => {
          const input_one = dineroBigint({
            amount: BigInt(previousValue.replace(".", "")),
            currency: ETH,
            scale: BigInt(previousValue.indexOf("."))
          });

          const input_two = dineroBigint({
            amount: BigInt(calculatorInputValue.replace(".", "")),
            currency: ETH,
            scale: BigInt(calculatorInputValue.indexOf("."))
          });

          const sum = add(input_one, input_two);
          setPreviousValue("0");
          console.log(sum.toJSON());
        }}/>
        <CalculatorButton textOrIcon={"-"} onClick={() => {
          
        }}/>
        <CalculatorButton textOrIcon={"x"} onClick={() => {
          
        }}/>
        <CalculatorButton textOrIcon={"/"} onClick={() => {
          
        }}/>
      </div>
      <div>
        <CalculatorButton textOrIcon={"7"} onClick={() => {
          setCalculatorInputValue((value) => value + "7");
        }}/>
        <CalculatorButton textOrIcon={"8"} onClick={() => {
          setCalculatorInputValue((value) => value + "8");
        }}/>
        <CalculatorButton textOrIcon={"9"} onClick={() => {
          setCalculatorInputValue((value) => value + "9");
        }}/>
      </div>
      <div>
        <CalculatorButton textOrIcon={"4"} onClick={() => {
          setCalculatorInputValue((value) => value + "4");
        }}/>
        <CalculatorButton textOrIcon={"5"} onClick={() => {
          setCalculatorInputValue((value) => value + "5");
        }}/>
        <CalculatorButton textOrIcon={"6"} onClick={() => {
          setCalculatorInputValue((value) => value + "6");
        }}/>
      </div>
      <div>
        <CalculatorButton textOrIcon={"1"} onClick={() => {
          setCalculatorInputValue((value) => value + "1");
        }}/>
        <CalculatorButton textOrIcon={"2"} onClick={() => {
          setCalculatorInputValue((value) => value + "2");
        }}/>
        <CalculatorButton textOrIcon={"3"} onClick={() => {
          setCalculatorInputValue((value) => value + "3");
        }}/>
      </div>
      <div>
        <CalculatorButton textOrIcon={"0"} onClick={() => {
          setCalculatorInputValue((value) => value + "0");
        }}/>
        <CalculatorButton textOrIcon={"."} onClick={() => {
          setCalculatorInputValue((value) => value.includes('.') ? value : value + ".");
        }}/>
      </div>
    </div>
  )
}

export default App
