import { IsInt, Min } from 'class-validator';

export class BuyItemRequestDto {
  @IsInt()
  @Min(1)
  itemId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class BuyItemResponseDto {
  itemId!: number;
  quantity!: number;
  remainGold!: number;
}
