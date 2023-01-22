import { IsNotEmpty } from 'class-validator';
import { Gender } from '../../user/entities/user.entity';

export class SignUpDto
{
	@IsNotEmpty()
	first_name: string;

	@IsNotEmpty()
	last_name: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	gender: Gender;

	@IsNotEmpty()
	date_of_birth: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	password2: string;
}
