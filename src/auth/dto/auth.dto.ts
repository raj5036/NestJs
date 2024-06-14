import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDTO {
	@IsEmail() 
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsOptional()
	firstname?: string;

	@IsString()
	@IsOptional()
	lastname?: string;
}