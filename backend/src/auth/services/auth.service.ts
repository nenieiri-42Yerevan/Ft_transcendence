import { Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from '../dto';
import { DataSource } from 'typeorm';
import * as argon from 'argon2';

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
		try
		{
			await queryRunner.manager.save(dto);
			await queryRunner.commitTransaction();
		}
		catch (err)
		{
			console.log({
				err,
			});
			await queryRunner.rollbackTransaction();
		}
//		finally
//		{
//			await queryRunner.release();
//		}

		console.log(await queryRunner.query("SELECT * FROM User"));

		return 'signUp';
	}

	signin(dto: SignInDto)
	{
		return 'signIn';
	}
}
