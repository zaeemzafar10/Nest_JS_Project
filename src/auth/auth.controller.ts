import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './auth.schema';
import { SignupDto } from './DTO/singup.dto';
import { LoginDto } from './DTO/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  async getProfile(@Req() req: Request) {
    return this.authService.getProfile(req['user'].id);
  }

  @Get('admin/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getProfiles(@Req() req: Request) {
    return this.authService.getProfile(req['user'].id);
  }

  @Get('allusers')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  async getAllUsers(@Req() req: Request) {
    return this.authService.getAllUsers(req['user'].id);
  }
}
