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
		const hash = await argon.hash(dto.password);

		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();
//		console.log(await queryRunner.query("SELECT first_name FROM User"));
		try
		{
			//Object.assign(u, dto);
			const u = new User();

			u.first_name = 'Volodyaa',
			u.last_name = 'Ismailyana',
			u.username = 'nenieiria',
			u.email = 'aaaa@mail.ru',
			u.password = '123a',
			u.gender = 'male',
			u.date_of_birth = '2001-08-31',

			await queryRunner.manager.save(u);
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


		return 'signUp';
	}

	signin(dto: SignInDto)
	{
		return 'signIn';
	}
}
