import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
// import { User, Bookmark } from '@prisma/client'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async signup(dto: AuthDTO) {
		try {
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
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials taken');
				}
			}

			throw error
		}
	}

	login() {
		return 'login';
	}
}
