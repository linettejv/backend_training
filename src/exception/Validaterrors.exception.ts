import { ValidationError } from "class-validator"
import HttpException from "./http.exception"

class ValidateErrors extends HttpException{
    public errors : ValidationError []

    constructor(status : number , message : string , errors : ValidationError[]){
        super (status , message)
        this.errors = errors 
    }

    public ValidatedError (errors : ValidationError[]){
        let formattedErrorObject = {}
        // empty object to store the error 
        // iterarte through each element
        errors.forEach(element => {
            const errorValue = element.property;
            if (element.children.length > 0) {
                formattedErrorObject[errorValue] = this.ValidatedError(element.children);
                //return formattedErrorObject;
            }
            else {
                formattedErrorObject[errorValue] = Object.values(element.constraints);
                //return formattedErrorObject;
            }
        });
        return formattedErrorObject;
    }
}

export default ValidateErrors;