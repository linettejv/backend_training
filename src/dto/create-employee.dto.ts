import { IsEmail, IsEnum, IsNotEmpty, IsString, ValidateNested, isNotEmpty } from "class-validator";
import Address from "../entity/address.entity";
import CreateAddressDto from "./create-address-dto";
import { Type } from "class-transformer";
import { Role } from "../utils/role.enum";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

class CreateEmployeeDto{
    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @IsNotEmpty()
    @ValidateNested({ each : true})
    @Type(() => CreateAddressDto)
    address : Address

    @IsNotEmpty()
    @IsString()
    password : string;

    @IsNotEmpty()
    @IsEnum(Role)
    role : Role;

    @IsNotEmpty()
    department_id: number;
}

export default CreateEmployeeDto;