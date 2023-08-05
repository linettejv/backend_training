import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./employee.entity";
import AbstratctEntity from "./abstract-entity";

@Entity("address")
class Address extends AbstratctEntity {
  
    @Column()
    line1 : string;

    @Column()
    pincode :string;

    @OneToOne(()=> Employee,(employee) => employee.address)
    @JoinColumn()
    employee : Employee;
}

export default Address;