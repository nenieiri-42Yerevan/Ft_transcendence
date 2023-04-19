import { IsNotEmpty } from 'class-validator';

export class SignInTFADto
{
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	TFA: string;
}
