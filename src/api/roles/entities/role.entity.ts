import { User } from 'src/api/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { USER_ROLE } from './role.enum';


@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ unique: true })
  roleName!: USER_ROLE; // ADMIN, STAFF

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}