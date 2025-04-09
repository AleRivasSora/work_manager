import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamsModule } from './teams/teams.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'work_manager_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    TeamsModule,
    AuthModule,
    ProjectsModule,
  ],
})
export class AppModule {}
