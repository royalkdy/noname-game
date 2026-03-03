import {
  Controller,
  Post,
  Body,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { GameDispatcher } from './dispatcher/game.dispatcher';
import { GameAction, GameContractMap } from './dispatcher/game.contract';
import { plainToInstance } from 'class-transformer';
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
    // payload => DTO class로 변환
    const contract = GameContractMap[action];
    const dto = plainToInstance(
      contract.request as new () => InstanceType<
        (typeof GameContractMap)[T]['request']
      >,
      payload,
    );

    // dto 검증
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
