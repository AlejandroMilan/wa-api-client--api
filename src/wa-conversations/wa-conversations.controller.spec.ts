import { Test, TestingModule } from '@nestjs/testing';
import { WaConversationsController } from './wa-conversations.controller';

describe('WaConversationsController', () => {
  let controller: WaConversationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaConversationsController],
    }).compile();

    controller = module.get<WaConversationsController>(WaConversationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
