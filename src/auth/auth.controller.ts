import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signup(@Body() dto: AuthDTO) {
		console.log(dto);
		return this.authService.signup(dto);
	}

	@Post('login')
	login(@Body() dto: AuthDTO) {
		return this.authService.login(dto);
	}
}
