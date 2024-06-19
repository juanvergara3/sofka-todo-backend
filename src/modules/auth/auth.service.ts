import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SingUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(singUpDto: SingUpDto): Promise<{ token: string }> {
        const { name, email, password } = singUpDto;

        const hashedPassword = await hash(password, 10);

        const user = new this.userModel({
            name,
            email,
            password: hashedPassword
        });

        try {
            await user.save();
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.email) {
                throw new ConflictException('Email is already in use');
            }
            throw error;
        }

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user)
            throw new UnauthorizedException('Invalid email or password');

        const isPasswordMatched = await compare(password, user.password);

        if (!isPasswordMatched)
            throw new UnauthorizedException('Invalid email or password');

        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }
}
