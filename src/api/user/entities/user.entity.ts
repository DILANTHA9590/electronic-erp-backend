import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { USER_STATUS } from './user-status.enum';
import { Role } from 'src/api/roles/entities/role.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({nullable:false})
  firstName!: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column()
  password!:string;

  @Column({
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.PENDING
  })
  userStatus!: USER_STATUS;

  @Column({ default: 0 })
  tokenVersion!: number;

  @Column({ nullable: true })
  salt?: string;

  @Column({nullable:true})
  assignedRoleBy?:string

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role!: Role;
}
