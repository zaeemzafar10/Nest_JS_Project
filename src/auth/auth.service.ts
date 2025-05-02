import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './auth.schema';
import * as mongoose from 'mongoose';
import { SignupDto } from './DTO/singup.dto';
import { LoginDto } from './DTO/login.dto';
import * as Becrpt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { GetToken } from './../helper/index';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: SignupDto): Promise<User> {
    const { name, email, password } = user;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const data = {
      name,
      email,
      password: await Becrpt.hash(password, 10),
      role: 'user',
    };
    return this.userModel.create(data);
  }

  async createAdmin(user: SignupDto): Promise<User> {
    const { name, email, password } = user;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const data = {
      name,
      email,
      password: await Becrpt.hash(password, 10),
      role: 'admin',
    };
    return this.userModel.create(data);
  }

  async loginUser(
    user: LoginDto,
  ): Promise<{ message: string; data: { user: User; token: string } }> {
    const { email, password } = user;

    const existingUser = await this.userModel.findOne({ email });

    const isPasswordValid = await Becrpt.compare(
      password,
      existingUser?.password || '',
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      id: existingUser?._id,
      email: existingUser?.email,
      role: existingUser?.role,
    });
    // let userToken = GetToken(existingUser as User);

    return {
      message: 'Login successful',
      data: { user: existingUser as User, token: token },
    };
  }

  async getProfile(userId: string): Promise<User | null> {
    console.log('UserId:', userId);

    return this.userModel.findById(userId);
  }
}
