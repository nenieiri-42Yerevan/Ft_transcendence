export type Gender = 'male' | 'female';
export declare class UserDto {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    gender: Gender;
    date_of_birth: Date;
}
