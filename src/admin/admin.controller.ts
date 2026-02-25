import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import type { GrantItemPayload } from './admin.type';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('grant-item')
  async grantItem(@Body() body: GrantItemPayload) {
    const { userId, itemId, quantity } = body;
    await this.adminService.grantItemToUser({
      userId,
      itemId,
      quantity,
    });
  }
}
