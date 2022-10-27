import { describe, it, expect } from 'vitest'
import { compare, convert, dinero } from 'dinero.js';
import { currencyFormat, dineroBigint, ETH, GWEI, WEI } from './Currencies';


describe('sum module', () => {
    it('Convert 1 wei to eth', () => {
        const wei = dineroBigint({amount: 1n, currency: WEI});
        const wei_to_eth = convert(wei, ETH, {ETH: {amount: 1n, scale: 18n}});
        const wei_to_eth_correct_conversion = dineroBigint({amount: 1n, scale: 18n, currency: ETH});
        expect(compare(wei_to_eth, wei_to_eth_correct_conversion), "Conversion wei to eth").toBe(0);
    });
    it('Convert 1 gwei to eth', () => {});
    it('Convert 1 eth to gwei', () => {});
    it('Convert 1 eth to wei', () => {});
    it('Convert 1 gwei to wei', () => {});
    it('Convert 1 wei to gwei', () => {});
});