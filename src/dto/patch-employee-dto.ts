import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import UpdateAddressDto from "./update-address.dto";
import Address from "../entity/address.entity";
import { Role } from "../utils/role.enum";
import PatchAddressDto from "./patch-address-dto";

class PatchEmployeeDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    email : string;

    @IsOptional()
    @ValidateNested() //({ each : true})
    @Type(() => PatchAddressDto)
    address : Address

    @IsOptional()
    @IsString()
    password : string


    @IsOptional()
    @IsNumber()
    department_id : number;


    @IsOptional()
    @IsNumber()
    experience : number ;

    @IsOptional()
    @IsString()
    joining_date : string;

    @IsOptional()
    @IsEnum(Role)
    role : Role;

}

export default PatchEmployeeDto