import { Test, TestingModule } from '@nestjs/testing';
import { WaMessagesService } from './wa-messages.service';

describe('WaMessagesService', () => {
  let service: WaMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaMessagesService],
    }).compile();

    service = module.get<WaMessagesService>(WaMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
