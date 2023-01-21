import { IsNotEmpty } from 'class-validator';

export class SignUpDto
{
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	gender: string;

	@IsNotEmpty()
	dateOfBirth: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	password2: string;
}
