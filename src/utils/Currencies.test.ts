import { describe, it, expect } from 'vitest'
import { convertToWeiCalculationValue, Currencies } from './Currencies';

describe('Currency WEI Conversion Checks', () => {
    // it('Test ETH to WEI Conversion', () => {
    //     const test = convertToWeiCalculationValue("1", Currencies.ETH);
    //     const testTwo = convertToWeiCalculationValue("0.1", Currencies.ETH);
    //     const testThree = convertToWeiCalculationValue("1.", Currencies.ETH);
    //     const testFour = convertToWeiCalculationValue("12.12345", Currencies.ETH);

    //     console.log(test, Currencies[test.currency]);
    //     console.log(testTwo, Currencies[testTwo.currency]);
    //     console.log(testThree, Currencies[testThree.currency]);
    //     console.log(testThree, Currencies[testFour.currency]);
    // });
    it('Test GWEI to WEI Conversion', () => {
        const test = convertToWeiCalculationValue("1", Currencies.GWEI);
        const testTwo = convertToWeiCalculationValue("0.1", Currencies.GWEI);
        const testThree = convertToWeiCalculationValue("1.", Currencies.GWEI);
        const testFour = convertToWeiCalculationValue("12.12345", Currencies.GWEI);
        const testFive = convertToWeiCalculationValue("0.000000001234567", Currencies.GWEI);

        console.log(test, Currencies[test.currency]);
        console.log(testTwo, Currencies[testTwo.currency]);
        console.log(testThree, Currencies[testThree.currency]);
        console.log(testFour, Currencies[testFour.currency]);
        console.log(testFive, Currencies[testFour.currency]);
    });



});