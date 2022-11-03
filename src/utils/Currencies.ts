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

/**
 * Converts a eth, gwei, wie, string with a currency into a CalculationValue
 * with a wei base that is used to do calculations.
 * @param {string} input The currency input string to convert into a CalculationValue with currency
 * @param {Currencies} currency Currency used to convert the input string into.
 * @return {CalculationValue}
 */
export function convertToWeiCalculationValue(input: string, currency: Currencies): CalculationValue {
  // If the input is empty return a empty result back
  if (input === '') {
    return {
      stringValue: '',
      currency: Currencies.WEI,
    };
  }

  if (currency === Currencies.GWEI || currency === Currencies.ETH) {
    const base = currency === Currencies.GWEI ? 9 : 18;
    // If we are working with a decimal, then we need to split on the decimal and pad it correctly
    if (input.includes('.')) {
      const [upper, lower] = input.split('.');
      return {
        stringValue: (upper + lower.padEnd(base, '0').slice(0, base)).replace(/^0+/, ''),
        currency: Currencies.WEI,
      };
    }

    // Simply add needed 0's to the end
    return {
      stringValue: input + '0'.repeat(base),
      currency: Currencies.WEI,
    };
  }

  // Default is wei, and just return back the fed result
  return {
    stringValue: input,
    currency: Currencies.WEI,
  };
}

/**
 * Converts a wei base CalculationValue into a string format for the currency param.
 * @param {CalculationValue} input Input wei CalculationValue to convert into string
 * @param {Currencies} currentCurrency The currency to convert the wei into
 * @return {string} The string representation of the wei value in desired currency
 */
export function weiToCurrencyString(input: CalculationValue, currentCurrency: Currencies): string {
  // Skip conversions on initial or already converted currencies.
  if (input.stringValue === '' || input.stringValue === '0' || input.currency === currentCurrency) {
    return input.stringValue;
  }

  if (currentCurrency === Currencies.GWEI || currentCurrency === Currencies.ETH) {
    // Set the base, based on the currency inputted
    const base = currentCurrency === Currencies.GWEI ? 9 : 18;

    // Convert up, pad the front with 0's to properly place the decimal point.
    const convertUp = input.stringValue.length < base ? input.stringValue.padStart(base, '0') : input.stringValue;

    // Split where decimal is going to be placed
    let [whole, decimal] = [convertUp.slice(0, convertUp.length - base), convertUp.slice(convertUp.length - base)];

    // Remove leading and ending 0's
    decimal = decimal.replace(/0+$/, '');
    whole = whole.replace(/^0+/, '');

    // A formatted string that adds a 0 in front if just a decimal, or adds a '.' between the whole and decimal number
    return (whole.length === 0 ? '0' : whole) + (decimal.length > 0 ? '.' + decimal : '');
  }

  // If we have wei input then just return its value as is
  return input.stringValue;
}

export type CalculatorOperationSupport = '+' | '−' | '×' | '÷' | '=';

/**
 * Calculate the result of two inputs given the supported operation
 * @param {CalculationValue} inputOne input one used for calculation
 * @param {CalculationValue} inputTwo input two used for calculation
 * @param {CalculatorOperationSupport} operation supported calculation
 * @return {CalculationValue}
 */
export function calculate(
  inputOne: CalculationValue,
  inputTwo: CalculationValue,
  operation: CalculatorOperationSupport,
): CalculationValue {
  const a = new BN(convertToWeiCalculationValue(inputOne.stringValue, inputOne.currency).stringValue);
  const b = new BN(convertToWeiCalculationValue(inputTwo.stringValue, inputTwo.currency).stringValue);

  switch (operation) {
  case '+':
    return {
      stringValue: a.add(b).toString(),
      currency: Currencies.WEI,
    };
  case '−':
    return {
      stringValue: a.sub(b).toString(),
      currency: Currencies.WEI,
    };
  case '×':
    return {
      stringValue: a.mul(b.div(
        inputTwo.currency === Currencies.GWEI ?
          new BN('1000000000') :
          inputTwo.currency === Currencies.ETH ? new BN('1000000000000000000') :
            new BN('1'),
      )).toString(),
      currency: Currencies.WEI,
    };
  case '÷':
    return {
      stringValue: a.div(b.div(
        inputTwo.currency === Currencies.GWEI ?
          new BN('1000000000') :
          inputTwo.currency === Currencies.ETH ? new BN('1000000000000000000') :
            new BN('1'),
      )).toString(),
      currency: Currencies.WEI,
    };
  case '=':
    return {
      stringValue: b.toString(),
      currency: Currencies.WEI,
    };
  }
}
