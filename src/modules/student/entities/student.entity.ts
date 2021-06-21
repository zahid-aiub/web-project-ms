import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from "../../../core/enums/role.enum";

@Entity()
export class Student {
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
        enum: Role,
        default: [Role.User]
    })
    roles: Role[];
}
