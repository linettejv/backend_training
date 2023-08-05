import { Column, Entity , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, ManyToOne, JoinColumn} from "typeorm";
import Address from "./address.entity";
import AbstratctEntity from "./abstract-entity";
import { IsNotEmpty } from "class-validator";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity("employee")
class Employee extends AbstratctEntity{
 
    @Column()
    name : string;

    @Column({nullable : false})
    email:string;

    @Column({nullable:true})
    age : number;

    @OneToOne(()=>Address , (address)=> address.employee , {cascade:true})
    address:Address;

    // many employees in one department

    
    @ManyToOne(() => Department , (department) => department.employee)
    @JoinColumn({})
    department : Department ;

    @Column()
    password : string

    @Column({default : Role.DEVELOPER})
    role : Role
}

export  {Employee};