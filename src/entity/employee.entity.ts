import { Column, Entity , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne} from "typeorm";
import Address from "./address.entity";

@Entity("employee")
class Employee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string;

    @Column()
    email:string;

    @Column({nullable:true})
    age : number;

    @CreateDateColumn()
    createdAt :Date;

    @UpdateDateColumn()
    updatedAt : Date;

    @DeleteDateColumn()
    deletedAt : Date;
    @OneToOne(()=>Address , (address)=> address.employee , {cascade:true})
    address:Address;
}

export  {Employee};