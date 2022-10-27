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


export const currencyFormat = (dineroObject: Dinero<bigint>) => dineroObject.toJSON();
