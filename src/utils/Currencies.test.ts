import { describe, it, expect } from 'vitest'
import { compare, convert, dinero } from 'dinero.js';
import { currencyFormat, dineroBigint, ETH, GWEI, WEI } from './Currencies';


describe('Currency Checks', () => {
    it('Convert 1 wei to eth', () => {
        const wei = dineroBigint({amount: 1n, scale: 0n, currency: WEI});
        const wei_to_eth = convert(wei, ETH, {ETH: {amount: 1n, scale: 9n}});
        const wei_to_eth_correct_conversion = dineroBigint({amount: 1n, scale: 9n, currency: ETH});
        expect(compare(wei_to_eth, wei_to_eth_correct_conversion), "Conversion wei to eth").toBe(0);
    });
    it('Convert 1 gwei to eth', () => {
        const gwei = dineroBigint({amount: 1n, scale: 0n, currency: GWEI});
        const gwei_to_eth = convert(gwei, ETH, {ETH: {amount: 1n, scale: 9n}});
        const gwei_to_eth_correct_conversion = dineroBigint({amount: 1n, scale: 9n, currency: ETH});
        expect(compare(gwei_to_eth, gwei_to_eth_correct_conversion), "Conversion wei to eth").toBe(0);
    });
    it('Convert 1 eth to gwei', () => {});
    it('Convert 1 eth to wei', () => {});
    it('Convert 1 gwei to wei', () => {});
    it('Convert 1 wei to gwei', () => {});
});

describe('Currency Checks', () => {
    it('Convert 1 wei to eth', () => {
        const wei = dineroBigint({amount: 1n, scale: 0n, currency: WEI});
        const wei_to_eth = convert(wei, ETH, {ETH: {amount: 1n, scale: 9n}});
        const wei_to_eth_correct_conversion = dineroBigint({amount: 1n, scale: 9n, currency: ETH});
        expect(compare(wei_to_eth, wei_to_eth_correct_conversion), "Conversion wei to eth").toBe(0);
    });
    it('Convert 1 gwei to eth', () => {
        const gwei = dineroBigint({amount: 1n, scale: 0n, currency: GWEI});
        const gwei_to_eth = convert(gwei, ETH, {ETH: {amount: 1n, scale: 9n}});
        const gwei_to_eth_correct_conversion = dineroBigint({amount: 1n, scale: 9n, currency: ETH});
        expect(compare(gwei_to_eth, gwei_to_eth_correct_conversion), "Conversion wei to eth").toBe(0);
    });
    it('Convert 1 eth to gwei', () => {});
    it('Convert 1 eth to wei', () => {});
    it('Convert 1 gwei to wei', () => {});
    it('Convert 1 wei to gwei', () => {});
});