import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, IsNull, Repository } from 'typeorm';
import { Task } from './entities/tasksTable.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { UserEntity } from 'src/auth/entities/user.entity';

@Injectable()
export class TaskMgtService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const existingTask = await this.taskRepository.findOne({
      where: [{ title: createTaskDto.title, userId: userId }]
    });

    if (existingTask) {
      throw new BadRequestException('A task with this title already exists.');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      userId: user.id
    });

    return await this.taskRepository.save(newTask);
  }

  async findAll(
    userId: string,
    page: number,
    pageSize: number
  ): Promise<Task[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const skip = (page - 1) * pageSize;

    return await this.taskRepository.find({
      where: { userId: Equal(user.id), deleteAt: IsNull() },
      take: pageSize,
      skip: skip
    });
  }

  async findOne(taskId: string, userId: string): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const task = await this.taskRepository.findOne({
      where: { id: taskId, userId: Equal(user.id), deleteAt: IsNull() }
    });

    if (!task) {
      throw new BadRequestException('Task does not exist');
    }

    return task;
  }

  async update(
    updateTaskDto: UpdateTaskDto,
    taskId: string,
    userId: string
  ): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const tasker = await this.taskRepository.findOne({
      where: { id: taskId }
    });
    if (!tasker || tasker.userId !== user.id) {
      throw new BadRequestException('Unauthorized to update this task');
    }

    await this.taskRepository.update(taskId, updateTaskDto);

    const updatedTask = await this.taskRepository.findOne({
      where: { id: taskId }
    });
    if (!updatedTask) {
      throw new BadRequestException('Task does not exist');
    }

    return updatedTask;
  }

  async delete(taskId: string, userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const tasker = await this.taskRepository.findOne({
      where: { id: taskId }
    });
    if (!tasker) {
      throw new BadRequestException('Task does not exist');
    }

    if (tasker.userId !== userId) {
      throw new BadRequestException('Unauthorized to delete this task');
    }

    await this.taskRepository.delete(taskId);

    return { message: 'Task successfully deleted.' };
  }
}
