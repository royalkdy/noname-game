import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameDispatcher } from './dispatcher/game.dispatcher';
import { ItemService } from './services/item.service';
import { UserProfileService } from './services/user-profile.service';

@Module({
  controllers: [GameController],
  providers: [GameDispatcher, ItemService, UserProfileService],
})
export class GameModule {}
