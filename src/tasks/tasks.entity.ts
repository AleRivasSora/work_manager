import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../projects/projects.entity';
import { User } from '../users/users.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  @Column()
  status: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
