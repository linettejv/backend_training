import { Column, Entity , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

@Entity()
class Employee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : string;

    @Column()
    email:string;

    @CreateDateColumn()
    createdAt :Date;

    @UpdateDateColumn()
    updatedAt : Date;

    @DeleteDateColumn()
    deletedAt : Date;
}

export  {Employee};