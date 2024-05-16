import { Test, TestingModule } from '@nestjs/testing';
import { TaskMgtService } from './task-mgt.service';

describe('TaskMgtService', () => {
  let service: TaskMgtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskMgtService]
    }).compile();

    service = module.get<TaskMgtService>(TaskMgtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
