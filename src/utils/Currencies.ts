import { calculator } from '@dinero.js/calculator-bigint';
import { Currency, Dinero, dinero, toFormat, createDinero } from "dinero.js";

export const dineroBigint = createDinero({ calculator });

export const ETH: Currency<bigint> = {
    code: 'ETH',
    base: 10n,
    exponent: 18n
};

export const GWEI: Currency<bigint> = {
    code: 'GWEI',
    base: 10n,
    exponent: 9n
};

export const WEI: Currency<bigint> = {
    code: 'WEI',
    base: 10n,
    exponent: 0n
}

export function stringToCurrency(input: string, currency: Currency<bigint>) {
    const decimal_location = input.indexOf(".");

    return dineroBigint({
        amount: BigInt(input.replace(".", "")),
        currency: ETH,
        scale: BigInt(decimal_location < 0 ? 0 : (input.length) - decimal_location)
      });
}

export const toStringFormat = (dineroObject: Dinero<bigint>) => toFormat(
    dineroObject,
    ({ amount, currency }) => `${amount}`
  );

export const currencyFormat = (dineroObject: Dinero<bigint>) => toFormat(
    dineroObject,
    ({ amount, currency }) => `${currency.code} ${amount}`
  );
