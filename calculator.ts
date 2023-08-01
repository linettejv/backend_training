interface CalculatorInterface {
    add(a: number, b: number);
    sub(a : number , b: number):number ;
    mul(a: number, b: number): number;
    div(a: number, b: number): number;
    percent(a: number, b: number): number; 
    power(a: number, b: number): number;
    
  }

 export  class myCalculator implements CalculatorInterface{
    res : number;
    add(a: number, b: number) {
        this.res = a+b;
        console.log(this.res);
        return a+b;
    }
    sub(a: number, b: number):number {
        this.res = a-b;
        console.log(this.res);
        return a+b;
    }
    mul(a: number, b: number):number {
        this.res = a*b;
        console.log(this.res);
        return a+b;
    }
    div(a: number, b: number):number {
        if (b == 0){
            console.log("Division by Zero not possible!");
            return -1;
        }
        this.res = a/b;
        console.log(this.res);
        return a+b;
    }
    percent(a: number, b: number = 1): number {
        this.res = (a*b)/100;
        console.log(this.res);
        return a+b;
    }
    power(a: number, b: number): number {
        this.res = Math.pow(a,b);
        console.log(this.res);
        return a+b;
    }
  }

  
  