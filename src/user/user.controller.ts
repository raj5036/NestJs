import { JWTGuard } from './../auth/guard/index';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
	@Get('protected-route')
	getHello(@Req() req: Request, @GetUser() user: User, @GetUser('email') email: string) {
		console.log({user: req.user})
		console.log({email})
		return user;
	}
}
