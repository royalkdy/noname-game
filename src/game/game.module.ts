import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameDispatcher } from './dispatcher/game.dispatcher';
import { ItemService } from './services/item.service';

@Module({
  controllers: [GameController],
  providers: [GameDispatcher, ItemService],
})
export class GameModule {}
