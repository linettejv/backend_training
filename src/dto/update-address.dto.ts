import { IsNotEmpty, IsString } from "class-validator";

class UpdateAddressDto{
    @IsNotEmpty()
    @IsString()
    line1 : string

    @IsNotEmpty()
    @IsString()
    pincode : String
}

export default UpdateAddressDto;