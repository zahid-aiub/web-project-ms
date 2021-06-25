import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Subject} from "../../subject/entities/subject.entity";

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

    @ManyToOne(() => Subject, subject => subject.tests, {cascade: true})
        // @JoinColumn()  // this is used for reverse way data retrieval
    subject: Subject;

    @Column()
    createdById: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

}
