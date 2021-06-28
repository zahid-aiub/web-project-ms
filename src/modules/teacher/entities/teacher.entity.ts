import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Subject} from "../../subject/entities/subject.entity";
import {Class} from "../../class/entities/class.entity";

@Entity()
export class Teacher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: true})
    isActive: boolean;

    @OneToMany( () => Class, cls => cls.teacher)
    classes: Class[];

    @OneToMany( () => Subject, subject => subject.teacher)
    subjects: Subject[];

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

}
