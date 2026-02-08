import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { ConfigModule } from '@nestjs/config'; 


@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,   
    }),
    
    AuthModule, UserModule],

})
export class AppModule {}
