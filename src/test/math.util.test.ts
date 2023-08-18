import { when } from "jest-when"
import MathUtil from "../utils/math.util"


describe('test average function' , () => {
    test('testing average function no mocking actual called ', () => {
        MathUtil.sum = jest.fn().mockReturnValueOnce(8)
        expect(MathUtil.average(4,4)).toBe(4)

        //expect(MathUtil.average(4,4)).toBe(4)
        
    } )
    // test ('testing using WHERE and mocking' , () => {
    //     const mockedfunction = jest.fn();
    //     MathUtil.sum = mockedfunction;
    //     when(mockedfunction).calledWith(4,4).mockReturnValueOnce(8)
    //     expect(MathUtil.average(4,4)).toBe(4);
    //})
    test('testing average function errors ', () => {
        expect(MathUtil.average(4,4)).not. toBe(8)
       
    } )

})

describe ('testing other cases ' , () => {
    test('zero', () => {
        const z = 0;
        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
      });

    //   test('null', () => {
    //     const n = 1;
    //     expect(n).toBeNull();
    //     expect(n).toBeDefined();
    //     expect(n).not.toBeUndefined();
    //     expect(n).not.toBeTruthy();
    //     expect(n).toBeFalsy();
    //   });     
    
    
})
