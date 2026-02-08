import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [AuthModule, UserModule],

})
export class AppModule {}
