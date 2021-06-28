import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn, JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {Subject} from "../../subject/entities/subject.entity";
import {Test} from "../../test/entities/test.entity";
import {Class} from "../../class/entities/class.entity";
import {clearScreenDown} from "readline";

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToOne(() => User, user => user.student)
    // @JoinColumn()
    user: User;

    @OneToOne( () => Class, cls => cls.student)
    class: Class;

    @ManyToMany(() => Subject, subject => subject.students)
    @JoinTable()  // this is used for reverse way data retrieval
    subjects: Subject[];

    @ManyToMany(() => Test, test => test.students)
    @JoinTable()
    tests: Test[];

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

}
