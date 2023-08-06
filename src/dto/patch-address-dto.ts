import { IsOptional, IsString } from "class-validator"

class PatchAddressDto{
    //@IsNotEmpty()
    @IsOptional()
    @IsString()
    line1 : string

    @IsOptional()
    @IsString()
    address_line2 : string

    @IsOptional()
    @IsString()
    City : string

    @IsOptional()
    @IsString()
    State : string

    @IsOptional()
    @IsString()
    Country : string


    @IsOptional()
    @IsString()
    pincode : String
}

export default PatchAddressDto;