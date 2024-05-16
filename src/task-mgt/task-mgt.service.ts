import {
  HttpException,
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
      throw new HttpException(
        'A task with this title already exists.',
        HttpStatus.BAD_REQUEST
      );
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
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
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const task = await this.taskRepository.findOne({
      where: { id: taskId, userId: Equal(user.id), deleteAt: IsNull() }
    });

    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
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
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const tasker = await this.taskRepository.findOne({
      where: { id: taskId }
    });
    if (!tasker || tasker.userId !== user.id) {
      throw new HttpException(
        'Unauthorized to update this task',
        HttpStatus.FORBIDDEN
      );
    }

    await this.taskRepository.update(taskId, updateTaskDto);

    const updatedTask = await this.taskRepository.findOne({
      where: { id: taskId }
    });
    if (!updatedTask) {
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
    }

    return updatedTask;
  }

  async delete(taskId: string, userId: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const tasker = await this.taskRepository.findOne({
      where: { id: taskId }
    });
    if (!tasker) {
      throw new HttpException('Task does not exist', HttpStatus.NOT_FOUND);
    }

    if (tasker.userId !== userId) {
      throw new HttpException(
        'Unauthorized to delete this task',
        HttpStatus.FORBIDDEN
      );
    }

    await this.taskRepository.delete(taskId);

    return { message: 'Task deleted successfully .' };
  }
}
