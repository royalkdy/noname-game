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
} from './dispatcher/game-action.types';
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

    const actionCmd = action as GameAction;
    const DtoClass = GameActionContractMap[actionCmd];

    if (!DtoClass) {
      throw new BadRequestException('INVALID_ACTION');
    }

    const dto = plainToInstance(DtoClass.request, payload);
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const userId = (req.user as { id: number }).id;

    return this.dispatcher.dispatch(actionCmd, { ...dto, userId });
  }
}
