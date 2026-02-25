// import { GameActionContract } from './game-action-contract';
// import { BuyItemRequestDto, BuyItemResponseDto } from '@/game/dto/buy-item.dto';
// import {
//   SellItemRequestDto,
//   SellItemResponseDto,
// } from '@/game/dto/sell-item.dto';

// export enum GameAction {
//   BUY_ITEM = 'BUY_ITEM',
//   SELL_ITEM = 'SELL_ITEM',
// }

// export interface GameActionMap {
//   [GameAction.BUY_ITEM]: GameActionContract<
//     BuyItemRequestDto,
//     BuyItemResponseDto
//   >;

//   [GameAction.SELL_ITEM]: GameActionContract<
//     SellItemRequestDto,
//     SellItemResponseDto
//   >;
// }

// export type GameRequest<T extends GameAction> = GameActionMap[T]['request'];
// export type GameResponse<T extends GameAction> = GameActionMap[T]['response'];

import { BuyItemRequestDto, BuyItemResponseDto } from '@/game/dto/buy-item.dto';
import {
  SellItemRequestDto,
  SellItemResponseDto,
} from '@/game/dto/sell-item.dto';

export enum GameAction {
  BUY_ITEM = 'BUY_ITEM',
  SELL_ITEM = 'SELL_ITEM',
}

/**
 * 🔥 런타임 + 타입을 동시에 가지는 단일 소스
 */
export const GameActionContractMap = {
  [GameAction.BUY_ITEM]: {
    request: BuyItemRequestDto,
    response: BuyItemResponseDto,
  },
  [GameAction.SELL_ITEM]: {
    request: SellItemRequestDto,
    response: SellItemResponseDto,
  },
} as const;

/**
 * 🔥 타입 자동 추론
 */
export type GameActionMap = {
  [K in keyof typeof GameActionContractMap]: {
    request: InstanceType<(typeof GameActionContractMap)[K]['request']>;
    response: InstanceType<(typeof GameActionContractMap)[K]['response']>;
  };
};

// export type GameRequest<T extends GameAction> = GameActionMap[T]['request'];
export type GameRequest<T extends GameAction> = GameActionMap[T]['request'] & {
  userId: number;
};
export type GameResponse<T extends GameAction> = GameActionMap[T]['response'];
