import { TaskMgtService } from './task-mgt.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './entities/tasksTable.entity';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/entities/user.entity';
import {
  UseGuards,
  Controller,
  Post,
  Req,
  Body,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  Put,
  Delete
} from '@nestjs/common';

@ApiTags('Task Operations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({ path: 'tasks', version: '1' })
export class TaskMgtController {
  constructor(private readonly taskMgtService: TaskMgtService) {}

  @ApiOperation({
    summary: 'CREATE NEW TASK BY USER'
  })
  @Post('create-task')
  create(
    @Req() req: Request,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    const userId = (req.user as UserEntity).id;

    return this.taskMgtService.create(createTaskDto, userId);
  }

  @ApiOperation({ summary: 'Find all tasks for a specific user' })
  @Get('get-all')
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 5 })
  async findAll(
    @Req() req: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(5), ParseIntPipe) pageSize: number
  ): Promise<Task[]> {
    const userId = (req.user as UserEntity).id;
    return this.taskMgtService.findAll(userId, page, pageSize);
  }

  @ApiOperation({ summary: 'Find one task by ID for a specific user' })
  @Get('get-one/:taskId')
  findOne(@Param('taskId') taskId: string, @Req() req: Request): Promise<Task> {
    const userId = (req.user as UserEntity).id;
    return this.taskMgtService.findOne(taskId, userId);
  }

  @ApiOperation({ summary: 'Update a task for a specific user' })
  @Put('update/:taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request
  ): Promise<Task> {
    const userId = (req.user as UserEntity).id;
    return this.taskMgtService.update(updateTaskDto, taskId, userId);
  }

  @ApiOperation({ summary: 'Delete a task for a specific user' })
  @Delete('delete/:taskId')
  async delete(
    @Param('taskId') taskId: string,
    @Req() req: Request
  ): Promise<{ message: string }> {
    const userId = (req.user as UserEntity).id;

    const result = await this.taskMgtService.delete(taskId, userId);
    return result;
  }
}
