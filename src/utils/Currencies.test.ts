import {describe, it, expect} from 'vitest';
import {convertToWeiCalculationValue, Currencies, weiToCurrencyString} from './Currencies';

describe('Currency WEI Conversion Checks', () => {
  it('Test ETH to WEI Conversion', () => {
    const test = convertToWeiCalculationValue('1', Currencies.ETH);
    const testTwo = convertToWeiCalculationValue('1.', Currencies.ETH);
    const testThree = convertToWeiCalculationValue('1.0', Currencies.ETH);
    const testFour = convertToWeiCalculationValue('0.1', Currencies.ETH);
    const testFive = convertToWeiCalculationValue('12.12345', Currencies.ETH);
    const testSix = convertToWeiCalculationValue('12.12345678910111213141516', Currencies.ETH);
    const testSeven = convertToWeiCalculationValue('.1', Currencies.ETH);

    expect(test).toEqual({
      stringValue: '1000000000000000000',
      currency: Currencies.WEI,
    });
    expect(testTwo).toEqual({
      stringValue: '1000000000000000000',
      currency: Currencies.WEI,
    });
    expect(testThree).toEqual({
      stringValue: '1000000000000000000',
      currency: Currencies.WEI,
    });
    expect(testFour).toEqual({
      stringValue: '100000000000000000',
      currency: Currencies.WEI,
    });
    expect(testFive).toEqual({
      stringValue: '12123450000000000000',
      currency: Currencies.WEI,
    });
    expect(testSix).toEqual({
      stringValue: '12123456789101112131',
      currency: Currencies.WEI,
    });
    expect(testSeven).toEqual({
      stringValue: '100000000000000000',
      currency: Currencies.WEI,
    });
  });
  it('Test GWEI to WEI Conversion', () => {
    const test = convertToWeiCalculationValue('1', Currencies.GWEI);
    const testTwo = convertToWeiCalculationValue('1.', Currencies.GWEI);
    const testThree = convertToWeiCalculationValue('1.0', Currencies.GWEI);
    const testFour = convertToWeiCalculationValue('0.1', Currencies.GWEI);
    const testFive = convertToWeiCalculationValue('12.12345', Currencies.GWEI);
    const testSix = convertToWeiCalculationValue('12.12345678910111213141516', Currencies.GWEI);
    const testSeven = convertToWeiCalculationValue('.1', Currencies.GWEI);

    expect(test).toEqual({
      stringValue: '1000000000',
      currency: Currencies.WEI,
    });
    expect(testTwo).toEqual({
      stringValue: '1000000000',
      currency: Currencies.WEI,
    });
    expect(testThree).toEqual({
      stringValue: '1000000000',
      currency: Currencies.WEI,
    });
    expect(testFour).toEqual({
      stringValue: '100000000',
      currency: Currencies.WEI,
    });
    expect(testFive).toEqual({
      stringValue: '12123450000',
      currency: Currencies.WEI,
    });
    expect(testSix).toEqual({
      stringValue: '12123456789',
      currency: Currencies.WEI,
    });
    expect(testSeven).toEqual({
      stringValue: '100000000',
      currency: Currencies.WEI,
    });
  });
  it('Test WEI String Formatting ETH', () => {
    expect(weiToCurrencyString({
      stringValue: '100000000',
      currency: Currencies.WEI,
    }, Currencies.ETH)).toEqual('0.0000000001');
    expect(weiToCurrencyString({
      stringValue: '100000000000000000',
      currency: Currencies.WEI,
    }, Currencies.ETH)).toEqual('0.1');
    expect(weiToCurrencyString({
      stringValue: '1234123456789101112',
      currency: Currencies.WEI,
    }, Currencies.ETH)).toEqual('1.234123456789101112');
    expect(weiToCurrencyString({
      stringValue: '12000000000000000000',
      currency: Currencies.WEI,
    }, Currencies.ETH)).toEqual('12');
    expect(weiToCurrencyString({
      stringValue: '12000000000000000000000000000',
      currency: Currencies.WEI,
    }, Currencies.ETH)).toEqual('12000000000');
  });
  it('Test WEI String Formatting GWEI', () => {
    expect(weiToCurrencyString({
      stringValue: '1',
      currency: Currencies.WEI,
    }, Currencies.GWEI)).toEqual('0.000000001');
    expect(weiToCurrencyString({
      stringValue: '100000000',
      currency: Currencies.WEI,
    }, Currencies.GWEI)).toEqual('0.1');
    expect(weiToCurrencyString({
      stringValue: '1234123456',
      currency: Currencies.WEI,
    }, Currencies.GWEI)).toEqual('1.234123456');
    expect(weiToCurrencyString({
      stringValue: '12000000000000000000',
      currency: Currencies.WEI,
    }, Currencies.GWEI)).toEqual('12000000000');
    expect(weiToCurrencyString({
      stringValue: '12000000000',
      currency: Currencies.WEI,
    }, Currencies.GWEI)).toEqual('12');
  });
});
