import { Injectable } from '@nestjs/common';
import { GameAction, GameRequest, GameResponse } from './game-action.types';

type GameHandler<T extends GameAction> = (
  payload: GameRequest<T>,
) => Promise<GameResponse<T>>;

@Injectable()
export class GameDispatcher {
  private readonly actionMap = new Map<GameAction, GameHandler<GameAction>>();

  register<T extends GameAction>(action: T, handler: GameHandler<T>) {
    if (this.actionMap.has(action)) {
      throw new Error(`Action already registered: ${action}`);
    }

    this.actionMap.set(action, handler as GameHandler<GameAction>);
  }

  async dispatch<T extends GameAction>(
    action: T,
    payload: GameRequest<T>,
  ): Promise<GameResponse<T>> {
    const handler = this.actionMap.get(action);

    if (!handler) {
      throw new Error('INVALID_ACTION');
    }

    return handler(payload) as Promise<GameResponse<T>>;
  }
}
