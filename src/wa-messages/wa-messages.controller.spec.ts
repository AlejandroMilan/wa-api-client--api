import { Test, TestingModule } from '@nestjs/testing';
import { WaMessagesController } from './wa-messages.controller';

describe('WaMessagesController', () => {
  let controller: WaMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaMessagesController],
    }).compile();

    controller = module.get<WaMessagesController>(WaMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
