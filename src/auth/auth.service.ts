import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { User, Bookmark } from '@prisma/client'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	signup() {
		return 'signup';
	}

	login() {
		return 'login';
	}
}
