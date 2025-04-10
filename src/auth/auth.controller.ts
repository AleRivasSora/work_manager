import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login-user.dto';
import { Public } from './custom-decorators/public.decorator';
@Controller({})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  async login(@Body() loginDto: loginUserDto) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }
}
