import { IsEmail, IsNotEmpty, IsString, ValidateNested, isNotEmpty } from "class-validator";
import Address from "../entity/address.entity";
import CreateAddressDto from "./create-address-dto";
import { Type } from "class-transformer";
import UpdateAddressDto from "./update-address.dto";

class UpdateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @ValidateNested({ each : true})
    @Type(() => UpdateAddressDto)
    address : Address
}

export default UpdateEmployeeDto;