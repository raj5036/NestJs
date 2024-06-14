import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor() {}

	signup() {
		return 'signup';
	}

	login() {
		return 'login';
	}
}
