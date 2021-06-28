import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Subject} from "../../subject/entities/subject.entity";
import {Student} from "../../student/entities/student.entity";

@Entity()
export class Test {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'date' })
    testDate: Date;

    @Column()
    grade: number;

    @Column({default: true})
    isActive: boolean;

    @Column({default: false})
    isArchive: boolean;

    @ManyToOne(() => Subject, subject => subject.tests, {cascade: true})
        // @JoinColumn()  // this is used for reverse way data retrieval
    subject: Subject;

    @ManyToMany(() => Student, student => student.tests, {cascade: true})
    students: Student[];

    @Column()
    createdById: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

}
