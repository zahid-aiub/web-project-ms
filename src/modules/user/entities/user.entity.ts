import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import {ERole} from "../../../core/enums/role.enum";
import {Student} from "../../student/entities/student.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column({
        type: "enum",
        enum: ERole,
        default: ERole.Student
    })
    roles: ERole;

    @OneToOne(() => Student, student=> student.user)
    @JoinColumn()
    student: Student;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt:Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt:Date;
}
