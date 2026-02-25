import { IsInt, Min } from 'class-validator';

export class SellItemRequestDto {
  @IsInt()
  @Min(1)
  itemId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class SellItemResponseDto {
  itemId!: number;
  quantity!: number;
  remainGold!: number;
}
