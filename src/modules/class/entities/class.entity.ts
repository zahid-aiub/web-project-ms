import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Student} from "../../student/entities/student.entity";
import {Subject} from "../../subject/entities/subject.entity";
import {Teacher} from "../../teacher/entities/teacher.entity";

@Entity()
export class Class {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, nullable: false, unique: true})
    name: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: false})
    isArchive: boolean;

    @OneToOne( () => Student, student => student.class)
    @JoinColumn()
    student: Student;

    @OneToMany( () => Subject, subject => subject.class)
    subjects: Subject[];

    @ManyToOne( () => Teacher, teacher => teacher.classes, {cascade: true})
    teacher: Teacher;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

}
