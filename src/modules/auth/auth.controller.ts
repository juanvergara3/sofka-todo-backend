import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(
        @Body()
        singUpDto: SingUpDto
    ): Promise<{ token: string }> {
        return this.authService.signUp(singUpDto);
    }

    @Post('/login')
    login(
        @Body()
        loginDto: LoginDto
    ): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

}
