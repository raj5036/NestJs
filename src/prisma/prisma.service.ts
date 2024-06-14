import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
	constructor () {
		super({
			datasources: {
				db: {
					url: 'mysql://root:P@ssw0rd@localhost:3306/nestjs?schema=public'
				}
			}
		})
	}
}
