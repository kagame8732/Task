import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsEnum } from 'class-validator';

enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Title' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 'This is a task description.' })
  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty({ example: TaskStatus.OPEN, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class UpdateTaskDto {
  @ApiProperty({ example: 'Updated Task Title', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  title?: string;

  @ApiProperty({ example: 'Updated task description.', required: false })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  description?: string;

  @ApiProperty({ example: TaskStatus.IN_PROGRESS, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
