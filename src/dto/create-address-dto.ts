import { IsNotEmpty, IsString } from "class-validator";

class CreateAddressDto{
    //@IsNotEmpty()
    @IsString()
    line1 : string

    //@IsNotEmpty()
    @IsString()
    address_line2 : string

    //@IsNotEmpty()
    @IsString()
    City : string

   // @IsNotEmpty()
    @IsString()
    State : string

   // @IsNotEmpty()
    @IsString()
    Country : string


   // @IsNotEmpty()
    @IsString()
    pincode : String
}

export default CreateAddressDto;