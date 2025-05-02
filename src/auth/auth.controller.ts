import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './auth.schema';
import { SignupDto } from './DTO/singup.dto';
import { LoginDto } from './DTO/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(
    new ValidationPipe({
      whitelist: true, // fields are required but not in payload
      forbidNonWhitelisted: true, // fields are not in schema and dto
      transform: true,
    }),
  )
  async createUser(@Body() user: SignupDto): Promise<User> {
    return this.authService.createUser(user);
  }

  @Post('login')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async loginUser(
    @Body() user: LoginDto,
  ): Promise<{ message: string; data: { user: User; token: string } }> {
    return this.authService.loginUser(user);
  }
}
