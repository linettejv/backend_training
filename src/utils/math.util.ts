class MathUtil {

    // static functions can be called without class name 
    static average (number1 : number , number2 : number){
        //number1 = 5;
        const sum = this.sum(number1,number2);
        console.log(sum);
        return sum/2;
    }

    static sum(number1 : number , number2 : number){
        const sum = number1 - number2;
        console.log("Sum is " +sum)
        return (sum);
        
    }
}

export default MathUtil;