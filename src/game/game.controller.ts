import {
  Controller,
  Post,
  Body,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { GameDispatcher } from './dispatcher/game.dispatcher';
import {
  GameAction,
  GameActionContractMap,
  GameRequest,
} from './dispatcher/game-action.types';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Request } from 'express';

@Controller()
export class GameController {
  constructor(private readonly dispatcher: GameDispatcher) {}

  @Post()
  async handle(@Req() req: Request, @Body() body: unknown) {
    if (
      typeof body !== 'object' ||
      body === null ||
      !('action' in body) ||
      !('payload' in body)
    ) {
      throw new BadRequestException('INVALID_REQUEST');
    }

    const { action, payload } = body;

    if (!Object.values(GameAction).includes(action as GameAction)) {
      throw new BadRequestException('INVALID_ACTION');
    }

    return this.processAction(
      action as GameAction,
      payload,
      (req.user as { id: number }).id,
    );
  }

  private async processAction<T extends GameAction>(
    action: T,
    payload: unknown,
    userId: number,
  ) {
    const contract = GameActionContractMap[action];

    if (typeof payload !== 'object' || payload === null) {
      throw new BadRequestException('INVALID_PAYLOAD');
    }

    const dto = plainToInstance(
      contract.request as ClassConstructor<any>,
      payload,
    ) as GameRequest<T>;

    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return this.dispatcher.dispatch(action, {
      ...dto,
      userId,
    });
  }
}
