import { Injectable } from '@nestjs/common';
import type {
  GameAction,
  GameRequest,
  GameResponse,
  HandlerMap,
} from './game.contract';

@Injectable()
export class GameDispatcher {
  constructor(private readonly handlerMap: HandlerMap) {}

  async dispatch<T extends GameAction>(
    action: T,
    payload: GameRequest<T>,
  ): Promise<GameResponse<T>> {
    const handler = this.handlerMap[action];

    if (!handler) {
      throw new Error('INVALID_ACTION');
    }

    return handler(payload);
  }
}
