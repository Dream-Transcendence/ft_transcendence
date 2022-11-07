import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class WsAuthGuard extends AuthGuard('wsjwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const result = context.switchToWs().getClient().handshake.headers.cookie;

    console.log('🐭🐭🐭🐭🐭🐭🐭🐭 ', result.split('Authentication=')[1]);
    result.split('Authentication=')[1];
    // return { username: '123', sub: '79654' };
    return context.switchToWs().getClient().handshake;
  }
}
