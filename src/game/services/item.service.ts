import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { GameDispatcher } from '../dispatcher/game.dispatcher';
import {
  GameAction,
  GameRequest,
  GameResponse,
} from '../dispatcher/game-action.types';

@Injectable()
export class ItemService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: GameDispatcher,
  ) {}

  onModuleInit() {
    this.dispatcher.register(GameAction.BUY_ITEM, this.buy.bind(this));
    this.dispatcher.register(GameAction.SELL_ITEM, this.sell.bind(this));
  }

  async buy(
    payload: GameRequest<GameAction.BUY_ITEM>,
  ): Promise<GameResponse<GameAction.BUY_ITEM>> {
    //const { userId, itemId } = payload;
    console.log(payload);
    await Promise.resolve();
    return {
      itemId: 1,
      quantity: 1,
      remainGold: 1,
    };
    // return this.prisma.$transaction(async (tx) => {
    //   const item = await tx.item.findUnique({
    //     where: { id: itemId },
    //   });

    //   if (!item) throw new Error('ITEM_NOT_FOUND');

    //   const updated = await tx.user.updateMany({
    //     where: {
    //       id: userId,
    //       gold: { gte: item.price },
    //     },
    //     data: {
    //       gold: { decrement: item.price },
    //     },
    //   });

    //   if (updated.count === 0) {
    //     throw new Error('NOT_ENOUGH_GOLD');
    //   }

    //   await tx.inventory.create({
    //     data: { userId, itemId },
    //   });

    //   return { success: true };
    // });
  }

  async sell(
    payload: GameRequest<GameAction.SELL_ITEM>,
  ): Promise<GameResponse<GameAction.SELL_ITEM>> {
    console.log(payload);
    await Promise.resolve();
    return {
      itemId: 1,
      quantity: 1,
      remainGold: 1,
    };
    // const { userId, itemId } = payload;
    // return this.prisma.$transaction(async (tx) => {
    //   const inventory = await tx.inventory.findFirst({
    //     where: { userId, itemId },
    //   });
    //   if (!inventory) throw new Error('ITEM_NOT_OWNED');
    //   await tx.inventory.delete({
    //     where: { id: inventory.id },
    //   });
    //   await tx.user.update({
    //     where: { id: userId },
    //     data: { gold: { increment: 50 } },
    //   });
    //   return { success: true };
    // });
  }
}
