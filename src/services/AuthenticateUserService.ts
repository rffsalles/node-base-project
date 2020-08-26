import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../entities/User';

interface Request {
    email: string;
    password: string;
}
export default class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('Incorrect e-mail/password combination');
        }
        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new Error('Incorrect e-mail/password combination');
        }
        const token = sign({}, 'e5c68d65130357bfd9248a16219a1919', {
            subject: user.id,
            // expiresIn:
        });
        return user;
    }
}
