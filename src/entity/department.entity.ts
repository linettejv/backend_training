import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract-entity";
import { Employee } from "./employee.entity";


@Entity("department")
class Department extends AbstractEntity {
    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department, { cascade: true })
    employee?: Employee;
    //; //  array  : one-to-many relationship?
}

export default Department


