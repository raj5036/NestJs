import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
// import { User, Bookmark } from '@prisma/client'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private configService: ConfigService
	) {}

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
			return this.signToken(newUser.id, newUser.email);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials taken');
				}
			}

			throw error
		}
	}

	async login(dto: AuthDTO) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (!user) {
			throw new ForbiddenException('Credentials incorrect');
		}

		const pwMatches = await argon.verify(user.password, dto.password);
		if (!pwMatches) {
			throw new ForbiddenException('Credentials incorrect');
		}
		return this.signToken(user.id, user.email);
	}

	async signToken (userId: number, email: string) {
		const payload = {
			sub: userId,
			email
		}

		const access_token = await this.jwt.sign(payload, { expiresIn: '15m', secret: this.configService.get('JWT_SECRET') })
		return { access_token }
	}
}
