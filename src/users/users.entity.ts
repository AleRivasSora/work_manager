import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Team } from '../teams/teams.entity';
import { Project } from '../projects/projects.entity';
import { Task } from '../tasks/tasks.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Team, (team) => team.users)
  @JoinTable()
  teams: Team[];

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  projects: Project[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
