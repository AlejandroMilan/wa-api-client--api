import { Test, TestingModule } from '@nestjs/testing';
import { WaSenderService } from './wa-sender.service';

describe('WaSenderService', () => {
  let service: WaSenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaSenderService],
    }).compile();

    service = module.get<WaSenderService>(WaSenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
