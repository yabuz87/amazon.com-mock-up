import { formatNumber } from "../../util/utility.js"
describe('test suit: fromatCurrency', ()=>{
    it('converts into dollars',()=>{
        expect(formatNumber(2095)).toEqual('20.95');
       
    });
    it('round up into a nearest decimal point',()=>{
        expect(formatNumber(2067.8)).toEqual('20.68');
    });
    it('works with 0',()=>{
        expect(formatNumber(0)).toEqual('0.00');
   
    });
    
});