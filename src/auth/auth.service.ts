import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
// import { User, Bookmark } from '@prisma/client'
import * as argon from 'argon2'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async signup(dto: AuthDTO) {
		console.log(dto);
		const hashedPassword = await argon.hash(dto.password);
		const newUser = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: hashedPassword,
				firstname: dto.firstname,
				lastname: dto.lastname
			},
			select: {
				id: true,
				email: true,
				firstname: true,
				lastname: true
			}
		})
		return newUser;
	}

	login() {
		return 'login';
	}
}
