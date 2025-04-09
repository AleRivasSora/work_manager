import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Team } from '../teams/teams.entity';
import { User } from '../users/users.entity';
import { Task } from '../tasks/tasks.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Team, (team) => team.projects)
  team: Team;

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
