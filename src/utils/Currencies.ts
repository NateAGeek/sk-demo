import BN from 'bn.js';
export interface CalculationValue {
  stringValue: string,
  currency: Currencies
}
export enum Currencies {
  ETH,
  GWEI,
  WEI
}
export function convertToWeiCalculationValue(input: string, currency: Currencies): CalculationValue {
  console.log("Converting: " + Currencies[currency] + " " + input + " to Wei");
  if (input === "") {
    return {
      stringValue: "",
      currency: Currencies.WEI
    };
  }
  if(currency === Currencies.GWEI) {
    if (input.includes('.')) {
      const [upper, lower] = input.split('.');
      return {
        stringValue: (upper + lower.padEnd(9, '0').slice(0, 9)).replace(/^0+/, ""),
        currency: Currencies.WEI
      }
    }
    return {
      stringValue: input + '000000000',
      currency: Currencies.WEI
    }
  }
  if(currency === Currencies.ETH) {
    if(input.includes('.')) {
      const [upper, lower] = input.split('.');
      return {
        stringValue: (upper + lower.padEnd(18, '0').slice(0, 18)).replace(/^0+/, ""),
        currency: Currencies.WEI
      }
    }
    return {
      stringValue: input + '000000000000000000',
      currency: Currencies.WEI
    }
  }
  return {
    stringValue: input,
    currency: Currencies.WEI
  };
}

export function weiToCurrencyString(input: CalculationValue, currentCurrency: Currencies) {
  if (input.stringValue === "" || input.stringValue === "0" || input.currency === currentCurrency) {
    return input.stringValue;
  }
  if (currentCurrency === Currencies.GWEI) {
    const convertUp = input.stringValue.length < 9 ? input.stringValue.padStart(9, '0') : input.stringValue;
    let [whole, decimal] = [convertUp.slice(0, convertUp.length - 9), convertUp.slice(convertUp.length - 9)];
    decimal = decimal.replace(/0+$/, "");
    whole = whole.replace(/^0+/, "");
    const output = (whole.length === 0 ? '0' : whole) + (decimal.length > 0 ? '.' + decimal : '');
    return output;
  }
  if (currentCurrency === Currencies.ETH) {
    console.log("What", input.stringValue);
    const convertUp = input.stringValue.length < 18 ? input.stringValue.padStart(18, '0') : input.stringValue;
    console.log(convertUp);
    let [whole, decimal] = [convertUp.slice(0, convertUp.length - 18), convertUp.slice(convertUp.length - 18)];
    decimal = decimal.replace(/0+$/, "");
    whole = whole.replace(/^0+/, "");
    const output = (whole.length === 0 ? '0' : whole) + (decimal.length > 0 ? '.' + decimal : '');
    return output;
  }

  console.log("This Happened?");
  return input.stringValue;
}

export type CalculatorOperationSupport = '+' | '−' | '×' | '÷' | '=';

export function calculate(inputOne: CalculationValue, inputTwo: CalculationValue, operation: CalculatorOperationSupport): CalculationValue {
  const a = new BN(convertToWeiCalculationValue(inputOne.stringValue, inputOne.currency).stringValue);
  const b = new BN(convertToWeiCalculationValue(inputTwo.stringValue, inputTwo.currency).stringValue);
  switch (operation) {
    case '+':
      return {
        stringValue: a.add(b).toString(),
        currency: Currencies.WEI
      };
    case '−':
      return {
        stringValue: a.sub(b).toString(),
        currency: Currencies.WEI
      };
    case '×':
      return {
        stringValue: a.mul(b.div(
          inputTwo.currency === Currencies.GWEI ? 
            new BN('1000000000') : 
            inputTwo.currency === Currencies.ETH ? new BN('1000000000000000000') : 
            new BN('1')
          )).toString(),
        currency: Currencies.WEI
      };
    case '÷':
      return {
        stringValue: a.div(b.div(
          inputTwo.currency === Currencies.GWEI ? 
            new BN('1000000000') : 
            inputTwo.currency === Currencies.ETH ? new BN('1000000000000000000') : 
            new BN('1')
          )).toString(),
        currency: Currencies.WEI
      };
    case '=':
      return {
        stringValue: b.toString(),
        currency: Currencies.WEI
      };
  }
}