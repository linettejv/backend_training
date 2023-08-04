import { IsNotEmpty, IsString } from "class-validator";

class CreateAddressDto{
    @IsNotEmpty()
    @IsString()
    line1 : string

    @IsNotEmpty()
    @IsString()
    pincode : String
}

export default CreateAddressDto;