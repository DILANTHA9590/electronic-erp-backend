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
  id: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ unique: true })
  user_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.PENDING
  })
  user_status: USER_STATUS;

  @Column({ default: 0 })
  token_version: number;

  @Column({ nullable: true })
  salt?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  @ManyToOne(() => Role, role => role.users)
 @JoinColumn({ name: 'role_id' })
  role: Role;
}
