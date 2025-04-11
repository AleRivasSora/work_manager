import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';

import { Team } from '../teams/teams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Team])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
