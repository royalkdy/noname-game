// api추가방법 game/dto에 request, response dto정의 => game.contract.ts에 contract작성 => game.module.ts에 handler등록
// dto import, contract정의, handler는 gamemodule에서 등록

import { BuyItemRequestDto, BuyItemResponseDto } from '@/game/dto/buy-item.dto';
import {
  CreateUserProfileRequestDto,
  CreateUserProfileResponseDto,
} from '@/game/dto/user-profile.dto';
import {
  SellItemRequestDto,
  SellItemResponseDto,
} from '@/game/dto/sell-item.dto';

export enum GameAction {
  BUY_ITEM = 'BUY_ITEM',
  SELL_ITEM = 'SELL_ITEM',
  CREATE_USER_PROFILE = 'CREATE_USER_PROFILE',
}

export const GameContractMap = {
  [GameAction.BUY_ITEM]: {
    request: BuyItemRequestDto,
    response: BuyItemResponseDto,
  },
  [GameAction.SELL_ITEM]: {
    request: SellItemRequestDto,
    response: SellItemResponseDto,
  },
  [GameAction.CREATE_USER_PROFILE]: {
    request: CreateUserProfileRequestDto,
    response: CreateUserProfileResponseDto,
  },
} as const;

export type GameRequest<Action extends GameAction> = InstanceType<
  (typeof GameContractMap)[Action]['request']
> & { userId: number };

export type GameResponse<Action extends GameAction> = InstanceType<
  (typeof GameContractMap)[Action]['response']
>;

export type GameHandler<Action extends GameAction> = (
  request: GameRequest<Action>,
) => Promise<GameResponse<Action>>;

export type HandlerMap = {
  [Action in GameAction]: GameHandler<Action>;
};
