import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ 
    UsersModule,
    JwtModule.register({ })
   ],
   exports: [
    AuthService,
    JwtModule,
   ]
})
export class AuthModule {}
