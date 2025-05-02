import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './auth.schema';
import { SignupDto } from './DTO/singup.dto';
import { LoginDto } from './DTO/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @Post('signup/admin')
  @UsePipes(
    new ValidationPipe({
      whitelist: true, // fields are required but not in payload
      forbidNonWhitelisted: true, // fields are not in schema and dto
      transform: true,
    }),
  )
  async createAdmin(@Body() user: SignupDto): Promise<User> {
    return this.authService.createAdmin(user);
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

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    console.log('User:', req['user']);
    const userId = req['user'].id;
    return this.authService.getProfile(userId);
  }

  @Get('admin/profile')
  @UseGuards(JwtAuthGuard)
  async getProfiles(@Req() req: Request) {
    let userId;
    const { id, role } = req['user'];
    role === 'admin'
      ? (userId = id)
      : (() => {
          throw new UnauthorizedException('Not an admin');
        })();

    return this.authService.getProfile(userId);
  }
}
