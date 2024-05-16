import { Module } from '@nestjs/common';
import { TaskMgtService } from './task-mgt.service';
import { TaskMgtController } from './task-mgt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/tasksTable.entity';
import { UserEntity } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, UserEntity])],
  providers: [TaskMgtService],
  controllers: [TaskMgtController]
})
export class TaskMgtModule {}
