import { IsInt, Min } from 'class-validator';

export class GrantItemRequestDto {
  @IsInt()
  @Min(1)
  itemId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class GrantItemResponseDto {
  itemId!: number;
  quantity!: number;
}
