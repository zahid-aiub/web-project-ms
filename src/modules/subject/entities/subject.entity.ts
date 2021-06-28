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
import {Class} from "../../class/entities/class.entity";
import {Teacher} from "../../teacher/entities/teacher.entity";

@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    averageTestGrade: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: false})
    isArchive: boolean;

    @OneToMany(() => Test, test => test.subject)
    tests: Test[];

    @ManyToMany(() => Student, student => student.subjects, {cascade: true})
    students: Student[];

    @ManyToOne( () => Class, cls => cls.subjects, {cascade: true})
    class: Class;

    @ManyToOne( () => Teacher, teacher => teacher.subjects, {cascade: true})
    teacher: Teacher;

    @Column()
    createdById: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

}
