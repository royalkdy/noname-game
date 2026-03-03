import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameDispatcher } from './dispatcher/game.dispatcher';
import { ItemService } from './services/item.service';
import { UserProfileService } from './services/user-profile.service';
import { GameAction } from './dispatcher/game.contract';
import type { HandlerMap } from './dispatcher/game.contract';

@Module({
  controllers: [GameController],
  providers: [
    ItemService,
    UserProfileService,
    {
      provide: GameDispatcher,
      useFactory: (
        itemService: ItemService,
        userProfileService: UserProfileService,
      ) => {
        const handlerMap: HandlerMap = {
          [GameAction.BUY_ITEM]: (request) => itemService.buyItem(request),
          [GameAction.SELL_ITEM]: (request) => itemService.sellItem(request),
          [GameAction.CREATE_USER_PROFILE]: (request) =>
            userProfileService.createUserProfile(request),
        };

        return new GameDispatcher(handlerMap);
      },
      inject: [ItemService, UserProfileService],
    },
  ],
  exports: [GameDispatcher],
})
export class GameModule {}
