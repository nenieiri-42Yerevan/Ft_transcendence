import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from '../dto';
import { DataSource } from 'typeorm';
import * as argon from 'argon2';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class AuthService
{
	constructor(private dataSource: DataSource) {}

	async signup(dto: SignUpDto)
	{
		if (dto.password != dto.password2)
			return ('password1 != password2')

		const hash = await argon.hash(dto.password);

		const new_user = new User();
		new_user.first_name = dto.first_name;
		new_user.last_name = dto.last_name;
		new_user.username = dto.username;
		new_user.email = dto.email;
		new_user.password = hash;
		new_user.gender = dto.gender;
		new_user.date_of_birth = dto.date_of_birth;

		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();
		try
		{
			await queryRunner.manager.save(new_user);
			await queryRunner.commitTransaction();
		}
		catch (err)
		{
			console.log({
				err,
			});
			await queryRunner.rollbackTransaction();
		}
		finally
		{
			await queryRunner.release();
		}

//		console.log(await queryRunner.query("SELECT first_name FROM User"));

		return 'signUp';
	}

	signin(dto: SignInDto)
	{
		return 'signIn';
	}
}
