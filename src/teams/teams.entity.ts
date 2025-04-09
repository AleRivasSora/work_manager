import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Project } from '../projects/projects.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.teams)
  users: User[];

  @OneToMany(() => Project, (project) => project.team)
  projects: Project[];
}
