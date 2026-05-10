import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { RolesModule } from './api/roles/roles.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ScheduleModule.forRoot(),
     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: Number(configService.getOrThrow('DB_PORT')),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASS'),
        database: configService.getOrThrow('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: ['query', 'error'],//dev
    // logging: ['error'],//prodction
        retryAttempts: 5, 
        retryDelay: 3000,
      }),
    }),

    UserModule,
    AuthModule,
    RolesModule,
  ]

})
export class AppModule {}
