import { Test, TestingModule } from '@nestjs/testing';
import { WaConversationsService } from './wa-conversations.service';

describe('WaConversationsService', () => {
  let service: WaConversationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaConversationsService],
    }).compile();

    service = module.get<WaConversationsService>(WaConversationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
