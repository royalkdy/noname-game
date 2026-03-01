import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(
    userId: number,
    done: (err: Error | null, id?: number) => void,
  ): void {
    done(null, userId);
  }

  deserializeUser(
    userId: number,
    done: (err: Error | null, user: { id: number | null }) => void,
  ): void {
    done(null, { id: userId });
  }
}
