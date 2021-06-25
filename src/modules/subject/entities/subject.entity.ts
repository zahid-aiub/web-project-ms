import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Student} from "../../student/entities/student.entity";
import {Test} from "../../test/entities/test.entity";

@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: true})
    isActive: boolean;

    @OneToMany(() => Test, test => test.subject)
    tests: Test[];

    @ManyToMany(() => Student, student => student.subjects, {cascade: true})
    students: Student;

    @Column()
    createdById: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

}
